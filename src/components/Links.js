import React, { useEffect, useState } from "react";
import { LinkForm } from "./LinkForm";
import { db } from "../firebase";
import { toast } from "react-toastify";
export const Links = () => {
  const [links, setlinks] = useState([]);

  const [currentId, setCurrentId] = useState("");
  //funcion para agregar o guardar en datos en firebase
  const addOrEditLink = async (linkObject) => {
    // desde la base de firebase, se crea una colección(cojunto de datos)
    //llamado link y va generar un documento nuevo que generará un id unico
    // y los datos que se van a guardar son pasados .set(LinkObject)
    // esto genera evento asincrono
    try {
      if (currentId === "") {
        await db.collection("links").doc().set(linkObject);
        toast("New Link Added", {
          type: "success",
          autoClose: 2000,
        });
      } else {
        await db.collection("links").doc(currentId).update(linkObject);
        toast("Link Updated Succeessfully", {
          type: "info",
          autoClose: 2000,
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error("error");
    }
  };

  const onDeleteLink = async (id) => {
    if (window.confirm("are you sure you want  to delete this link?")) {
      await db.collection("links").doc(id).delete();
      toast("Link Removed Successfully", {
        type: "error",
        autoClose: 2000,
      });
    }
  };

  const getLinks = async () => {
    // para obtener los datos de collection con get() (solo los renderiza una vez)
    // querySnapshot es la respuesta que da el servidor firebase
    //onSnapshot recibe una función como parametro q se ejecuta cada vez q los datos cambien
    db.collection("links").onSnapshot((querySnapshot) => {
      //para añadir el id de firebase al objeto (doc.data() y doc.id)
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      //asignarlos al estado
      setlinks(docs);
    });
  };

  //obtener datos de firesbase
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div className="position-relative">
      <h1 className="p-2">Link App</h1>
      <div className="col-md-4-center p-2">
        <LinkForm {...{ addOrEditLink, currentId, links }} />
      </div>

      <div className="col-md-4-center p-2">
        {links.map((link) => (
          <div className="card mb-1" key={link.id}>
            <div className="card-body">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div>
                  <i
                    className="material-icons text-danger"
                    onClick={() => onDeleteLink(link.id)}
                  >
                    close
                  </i>
                  <i
                    className="material-icons"
                    onClick={() => setCurrentId(link.id)}
                  >
                    create
                  </i>
                </div>
              </div>

              <p>{link.description}</p>
              <a href={link.url} target="_blank" rel="noreferrer">
                Go to Website
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
