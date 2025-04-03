import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <div className="login_page">
      <div className="login_box">
        <h1>Login</h1>
        <div className="login_input">
          <label>Usuário:</label>
          <input
            type="text"
            placeholder="Insira seu usuário cadastrado"
          ></input>
        </div>
        <div className="login_input">
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Insira seu usuário cadastrado"
          ></input>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
