const GalleryItem = ({ imgURL, title, description, size, animation }) => {

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
    <div className="gallery-item" 
    >
      <img className={`gallery-image ${size}`} src={imgURL} alt={title} 
      onMouseOver={MouseOver}
      onMouseOut={MouseOut}
      />
      <div class="imageContent">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

const ImageGallery = ({ imageList }) => {
  return (
    <div className="imageContainer">
      {imageList.map((image) => (
        <GalleryItem key={image.id} {...image} />
      ))}
    </div>
  );
};

export default ImageGallery;
