import "./styles.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";



import { userContext } from "../../context/userContext";
import { useContext } from "react";

function Connexion() {
  //Création du UseContext 
  const { identifiant, setIdentifiant, role, setRole } = useContext(userContext);
  const navigate = useNavigate();
  const login = async (identifiant, password) => {
    let data = { password: password, identifiant: identifiant };
    let options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: new Headers({ "Content-Type": "application/json" }),
    };

    let reponse = await fetch("http://127.0.0.1:8080/users/signin", options);

    let donnees = await reponse.json();

    console.log(donnees);
    // Enregistrement du token dans le localStorage
    localStorage.setItem("token", donnees.token);
    if (donnees.message == "Connecté") {
      alert(donnees);
      setIdentifiant(identifiant);
      setRole(donnees.userRole);
      if (donnees.userRole == "admin") {
        navigate("/AccueilAdmin");
      } else {
        if (donnees.userRole == "guide") {
          navigate("/AccueilGuide");
      } else {
        navigate("/AccueilClient");
      }
    }
      
    } else {
      alert("Identifiant ou Mot de Passe incorrect!");
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const mail = e.target.elements.mail.value;
    const password = e.target.elements.password.value;
    login(mail, password);
  }

  return (
    <header>
      <div className="home">
        {/* <body classname="img"> */}

        <div className="img1"> </div>

        {/* <h2 className="heading">My Trek Adventure</h2> */}

        {/* </body> */}
        <div className="fondVert1"></div>
      </div>

      <div className="Connexion">
        <p>Connexion</p>
      </div>

      <form className="login" onSubmit={handleSubmit}>
        <input
          className="log"
          id="mail"
          type="email"
          placeholder="Email"
          required
        />
        <input
          className="log"
          id="password"
          type="password"
          placeholder="Password"
          required
        />

        <div class="réinitialiser">
          <a href="">Réinitialiser Password</a>
        </div>
        <div>
          <button class="button">
            <span class="button__text">Connexion</span>
            <i class="button__icon fas fa-chevron-right"></i>
          </button>
        </div>
      </form>

     
    </header>
  );
}

export default Connexion;
