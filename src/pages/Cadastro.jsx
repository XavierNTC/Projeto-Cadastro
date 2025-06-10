import { useState } from "react";
import { database } from "../services/firebase";
import { ref, set } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast"; // Mantive a importação original

export default function Cadastro() {
  const [nome, setNome] = useState("");
  const [ra, setRa] = useState("");
  const [cartaoId, setCartaoId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!nome || !ra || !cartaoId) {
      toast.error("Por favor, preencha todos os campos!");
      setIsLoading(false);
      return;
    }

    if (!/^\d+$/.test(ra)) {
      toast.error("O RA deve conter apenas números!");
      setIsLoading(false);
      return;
    }

    const formattedCartaoId = cartaoId.trim().toUpperCase();
    const cardRef = ref(database, "autorizados/" + formattedCartaoId);

    const novoUsuario = { nome, ra, autorizado: true };

    try {
      await set(cardRef, novoUsuario);
      toast.success("Cartão cadastrado com sucesso!");
      setNome("");
      setRa("");
      setCartaoId("");
      navigate("/listagem");
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      toast.error("Erro ao cadastrar. Tente novamente!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-700 via-indigo-800 to-blue-800 flex items-center justify-center p-6 sm:p-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white bg-opacity-95 backdrop-blur-md rounded-3xl shadow-xl p-8 sm:p-12 max-w-lg w-full transform transition-all duration-500 hover:scale-102">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-center text-indigo-900 mb-8 sm:mb-10 leading-tight">
          <span className="block"></span> Cadastro de Cartão
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 sm:gap-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Nome Completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="peer border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-50 rounded-2xl px-5 py-4 text-gray-800 font-medium placeholder-transparent transition duration-300 ease-in-out w-full"
              id="nome"
            />
            <label
              htmlFor="nome"
              className="absolute left-5 -top-3.5 text-indigo-500 text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm transition-all duration-300"
            >
              Nome Completo
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Registro Acadêmico (RA)"
              value={ra}
              onChange={(e) => setRa(e.target.value)}
              className="peer border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-50 rounded-2xl px-5 py-4 text-gray-800 font-medium placeholder-transparent transition duration-300 ease-in-out w-full"
              id="ra"
            />
            <label
              htmlFor="ra"
              className="absolute left-5 -top-3.5 text-indigo-500 text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm transition-all duration-300"
            >
              Registro Acadêmico (RA)
            </label>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="ID do Cartão (Ex: 123ID)"
              value={cartaoId}
              onChange={(e) => setCartaoId(e.target.value)}
              className="peer border border-gray-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-200 focus:ring-opacity-50 rounded-2xl px-5 py-4 text-gray-800 font-medium placeholder-transparent transition duration-300 ease-in-out w-full"
              id="cartaoId"
            />
            <label
              htmlFor="cartaoId"
              className="absolute left-5 -top-3.5 text-indigo-500 text-sm peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-indigo-500 peer-focus:text-sm transition-all duration-300"
            >
              ID do Cartão
            </label>
          </div>

          <button
            type="submit"
            className={`
              bg-indigo-700
              hover:bg-indigo-800
              active:bg-indigo-900
              text-white
              font-bold
              rounded-full
              py-4
              px-8
              shadow-lg
              shadow-indigo-700/50
              transition
              duration-300
              ease-in-out
              transform
              hover:-translate-y-1
              active:translate-y-0
              focus:outline-none
              focus:ring-4
              focus:ring-indigo-400/70
              flex items-center justify-center
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
              transition-shadow
            `}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Cadastrando...
              </span>
            ) : (
              "Cadastrar Cartão"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}