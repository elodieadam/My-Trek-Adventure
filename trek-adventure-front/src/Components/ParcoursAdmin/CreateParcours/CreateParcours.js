import "./Create.css";
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Parcours() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [parcours, setParcours] = useState(false);
  const nomParcoursRef = useRef();
  const dureeParcoursRef = useRef();
  const descriptionRef = useRef();
  const prixRef = useRef();
  const imgIllustrationRef = useRef();
  const niveauDifficulteRef = useRef();
  const headers = {
    "Content-Type": "application/json",
    // authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
  };
  const [image, setImage] = useState([]);

  const UploadImages = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };

    setImage(img);
  };

  async function LoadParcours() {
    let options = {
      method: "GET",
      headers: headers,
    };
    let response = await fetch("http://127.0.0.1:8080/parcours/", options);
    let donnes = await response.json();
    if (!donnes) {
      console.log("erreur");
      return;
    } else {
      setData(donnes.reverse());
      console.log("data présente: ", donnes);
    }
  }
  const DetailsParcours = async (id) => {
    navigate(`/parcours/details/${id}`);
  };
  const AddParcours = async (event) => {
    event.preventDefault();
    const nomParcours = nomParcoursRef.current.value;
    const dureeParcours = dureeParcoursRef.current.value;
    const description = descriptionRef.current.value;
    const prix = prixRef.current.value;
    const niveauDifficulte = niveauDifficulteRef.current.value;
    // const imgIllustration = imgIllustrationRef.current.value;
    let data = {
      nomParcours: nomParcours,
      dureeParcours: dureeParcours,
      description: description,
      prix: prix,
      /*imgIllustration: imgIllustration,*/
      niveauDifficulte: niveauDifficulte,
    };
    const body = JSON.stringify(data);
    let options = {
      method: "POST",
      body: body,
      headers: headers,
    };
    let reponse = await fetch(
      "http://127.0.0.1:8080/parcours/createParcours",
      options
    );
    let donnes = await reponse.json();
    if (donnes) {
      console.log("parcours publié :", donnes);
      setParcours(!parcours);
      const parcourId = donnes._id;
      ///////////////////////////////////////////////////////////
      if (image.data) {
        const msgId = parcourId;

        const url2 = "http://127.0.0.1:8080/parcours/createImageParcours";

        const formData = new FormData();
        formData.append("file", image.data);
        const response = await fetch(url2, {
          method: "POST",
          headers: {
            Authorization: "bearer " + msgId,
            // "Content-Type": "multipart/form-data boundary=something",
          },
          body: formData,
        });
        let result = await response.json();
        const res = JSON.stringify(result);

        if (res !== '{"message":"Echec"}') {
          console.log("image enregistrée");
          console.log(result.message);
          setImage([]);
        } else {
          console.log("parcour avec image par default créé");
        }
      }
      ////////////////////////////////////////////////////
    } else {
      console.log("parcours non publié");
    }
  };
  useEffect(() => {
    LoadParcours();
  }, [parcours]);
  return (
    <header>
      <div>
        <div className="scrollbar" id="style-3">
          <ul>
            {data.map((item) => (
              <li key={item._id}>
                <div class="box">
                  <div class="box-inner">
                    <div class="box-front">
                      <h2>Face frontale</h2>
                      <img
                        src={`http://127.0.0.1:8080/parcours/${item.imgIllustration}`}
                      ></img>
                    </div>
                    <div class="box-back">
                      <article>
                        <h3>{item.nomParcours}</h3>
                        <div>
                          <p>Durée du parcours : {item.dureeParcours}</p>
                        </div>
                        <div>
                          <p>{item.description}</p>
                        </div>
                        <div>
                          <p>Prix : {item.prix} €</p>
                        </div>
                        <div>
                          <p>Niveau de difficulté : {item.niveauDifficulte}</p>
                        </div>
                        <div>
                          <p> Nombre d'étapes : {[item.etape].length - 1}</p>
                        </div>
                        <div>
                          <p>
                            {" "}
                            Nombre de réservations :{" "}
                            {[item.reservation].length - 1}
                          </p>
                        </div>

                        <button
                          className="btn"
                          onClick={() => DetailsParcours(item._id)}
                        >
                          Détail du parcours
                        </button>
                      </article>
                    </div>
                  </div>
                </div>

                <div>
                  <p> Nombre d'étapes : {[item.etape].length - 1}</p>
                </div>
                <div>
                  <p>
                    {" "}
                    Nombre de réservations : {[item.reservation].length - 1}
                  </p>
                </div>
                <button onClick={() => DetailsParcours(item._id)}>
                  Détail du parcours
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div class="Creation-Parcours">
          <p>Creation des Parcours</p>
        </div>

        <div class="principale">
          <div class="container1">
            <div class="Gestion">
              <p>Gestion des parcours</p>
            </div>
            <div class="Nom">
              <input
                type="text"
                id="nom"
                placeholder="Nom"
                ref={nomParcoursRef}
              />
            </div>

            <div class="Durée">
              <input
                type="text"
                id="durée"
                placeholder="Durée"
                ref={dureeParcoursRef}
              />
            </div>

            <div class="Description">
              <textarea
                type="text"
                id="descriptionm"
                placeholder="Description"
                ref={descriptionRef}
              />
            </div>

            <div class="Prix">
              <input type="text" id="prix" placeholder="Prix" ref={prixRef} />
            </div>

            <div className="input-img">
              <label className="" htmlFor="img">
                Entrez Nouvelle Image
              </label>
              <input
                type="file"
                name="uimage"
                onChange={UploadImages}
                className="form-control"
                id="uploadBtn"
              />
            </div>

            <div class="Difficulté">
              <input
                type="text"
                id="difficulté"
                placeholder="Niveau de difficulté de 1 à 3"
                ref={niveauDifficulteRef}
              />
            </div>
            <button onClick={AddParcours}>Valider</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Parcours;
