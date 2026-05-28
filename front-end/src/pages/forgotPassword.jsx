import { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    console.log("Solicitar reset de senha para:", email);

    // Aqui você pode chamar a API para enviar o email de recuperação
  }

  return (
    <div>
      <h1>Esqueceu a senha?</h1>

      <form action="#" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </div>

        <button type="submit">Enviar link de recuperação</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
