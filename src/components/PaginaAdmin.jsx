import "../styles/Pagina_Admin_User.css";
import Icon_User from "../assets/Icon_User.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUsuarios } from '../contexts/ListaUsuariosContext.jsx'
//import { useSearchParams } from "react-router-dom";

function PaginaAdmin() {
  const navigate = useNavigate();
  /*
  const [searchParams] = useSearchParams();
  const userID = searchParams.get("id");
  const usuariosArmazenados = JSON.parse(localStorage.getItem("listaUsuarios")); VERSÃO 1

  const Usuario = usuariosArmazenados.find((u) => u.id == userID); //encontra o usuario que está conectado
  const usuariosArmazenados = JSON.parse(localStorage.getItem("listaUsuarios")); //pega a lista de usuários no localStorage
  const usuario = usuariosArmazenados.find(
    (u) => u.id == sessionStorage.getItem("usuarioLogado")
  ); //seleciona o usuário logado VERSÃO 2*/

  const { listaUsuarios, setListaUsuarios } = useUsuarios();
  const usuario = listaUsuarios.find((u) => u.id == Number(sessionStorage.getItem("usuarioLogado")));

  const [cadastrandoFuncionario, setCadastrandoFuncionario] = useState(false);

  //formulario
  const [formNome, setFormNome] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formUser, setFormUser] = useState("");
  const [formSenha, setFormSenha] = useState("");
  const [formRole, setFormRole] = useState("");

  useEffect(() => {
    if (!usuario || usuario.role != "admin") {
      navigate(-1);
    }
  }, []); //ao entrar na página, confere se tem alguém logado e se é admin. se não tiver, volta para o login

  if (!usuario) {
    return; //não lê o resto do código quando não tem usuário logado (para n dar problema)
  }

  function VoltarLogin() {
    navigate(-1);
  }

  const RadioEscolhido = (event) => {
    setFormRole(event.target.value);
  };

  function CadastrarFuncionario() {
    if ( formNome == "" || formEmail == "" || formUser == "" || formSenha == "" || formRole == "")
    {
      return; //retornar caso algum campo esteja vazio
    }
    const novoUsuario = {
      id: listaUsuarios.length + 1,
      nome: formNome,
      email: formEmail,
      user: formUser,
      senha: formSenha,
      role: formRole,
    };
    setListaUsuarios([...listaUsuarios, novoUsuario]);
    setFormNome("");
    setFormEmail("");
    setFormUser("");
    setFormSenha("");
    setFormRole("");
    setCadastrandoFuncionario(!cadastrandoFuncionario)
  }

  return (
    <div className="Pagina">
      <div className="Pagina_Titulo">
        <h1>Pagina Admin</h1>
      </div>
      <div className="Pagina_User">
        <img src={Icon_User} alt="Ícone de usuário" />
        <h3>{usuario.nome}</h3>
        <div className="informacoesUsuario">
          <p>
            <span style={{ fontWeight: "Bold" }}>Usuário: </span>
            {usuario.user}
          </p>
          <p>
            <span style={{ fontWeight: "Bold" }}>E-mail: </span>
            {usuario.email}
          </p>
          <p>
            <span style={{ fontWeight: "Bold" }}>Papel: </span>
            {usuario.role}
          </p>
        </div>
      </div>
      <div className="Pagina_Conteudo">
        <div className="botoes">
          {!cadastrandoFuncionario && (
            <button onClick={VoltarLogin}>Voltar para login</button>
          )}
          {!cadastrandoFuncionario && (
            <button
              onClick={() => {
                setCadastrandoFuncionario(!cadastrandoFuncionario);
              }}
            >
              Cadastrar novo usuário
            </button>
          )}

          {cadastrandoFuncionario && (
            <button
              onClick={() => {
                setCadastrandoFuncionario(!cadastrandoFuncionario);
              }}
            >
              Cancelar cadastro
            </button>
          )}
          {cadastrandoFuncionario && <button onClick={CadastrarFuncionario}>Enviar cadastro</button>}
        </div>
        {cadastrandoFuncionario && (
          <div className="FormularioCadastrarFuncionario">
            <div className="cadastro_input">
              <label>*Nome:</label>
              <input
                type="text"
                placeholder="Insira o nome do novo usuário"
                value={formNome}
                onChange={(event) => setFormNome(event.target.value)}
              ></input>
            </div>
            <div className="cadastro_input">
              <label>*E-mail: </label>
              <input
                type="text"
                placeholder="Insira o email do novo usuário"
                value={formEmail}
                onChange={(event) => setFormEmail(event.target.value)}
              ></input>
            </div>
            <div className="cadastro_input">
              <label>*User: </label>
              <input
                type="text"
                placeholder="Insira o user do novo usuário"
                value={formUser}
                onChange={(event) => setFormUser(event.target.value)}
              ></input>
            </div>
            <div className="cadastro_input">
              <label>*Senha: </label>
              <input
                type="password"
                placeholder="Insira o User do novo usuário"
                value={formSenha}
                onChange={(event) => setFormSenha(event.target.value)}
              ></input>
            </div>
            <div className="cadastro_input_radio">
              <p>*Escolha o papel do usuario:</p>
              <div className="radio1">
                <label>
                  <input
                    type="radio"
                    name="roles" // Mesmo "name" para agrupar os radios
                    value="user"
                    checked={formRole === "user"}
                    onChange={RadioEscolhido}
                  />
                  &nbsp; User
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="roles" // Mesmo "name" para agrupar os radios
                    value="admin"
                    checked={formRole === "admin"}
                    onChange={RadioEscolhido}
                  />
                  &nbsp; Admin
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginaAdmin;
