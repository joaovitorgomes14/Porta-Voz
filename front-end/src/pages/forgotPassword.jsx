import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Solicitar reset de senha para:", email);

    // Aqui você pode chamar a API para enviar o email de recuperação
  }

  return (
    <div className="h-screen flex justify-center items-center bg-linear-to-br from-slate-100 to-slate-200 px-4">

      <form action="#" onSubmit={handleSubmit}
      className="bg-white border border-slate-200 p-8 rounded-2xl shadow-sm w-full flex flex-col gap-5 max-w-md">

        <div className="text-center">
          <h2 className="text-xl font-semibold text-slate-800">Esqueceu a senha?</h2>
          <p className="text-xs text-slate-500 mt-1">
            Digite seu email e enviaremos um link para redefinir sua senha.
          </p>
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
            autoComplete="email"
            className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        <button type="submit" className="bg-blue-700 text-white p-3 rounded-lg font-medium transition-all duration-200 hover:bg-blue-800 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed">
          Enviar link de recuperação
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;
