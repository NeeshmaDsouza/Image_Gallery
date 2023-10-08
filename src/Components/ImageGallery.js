import { useEffect, useMemo, useState } from "react";
const SMALL_SCREEN_COLUMNS = 2;
const AVERAGE_SCREEN_COLUMNS = 3;
const LARGE_SCREEN_COLUMNS = 5;

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
  const [screenWidth, setScreenwidth] = useState(window.innerWidth);

  const resolveScreenWidth = (screenWidth, imageList) => {
    const columnList = [];
    let columnCount = SMALL_SCREEN_COLUMNS;
    if (screenWidth < 560) {
      columnCount = SMALL_SCREEN_COLUMNS;
    } else if (screenWidth < 1400) {
      columnCount = AVERAGE_SCREEN_COLUMNS;
    } else {
      columnCount = LARGE_SCREEN_COLUMNS;
    }
    imageList.forEach((image, index) => {
      for (let columnNumber = 0; columnNumber < columnCount; ++columnNumber) {
        if (index % columnCount === columnNumber) {
          if (columnList.length === columnNumber) {
            columnList.push([image]);
          } else {
            columnList[columnNumber].push(image);
          }
        }
      }
    });

    return columnList;
  };

  const columnGroups = useMemo(
    () => resolveScreenWidth(screenWidth, imageList),
    [screenWidth, imageList]
  );

  const updateColumnConfig = (event) => {
    setScreenwidth(window.innerWidth);
  };

  useEffect(() => {
    window
      .matchMedia("(max-width: 560px)")
      .addEventListener("change", updateColumnConfig);
    return () => {
      window
        .matchMedia("(max-width: 560px)")
        .removeEventListener("change", updateColumnConfig);
    };
  }, []);
  return (
    <div className="disp-flex imageContainer">
      {columnGroups.map((column) => (
        <div className="column">
          {column.map((image) => (
            <GalleryItem key={image.id} {...image} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
