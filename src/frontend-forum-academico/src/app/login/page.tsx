import "./login_style.css";


export default function Login() {
    return (
        <>
            <div id="logo-div">
                <img src="/logo.svg" alt="logo" />
            </div>
            <div id="login-div">
                <h1>Compartilhe Conhecimento</h1>
                <form id="login-info">
                    <div className="form-div">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" />
                    </div>

                    <div className="form-div">
                        <label htmlFor="pass">Password</label>
                        <input type="password" id="pass" name="password" />
                    </div>

                    <input className="botao" type="submit" value="Entrar" />
                </form>
            </div>

            <div id="cad-div">
                <input id="cadastrar" className="botao" type="button" value="Cadastrar" />
            </div>
        </>
    );
}
