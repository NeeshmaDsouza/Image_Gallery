import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Form } from "./Form";
import { v4 as uuid } from "uuid";
import ImageGallery from "./ImageGallery";
import { 
  addFireStoreDocument, 
  readAllFireStoreDocument, 
  updateFireStoreDocument,
  deleteFireStoreDocument
} from "../utils/firebase";
import { useEffect } from "react";
import { addObject, clearObjects, updateObject, listObjects, deleteObject } from "../utils/indexDB/index";

export function Home() {
  /* Used for opening and closing of form modals */
  const [open, setOpen] = React.useState(false);

  /* Used for searching images */
  const [searchPhrase, setSearchPhrase] = React.useState("");

  /* Used for maintaining current image being edited */
  const [currentImage, setCurrentImage] = React.useState(null);
  const [imageList, setImageList] = React.useState(
    []
 );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCurrentImage(null);
  }

  /* TODO: Have a standard styling format */
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

  const updateImageLocal = async (newImage) => {
    try {
      await updateObject(newImage, 'imageList')
        setImageList(imageList.map((image) => {
          if(image.id === newImage.id) {
            return newImage;
          }
          return image;
        }));
    } catch (error) {
      console.log('Failed to update image locally ', error);
    }
  }

  const addImageLocal = async (newImage) => {
    try {
      await addObject(newImage, 'imageList')
      setImageList([...imageList, newImage]);
    } catch (error) {
      console.log('Failed to add image locally ', error);
    }
  }

  const deleteImageLocal = async (imageId) => {
    try {
      await deleteObject(imageId, 'imageList')
      setImageList(imageList.filter((image) => image.id !== imageId));
    } catch (error) {
      console.log('Failed to delete image locally ', error);
    }
  }

  /* TODO: Loading screen when the image is updated to the database */
  async function addImage(newImage) {
    try {
      /* If image has an id it should be updated */
      if(newImage.id) {
        await updateFireStoreDocument('imageList', newImage);
        await updateImageLocal(newImage)
      } else {
        /* Else it should be created */
        delete newImage.id;
        let imageId = await addFireStoreDocument('imageList', newImage);
        newImage.id = imageId;
        await addImageLocal(newImage)
      }
      setCurrentImage(null);
    } catch (err) {
      console.log('Failed to update image in the firebase ', err);
      /* TODO: If firestore is not available save the image in the index DB locally */
      /*
      newImage.dirty = true
      if(newImage.id) {
       await updateImageLocal(newImage)
      } else {
        newImage.id = uuid();
        await addImageLocal(newImage)
      }
      */
    }
  }

  /* Handled for edit button */
  function handleEdit(imageId) {
    setCurrentImage(imageList.find((item) => item.id === imageId));
    handleOpen();
  }

  /* Handled for delete button */
  async function handleDelete(imageId) {
    let text = "Are you sure you want to delete this image?";
    if (confirm(text) == true) {
      await deleteFireStoreDocument('imageList', imageId);
      await deleteImageLocal(imageId)
    }
  }

  function searchImage(event) {
    setSearchPhrase(event.target.value);
  }

  useEffect(() => {
    /* TODO: Add code to update local updates to firebase */
    readAllFireStoreDocument('imageList')
    .then(async (imageList) => {
        console.log(clearObjects)
        await clearObjects('imageList')
        await Promise.all(imageList.map(image => {
          return addObject(image, 'imageList')
        }))
        setImageList(imageList)
    })
    .catch(async (err) => {
      console.log('Failed to read images in the firebase ', err);
      const imageList = await listObjects('imageList')
      setImageList(imageList)
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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Form handleClose={handleClose} addImage={addImage} currentImage={currentImage}/>
        </Box>
      </Modal>
    </div>
  );
}
