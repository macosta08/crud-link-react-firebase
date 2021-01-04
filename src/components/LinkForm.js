import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { toast } from "react-toastify";

export const LinkForm = ({ addOrEditLink, currentId }) => {
  const initialStateValues = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialStateValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  //para validar la url
  const validURL = (str) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validURL(values.url)) {
      return toast("invalid url", { type: "warning", autoClose: 1000 });
    }

    addOrEditLink(values);
    setValues({ ...initialStateValues });
  };

  const getLinkById = async (id) => {
    const doc = await db.collection("links").doc(id).get(); //obtener los valores
    setValues({ ...doc.data() }); // mostrar los valores nuevamente en el formulario
  };

  useEffect(() => {
    if (currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      getLinkById(currentId);
    }
  }, [currentId]);

  return (
    <form className="card card-body border-primary" onSubmit={handleSubmit}>
      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">insert_link</i>
        </div>

        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="https=//someurl.com"
          name="url"
          value={values.url}
        />
      </div>

      <div className="form-group input-group">
        <div className="input-group-text bg-light">
          <i className="material-icons">create</i>
        </div>

        <input
          onChange={handleInputChange}
          type="text"
          className="form-control"
          placeholder="Website name"
          name="name"
          value={values.name}
        />
      </div>

      <div className="form-group">
        <textarea
          onChange={handleInputChange}
          rows="3"
          className="form-control"
          placeholder="Write a description"
          name="description"
          value={values.description}
        ></textarea>
      </div>

      <button className="btn btn-primary btn-block">
        {currentId === "" ? "Save" : "Update"}
      </button>
    </form>
  );
};
