import "../styles/Pagina_Admin_User.css";
import Icon_User from "../assets/Icon_User.png";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function PaginaUser() {
  const navigate = useNavigate();
  const usuariosArmazenados = JSON.parse(localStorage.getItem("listaUsuarios"));
  const usuario = usuariosArmazenados.find(
    (u) => u.id == sessionStorage.getItem("usuarioLogado")
  );
  console.log(usuario);

  useEffect(() => {
    if (!usuario) {
      navigate(-1);
    }
  }, []);

  if (!usuario) {
    return;
  }

  function VoltarLogin() {
    navigate(-1);
  }

  return (
    <div className="Pagina">
      <div className="Pagina_Titulo">
        <h1>Pagina User</h1>
      </div>
      <div className="Pagina_User">
        <img src={Icon_User} alt="Ícone de usuário" />
        <h3>{usuario.nome}</h3>
      </div>
      <div className="Pagina_Conteudo">
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
        <div className="botoes">
            <button onClick={VoltarLogin}>Voltar para login</button>
        </div>
      </div>
    </div>
  );
}

export default PaginaUser;
