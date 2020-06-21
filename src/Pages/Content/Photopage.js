import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photopage.css";
import Header from "../Header";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

function Photopage(props) {
  
  const [images, setImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("http://localhost:8081/images")
      .then(function (response) {
        // handle success
        let imagesReturn = [];
        console.log(props.name);
        console.log(response.data)

        for (let i = 0; i < response.data.length; i++) {
          if(response.data[i].startsWith(props.name)) {
            let adress = "http://localhost:8081/" + response.data[i];
            imagesReturn.push(adress);
          }
        }
        setImages(imagesReturn);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  function getImageHTML() {
    let imagesReturn = [];
  
    for (let i = 0; i < images.length; i++) {
      let image = <img className="image" src={images[i]} key={i} onClick={() => {
        setPhotoIndex(i);
        setIsOpen(true);
      }} />;
      imagesReturn.push(image);
    }
    return imagesReturn;
  }

  return (
    <div className="photopage">
      <Header />
      {getImageHTML()}
      {isOpen && (
        <Lightbox
          mainSrc={images[photoIndex]}
          nextSrc={images[(photoIndex + 1) % images.length]}
          prevSrc={images[(photoIndex + images.length - 1) % images.length]}
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex((photoIndex + images.length - 1) % images.length)
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % images.length)
          }
        />
      )}
    </div>
  );
}

export default Photopage;
