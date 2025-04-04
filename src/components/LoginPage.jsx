import "../styles/LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const [usuarioDigitado, setUsuarioDigitado] = useState("");
  const [senhaDigitada, setSenhaDigitada] = useState("");
  const [mensagemErro, setMensagemErro] = useState(false);

  // eslint-disable-next-line no-unused-vars
  const [listaUsuarios, setListaUsuarios] = useState([
    {
      id: 1,
      role: "admin",
      nome: "Aline Lopes Ferreira",
      user: "2022101990",
      email: "alinelopesf13@gmail.com",
      senha: "1234",
    },
  ]);

  useEffect(() => {
    localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios)); //nome do que vai ser armazenado e JSON da conversão para string da tasks
  }, [listaUsuarios]);

  useEffect(() => {
    // Limpa o usuário logado ao entrar na página de login
    sessionStorage.removeItem("usuarioLogado");
  }, []);

  function conferirUsuario() {
    const usuariosArmazenados = JSON.parse(
      localStorage.getItem("listaUsuarios")
    );

    const usuarioEncontrado = usuariosArmazenados.find(
      (u) => u.user == usuarioDigitado && u.senha == senhaDigitada
    );

    return usuarioEncontrado ? usuarioEncontrado : null;
  }

  function definirEntrada() {
    const usuario = conferirUsuario();
    if (usuario) {
      setMensagemErro(false);
      Logar(usuario.id, usuario.role);
    } else {
      // usuário inválido → mostra mensagem de erro
      setMensagemErro(true);
    }
  }

  function Logar(idUsuario, roleUsuario) {
    /*
    const query = new URLSearchParams();
    query.set("id", idUsuario);
    navigate(`/PaginaPrincipal?${query}`);*/
    sessionStorage.setItem("usuarioLogado", idUsuario);
    if (roleUsuario == "admin") {
      navigate("/PaginaAdmin");
    } else {
      navigate("/PaginaUser");
    }
  }

  return (
    <div className="login_page">
      <div className="login_box">
        <h1>Login</h1>
        <div className="login_input">
          <label>Usuário:</label>
          <input
            type="text"
            placeholder="Insira seu usuário cadastrado"
            value={usuarioDigitado}
            onChange={(event) => setUsuarioDigitado(event.target.value)}
          ></input>
        </div>
        <div className="login_input">
          <label>Senha:</label>
          <input
            type="password"
            placeholder="Insira sua senha"
            value={senhaDigitada}
            onChange={(event) => setSenhaDigitada(event.target.value)}
          ></input>
        </div>
        {mensagemErro && <p>Usuário ou senha incorretos!</p>}
        <button onClick={definirEntrada}>Entrar</button>
      </div>
    </div>
  );
}

export default LoginPage;
