import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photopage.css";
import Header from "../Header";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useLocation, Link } from "react-router-dom";

function Photopage(props) {
  const [images, setImages] = useState([]);
  const [links, setLinks] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  let location = useLocation().pathname;
  if(location.endsWith("/")) {
    location = location.substring(0, location.length - 1);
  }

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("https://gocke-photo.de:8081/images")
      .then(function (response) {
        // handle success
        let imagesReturn = [];
        for (let i = 0; i < response.data.length; i++) {
          if (
            response.data[i].startsWith(location) &&
            response.data[i].lastIndexOf("/") == location.length
          ) {
            let adress = "https://gocke-photo.de:8081/" + response.data[i];
            imagesReturn.push(adress);
          }
        }
        setImages(imagesReturn);

        // handle success
        let linksReturn = [];

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].startsWith(location)) {
            let link = response.data[i];
            link = link.substring(location.length + 1);
            let slash = link.indexOf("/");
            if (slash > -1) {
              link = link.substring(0, slash);
              if (!linksReturn.includes(link)) {
                linksReturn.push(link);
              }
            }
          }
        }
        setLinks(linksReturn);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [location]);

  function getImageHTML() {
    let imagesReturn = [];

    for (let i = 0; i < images.length; i++) {
      let image = (
        <img
          className="image"
          src={images[i]}
          key={i}
          onClick={() => {
            setPhotoIndex(i);
            setIsOpen(true);
          }}
        />
      );
      imagesReturn.push(image);
    }
    return imagesReturn;
  }

  function getLinkHTML() {
    let linksReturn = [];

    for (let i = 0; i < links.length; i++) {
      let link = (
        <div className="linkColumn">
          <Link to={location + "/" + links[i]}>
            <img
              className="linkPanel"
              alt={links[i]}
              src={"https://gocke-photo.de:8081/" + links[i] + ".jpg"}
            ></img>
          </Link>
        </div>
      );
      linksReturn.push(link);
    }
    return linksReturn;
  }

  return (
    <div className="photoPage">
      <Header />
      <div>{getImageHTML()}</div>
      <div className="linkContainer">{getLinkHTML()}</div>
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
