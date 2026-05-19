import { useState } from "react";

function Login() {

    //estates
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //função de submit do form
    function handleSubmit(event) {
        event.preventDefault();

        console.log("Email:", email);
        console.log("Senha:", password);

    }

    return (
        <div>
            <h1>Testando pagina de login</h1>

            <form action="#" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" />
                </div>
                <div>
                    <label htmlFor="password">Senha</label>
                    <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" />
                </div>

                <button type="submit">Entrar</button>

            </form>
        </div>
    )
}
export default Login;