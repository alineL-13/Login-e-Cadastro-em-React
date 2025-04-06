import PropTypes from 'prop-types';
import { createContext, useState, useContext, useEffect } from 'react';

export const UsuariosContext = createContext();

export function UsuariosProvider({ children }) {
    const [listaUsuarios, setListaUsuarios] = useState(() => {
      const usuariosSalvos = localStorage.getItem("listaUsuarios");
      return usuariosSalvos ? JSON.parse(usuariosSalvos) : [
        {
          id: 1,
          role: "admin",
          nome: "Aline Lopes Ferreira",
          user: "2022101990",
          email: "alinelopesf13@gmail.com",
          senha: "1234",
        },
      ];
    }); //confere se já tem algo salvo no local storage

      useEffect(() => {
        localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
      }, [listaUsuarios]);

      /*
      // eslint-disable-next-line no-unused-vars
      const adicionarUsuario = (novoUsuario) => {
        setListaUsuarios([...listaUsuarios, novoUsuario]);
      };*/

      return (
        <UsuariosContext.Provider value={{ listaUsuarios, setListaUsuarios }}>
          {children}
        </UsuariosContext.Provider>
      );
}

UsuariosProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUsuarios() {
  return useContext(UsuariosContext);
}