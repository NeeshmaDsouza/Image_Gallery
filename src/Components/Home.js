import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Form } from "./Form";
import { v4 as uuid } from "uuid";
import ImageGallery from "./ImageGallery";
import { addFireStoreDocument, readAllFireStoreDocument } from "../utils/firebase";
import { useEffect } from "react";

export function Home() {
  const [open, setOpen] = React.useState(false);
  const [searchPhrase, setSearchPhrase] = React.useState("");
  const [imageList, setImageList] = React.useState(
    [
      /*
      {
        id: uuid(),
        title: "River",
        description: 'River and Mountaind',
        animation: 'shake',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/2189700/pexels-photo-2189700.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Sea",
        description: 'Ship and Sea',
        animation: 'fadeIn',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1295036/pexels-photo-1295036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Wheel",
        description: 'Yellow wheel',
        animation: 'transform',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/16665616/pexels-photo-16665616/free-photo-of-potted-plants-and-wheels-in-a-store.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Plant",
        description: 'Green Plant iun a White pot',
        animation: 'colourize',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2https://images.pexels.com/photos/1777813/pexels-photo-1777813.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Grass",
        description: 'Green and wet grass',
        animation: 'shake',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/1089450/pexels-photo-1089450.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      },
      {
        id: uuid(),
        title: "Decor",
        description: 'Modern Decor',
        animation: 'transform',
        size: "sm",
        imgURL:
          "https://images.pexels.com/photos/4558718/pexels-photo-4558718.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      }
      */
    ]
 );

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    height: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  };

  async function addImage(newImage) {
    try {
      let imageId = await addFireStoreDocument('imageList', newImage);
      newImage.id = imageId;
      setImageList([...imageList, newImage]);
    } catch (err) {
      console.log('Error in addImage', err);
    }
  }

  function searchImage(event) {
    setSearchPhrase(event.target.value);
  }

  useEffect(() => {
    readAllFireStoreDocument('imageList')
    .then((response) => {
      setImageList(response)
    })
    .catch((err) => {
      console.log('Error in reading data', err)
    })
  })

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
