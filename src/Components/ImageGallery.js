import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const GalleryItem = ({ imgURL, title, description, size, animation, handleEdit, handleDelete, id }) => {

  function MouseOver(event) {
    if(animation == 'transform') {
      event.target.style.transform = "scaleX(-1)";
    }
    if(animation == 'fadeIn') {
      event.target.style.animation = "fadeInAnimation 0.5s forwards";
    }
    if(animation == 'colourize') {
      event.target.style.animation = "colourizeAnimation 0.5s forwards";
    }
    if(animation == 'shake') {
      event.target.style.animation = "shakeAnimation 0.5s ease-in";
      event.target.style["animation-iteration-count"] = "infinite";
    }
  }
  function MouseOut(event) {
    event.target.style.animation = "none";
    if(animation == 'transform') {
      event.target.style.transform = "scaleX(1)"
    }
  }
  return (
    <div className="gallery-item" >
      <img className={`gallery-image ${size}`} src={imgURL} alt={title} 
        onMouseOver={MouseOver}
        onMouseOut={MouseOut}
      />
      <div>
        <div className='actionBtn'>
          <EditIcon fontSize='small' 
            onClick={() => {
              handleEdit(id);
            }}
            />
          <DeleteIcon fontSize='small'
            onClick={() => {
              handleDelete(id);
            }}
          />
        </div>
        <div class="imageContent">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </div>
      
    </div>
  );
};

const ImageGallery = ({ imageList, handleEdit, handleDelete }) => {
  return (
    <div className="imageContainer">
      {imageList.map((image) => (
        <GalleryItem key={image.id} {...image} handleEdit={handleEdit} handleDelete={handleDelete} />
      ))}
    </div>
  );
};

export default ImageGallery;
