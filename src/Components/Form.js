import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { uploadFile } from "../utils/firebase";

export function Form({ handleClose, addImage }) {
  let [formDetails, setFormDetails] = React.useState({
    imgURL: "",
    title: "",
    description: "",
    size: "",
    animation: ""
  });

  const handleChange = (event) => {
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };
  let [imageFile, setImageFile] = React.useState('');
  const handleUplaod = (event) => {
    setImageFile(event.target.files[0])
  };

  async function saveForm() {
    try {
      if(imageFile) {
        const downloadUrl = await uploadFile(`imageFileList/${Date.now()}${imageFile.name}`, imageFile);
        formDetails.imgURL = downloadUrl;
      }
      await addImage(formDetails);
      clearForm();
    } catch(err) {
      console.log('Error in save form', err);
    }
  }

  function clearForm() {
    setFormDetails({
      imgURL: "",
      title: "",
      description: "",
      size: "",
      animation: ""
    });
    handleClose();
  }

  return (
    <>
      <div className="formContainer">
        <div className="inputContainer">
          <label>Enter Image URL</label>
          <input
            name="imgURL"
            type="text"
            onChange={handleChange}
            value={formDetails.imgURL}
            className="textbox"
          ></input>
          <input
            type="file"
            onChange={handleUplaod}
          ></input>
        </div>
        <div className="inputContainer">
          <label>Enter Image Title</label>

          <input
            name="title"
            onChange={handleChange}
            value={formDetails.title}
            type="text"
            className="textbox"
          ></input>
        </div>
        <div className="inputContainer">
          <label>Enter Image Description</label>
          <input
            name="description"
            onChange={handleChange}
            value={formDetails.description}
            type="text"
            className="textbox"
          ></input>
        </div>
        <div className="inputContainer">
          <label>Enter Image Size</label>
          <Select
            name="size"
            className="textbox"
            id="sizeSelect"
            value={formDetails.size}
            onChange={handleChange}
          >
            <MenuItem value={"sm"}>Small</MenuItem>
            <MenuItem value={"sm"}>Medium</MenuItem>
            <MenuItem value={"sm"}>Large</MenuItem>
          </Select>
        </div>
        <div className="inputContainer">
          <label>Enter Image Animation</label>
          <Select
            name="animation"
            className="textbox"
            id="animationSelect"
            value={formDetails.animation}
            onChange={handleChange}
          >
            <MenuItem value={"fadeIn"}>Fade In</MenuItem>
            <MenuItem value={"transform"}>Transform</MenuItem>
            <MenuItem value={"shake"}>Shake</MenuItem>
            <MenuItem value={"colourize"}>De-Colourize</MenuItem>
          </Select>
        </div>
      </div>
      <div className="formBtn">
        <button className="btnStyle" onClick={saveForm}>
          Save
        </button>
        <button onClick={clearForm} className="btnStyle">
          Cancel
        </button>
      </div>
    </>
  );
}
