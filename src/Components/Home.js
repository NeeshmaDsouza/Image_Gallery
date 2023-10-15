import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Form } from "./Form";
import { v4 as uuid } from "uuid";
import ImageGallery from "./ImageGallery";
import { addFireStoreDocument, readAllFireStoreDocument } from "../utils/firebase";
import { useEffect } from "react";
import { addObject, clearObjects } from "../utils/indexDB";
import { listObjects } from "../utils/indexDB";
import { appConfig } from "../config";

export function Home() {
  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [imageList, setImageList] = React.useState([]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    height: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  async function addImage(newImage) {
    try {
      let imageId = await addFireStoreDocument('imageList', newImage);
      newImage.id = imageId;
      await addObject(newImage, 'imageList')
      setImageList([...imageList, newImage]);
    } catch (err) {
      newImage.id = uuid();
      await addObject(newImage, 'imageList')
      setImageList([...imageList, newImage]);
      console.log('Error in addImage', err);
    }
  }

  function searchImage(event) {
    setSearchPhrase(event.target.value);
  }

  useEffect(() => {
    readAllFireStoreDocument('imageList')
    .then(async (imageList) => {
      const initialImages = appConfig.initialImages
      if(imageList.length === 0) {
        await Promise.all(initialImages.map(image => {
          return addFireStoreDocument('imageList', image)
          .then(() => addObject(image, 'imageList'))
        }))
        setImageList(initialImages)
      } else {
        await clearObjects('imageList')
        await Promise.all(imageList.map(image => {
          return addObject(image, 'imageList')
        }))
        setImageList(imageList)
      }
    })
    .catch(async (err) => {
      const imageList = await listObjects('imageList')
      await clearObjects('imageList')
      await Promise.all(initialImages.map(image => {
        return addObject(image, 'imageList')
      }))
      setImageList(imageList)
      console.log('Error in reading data', err)
    })
  }, []);

  return (
    <div className="homeContainer">
      <div className="container m-2">
        <button className="homebtnStyle m-2" onClick={handleOpen}>
          Add Image
        </button>
      </div>
      <h1 className="mb-4">Image Gallery</h1>
      <input
        type="text"
        className="searchBar mb-4"
        onChange={searchImage}
        value={searchPhrase}
        placeholder="Search by title"
      ></input>
      <ImageGallery
        imageList={imageList.filter((image) =>
          image.title.toLowerCase().includes(searchPhrase.toLowerCase())
        )}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form handleClose={handleClose} addImage={addImage} />
        </Box>
      </Modal>
    </div>
  );
}
