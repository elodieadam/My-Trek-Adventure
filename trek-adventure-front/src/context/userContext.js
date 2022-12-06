import { createContext, useState, useEffect } from "react";

export const userContext = createContext(
  { identifiant: "", setIdentifiant: () => {} },
  { role: "", setRole: () => {} },
  { nom: "", setNom: () => {} }
);

export default function UserProvider(props) {
  const [identifiant, setIdentifiant] = useState("");
  const [role, setRole] = useState("");
  const [nom, setNom] = useState("");

  useEffect(() => {
    async function getUser() {
      const token = localStorage.getItem("token");
      const url = "http://localhost:8080/users/user";
      const options = {
        method: "GET",
        headers: {
          Authorization: "bearer " + token,
        },
      };
      const response = await fetch(url, options);

      let result = await response.json();

      console.log(result);

      if (result.profil.identifiant) {
        console.log(result);
        setIdentifiant(result.profil.identifiant);
        setRole(result.profil.role);
        setNom(result.profil.nom);
      } else {
        console.log(result);
      }
    }

    getUser();
  }, [identifiant, role]);

  return (
    <userContext.Provider
      value={{
        identifiant,
        setIdentifiant,
        role,
        setRole,
        nom,
      }}
    >
      {props.children}{" "}
    </userContext.Provider>
  );
}
