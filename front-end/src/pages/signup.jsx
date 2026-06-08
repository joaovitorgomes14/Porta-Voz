import { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    console.log("Nome:", name);
    console.log("Email:", email);
    console.log("Senha:", password);

    // Aqui você pode chamar a API para criar a conta
  }

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-slate-100 to-slate-200 px-4">
      

      <form action="#" onSubmit={handleSubmit} className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm w-full flex flex-col gap-5 max-w-md">
        <div className="text-center">
          <h1 className="text-xl font-semibold text-slate-800">Cadastre-se</h1>
          <p className="text-xs text-slate-500 mt-1">Crie sua conta para acessar o sistema</p>
        </div>
        <div>
          <label htmlFor="name" className="text-sm font-medium text-slate-600">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-slate-600">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          />
        </div>

        <div>
          <label htmlFor="password" className="text-sm font-medium text-slate-600">
            Senha
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-200"
          />
        </div>

        <button type="submit" disabled={isLoading} aria-busy={isLoading} className="bg-blue-700 text-white p-3 rounded-lg font-medium transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          Criar conta
        </button>
      </form>
    </div>
  );
}

export default Signup;
