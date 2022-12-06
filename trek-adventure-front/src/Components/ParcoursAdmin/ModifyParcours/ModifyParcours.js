import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Modify.css";

export default function ModifyParcours() {
  const navigate = useNavigate();
  const headers = {
    "Content-Type": "application/json",
    // authorization: `Bearer ${JSON.parse(localStorage.getdetails("token"))}`,
  };
  let { id } = useParams();
  const [details,setDetails] = useState({});

  async function getParcoursDetails(id) {
    let options = {
      method: "GET",
      headers: headers,
    };
    let response = await fetch(`http://127.0.0.1:8080/parcours/${id}`, options);
    let donnes = await response.json();
    if (!donnes) {
      console.log("erreur");
      return;
    } else {
      console.log("détails du parcours: ", donnes);
      setDetails(donnes)
    }
  }
  const DeleteParcours = async (id) => {
    let options = {
      method: "DELETE",
      headers: headers,
    };
    let response = await fetch(
      `http://127.0.0.1:8080/parcours/deleteParcours/${id}`,
      options
    );
    let donnes = await response.json();
    if (donnes) {
      console.log("Parcours supprimé ", donnes);
      navigate("/parcours")
    } else {
      console.log("erreur");
    }
  };

  useEffect(() => {
    getParcoursDetails(id);
  }, []);

  return (
    <header>
      <div class="Details-Parcours">
        <p>Détails du parcours</p>
      </div>

      <div>

              <article key={details._id}>
                <h3>{details.nomParcours}</h3>
                <div>
                  <p>Durée du parcours : {details.dureeParcours}</p>
                </div>
                <div>
                  <p>{details.description}</p>
                </div>
                <div>
                  <p>Prix : {details.prix} €</p>
                </div>
                <div>
                  <p>Niveau de difficulté : {details.niveauDifficulte}</p>
                </div>
                <div>
                  <p> Nombre d'étapes : {[details.etape].length-1}</p>
                </div>
                <div>
                  <p> Nombre de réservations : {[details.reservation].length-1}</p>
                </div>
                <button className="btn-supprimer" onClick={()=>DeleteParcours(details._id)}>Supprimer</button>
              </article>
      </div>

      <div class="container2">
        <div class="Liste">
          <p>Liste des réservations</p>
        </div>

        <div class="Nom1">
          <input type="text" id="Nom" placeholder="Nom" />
        </div>

        <div class="Localisation">
          <input type="text" id="Localisation" placeholder="Localisation" />
        </div>

        <div class="Description1">
          <textarea type="text" id="descriptionm" placeholder="Description" />
        </div>

        <div class="Image1">
          <input type="text" id="Image" placeholder="Image d’illustration" />
        </div>
        <button class="btn-Enregister">
          <span class="button__text">Enregister</span>
          <i class="button__icon fas fa-chevron-right"></i>
        </button>
      </div>
    </header>
  );
}
