import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, LogIn, ShieldCheck } from "lucide-react";
import { loginRequest } from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      await loginRequest({ email, password });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || "Credenciais inválidas. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm w-full flex flex-col gap-5 max-w-md"
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-3">
            <User size={24} className="text-blue-700" />
          </div>
          <h1 className="text-xl font-semibold text-slate-800">Porta Voz</h1>
          <p className="text-xs text-slate-500 mt-1">
            Sistema de gerenciamento de demandas 
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2 rounded-lg" role="alert">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-slate-600">
            E-mail institucional
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="usuario@prefeitura.gov.br"
            autoComplete="email"
            aria-label="E-mail institucional"
            className="border border-slate-300 p-3 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:scale-[1.01] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-slate-600">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-label="Senha"
            className="border border-slate-300 p-3 rounded-lg bg-white text-slate-800 placeholder:text-slate-400 outline-none transition-all duration-200 focus:scale-[1.01] focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          aria-busy={isLoading}
          className="bg-blue-700 text-white p-3 rounded-lg font-medium transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          <LogIn size={16} />
          {isLoading ? "Autenticando..." : "Entrar"}
        </button>

        <div className="flex justify-between text-sm border-t border-slate-100 pt-4">
          <Link to="/forgot-password" className="text-slate-500 hover:underline hover:text-blue-700 transition-all duration-200">
            Esqueci minha senha
          </Link>
          <Link to="/signup" className="text-slate-500 hover:underline hover:text-blue-700 transition-all duration-200">
            Criar conta
          </Link>
        </div>

        <p className="text-xs text-slate-400 text-center flex items-center justify-center gap-1">
          <ShieldCheck size={12} /> Acesso restrito · Uso exclusivo de servidores municipais
        </p>
      </form>
    </div>
  );
}

export default Login;