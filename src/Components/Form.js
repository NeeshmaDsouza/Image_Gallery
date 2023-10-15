import * as React from "react";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { uploadFile } from "../utils/firebase";
import UploadIcon from '@mui/icons-material/Upload';

export function Form({ handleClose, addImage, currentImage }) {
  let [formDetails, setFormDetails] = React.useState({
    id: currentImage?.id,
    imgURL: currentImage ? currentImage.imgURL : "",
    title: currentImage ? currentImage.title : "",
    description: currentImage ? currentImage.description : "",
    size: currentImage ? currentImage.size : "",
    animation: currentImage ? currentImage.animation : "",
  });
  const nonMandatoryFields = ['imgURL'];

  const handleChange = (event) => {
    setInvalidFields([]);
    setFormDetails({ ...formDetails, [event.target.name]: event.target.value });
  };
  let [imageFile, setImageFile] = React.useState('');
  const handleUplaod = (event) => {
    setImageFile(event.target.files[0])
  };

  let [invalidFields, setInvalidFields] = React.useState([]);

  async function saveForm() {
    try {
      let invalidFieldList = [];
      if(imageFile) {
        formDetails.imgURL = 'temporaryValue';
      }
      for(let inputField in formDetails) {
        if(formDetails[inputField] == '') {
          invalidFieldList.push(inputField);
        }
      }
      setInvalidFields([...new Set([...invalidFields, ...invalidFieldList])]);
      if(invalidFieldList.length>0) {
        return false;
      }
      if(imageFile) {
        console.log('-------------------------------------')
        const downloadUrl = await uploadFile(`imageFileList/${Date.now()}${imageFile.name}`, imageFile);
        console.log("downloadUrl", downloadUrl)
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
          <div>
            <input
              style={{ width: "220px" }}
              name="imgURL"
              type="text"
              onChange={handleChange}
              value={formDetails.imgURL}
              className={`textbox ${invalidFields.includes('imgURL') ? 'inputWarning' : ''}`}
              ></input>
            <input
              type="file"
              id="upload-file"
              style={{ display: "none" }}
              onChange={handleUplaod}
            >
            </input>
            <label htmlFor="upload-file">
              <UploadIcon/>
            </label>
          </div>
        </div>
        <div className="inputContainer">
          <label>Enter Image Title</label>
          <input
            name="title"
            onChange={handleChange}
            value={formDetails.title}
            type="text"
            className={`textbox ${invalidFields.includes('title') ? 'inputWarning' : ''}`}
          ></input>
        </div>
        <div className="inputContainer">
          <label>Enter Image Description</label>
          <input
            name="description"
            onChange={handleChange}
            value={formDetails.description}
            type="text"
            className={`textbox ${invalidFields.includes('description') ? 'inputWarning' : ''}`}
          ></input>
        </div>
        <div className="inputContainer">
          <label>Enter Image Size</label>
          <Select
            name="size"
            className={`textbox ${invalidFields.includes('size') ? 'inputWarning' : ''}`}
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
            className={`textbox ${invalidFields.includes('animation') ? 'inputWarning' : ''}`}
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
