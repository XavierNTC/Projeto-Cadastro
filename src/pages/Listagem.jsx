import { useEffect, useState } from "react";
import { database } from "../services/firebase";
import { ref, onValue } from "firebase/database";

export default function Listagem() {
  const [dados, setDados] = useState({});

  useEffect(() => {
    const rootRef = ref(database, "/");
    onValue(rootRef, (snapshot) => {
      setDados(snapshot.val() || {});
    });
  }, []);

  function formatarDataHora(chave) {
    const regex = /^\d{8}_\d{6}$/;
    if (!regex.test(chave)) return chave;

    const ano = chave.substring(0, 4);
    const mes = chave.substring(4, 6);
    const dia = chave.substring(6, 8);
    const hora = chave.substring(9, 11);
    const minuto = chave.substring(11, 13);
    const segundo = chave.substring(13, 15);

    const dataUTC = new Date(Date.UTC(ano, mes - 1, dia, hora, minuto, segundo));
    const opcoes = { timeZone: "America/Sao_Paulo", hour12: false };
    return dataUTC.toLocaleString("pt-BR", opcoes);
  }

  function renderValor(valor) {
    if (typeof valor === "object" && valor !== null) {
      return (
        <ul className="ml-6 list-disc text-indigo-900">
          {Object.entries(valor).map(([k, v]) => (
            <li key={k}>
              <span className="font-semibold">{formatarDataHora(k)}</span>: {renderValor(v)}
            </li>
          ))}
        </ul>
      );
    }
    return <span>{valor.toString()}</span>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-100 to-pink-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-8 text-center">Listagem de Dados</h1>
        {Object.entries(dados).length === 0 ? (
          <p className="text-indigo-600 text-center text-lg">Nenhum dado encontrado.</p>
        ) : (
          <ul className="space-y-4 text-indigo-900">
            {Object.entries(dados).map(([chave, valor]) => (
              <li key={chave} className="border border-indigo-300 rounded-lg p-4 shadow-sm hover:shadow-md transition">
                <strong className="text-indigo-700 text-xl">{chave}</strong>:
                {renderValor(valor)}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Botão voltar ao topo */}
        <button
    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    className="btn-voltar-topo"
    aria-label="Voltar ao topo"
  >
    ↑ Topo
  </button>
    </div>
  );
}
