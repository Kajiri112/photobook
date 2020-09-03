import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photopage.css";
import Header from "../Header";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import { useLocation, Link } from "react-router-dom";
import EXIF from "exif-js";
import moment from "moment";

export function calculateImagesReturn(linkArray, location) {
  let imagesReturn = [];
  for (let i = 0; i < linkArray.length; i++) {
    if (
      linkArray[i].startsWith(location) &&
      linkArray[i].lastIndexOf("/") == location.length
    ) {
      let adress = "https://gocke-photo.de:8081/images" + linkArray[i];
      imagesReturn.push(adress);
    }
  }
  return imagesReturn;
}

export function calculateThumbnailsReturn(linkArray, location) {
  let imagesReturn = [];
  for (let i = 0; i < linkArray.length; i++) {
    if (
      linkArray[i].startsWith(location) &&
      linkArray[i].lastIndexOf("/") == location.length
    ) {
      let adress = "https://gocke-photo.de:8081/thumbnails" + linkArray[i];
      imagesReturn.push(adress);
    }
  }
  return imagesReturn;
}

function Photopage(props) {
  const [images, setImages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [links, setLinks] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [updateImageDetails, setUpdateImageDetails] = useState({});
  const [imageDetails, setImageDetails] = useState([]);

  let location = useLocation().pathname;
  if (location.endsWith("/")) {
    location = location.substring(0, location.length - 1);
  }

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("https://gocke-photo.de:8081/images")
      .then(function (response) {
        // handle success

        setImages(calculateImagesReturn(response.data, location));
        setThumbnails(calculateThumbnailsReturn(response.data, location));

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

  useEffect(() => {
    var detailsCopy = [...imageDetails];
    detailsCopy[updateImageDetails.index] = updateImageDetails.value;
    setImageDetails(detailsCopy);
  }, [updateImageDetails]);

  function getImageHTML() {
    let imagesReturn = [];

    for (let i = 0; i < thumbnails.length; i++) {
      let image = (
        <img
          className="image"
          src={thumbnails[i]}
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
              src={"https://gocke-photo.de:8081/images/" + links[i] + ".jpg"}
            ></img>
          </Link>
        </div>
      );
      linksReturn.push(link);
    }
    return linksReturn;
  }

  function getLocationName() {
    let lastSlash = location.lastIndexOf("/");
    let shortLocation = location.substring(lastSlash + 1);
    shortLocation =
      shortLocation.charAt(0).toUpperCase() + shortLocation.slice(1);
    return shortLocation;
  }

  function getExif(imgSrc, srcType, image) {
    let detailsIndex = null;
    if (srcType == "mainSrc") {
      detailsIndex = photoIndex;
    }
    if (srcType == "nextSrc") {
      detailsIndex = (photoIndex + 1) % images.length;
    }
    if (srcType == "prevSrc") {
      detailsIndex = (photoIndex + images.length - 1) % images.length;
    }

    EXIF.getData(image, function () {
      const data = EXIF.getAllTags(this);

      setUpdateImageDetails({
        index: detailsIndex,
        value: data,
      });
    });
  }

  function getCaptionHTML(data) {
    console.log(data)
    if (data && data.FNumber && data.ExposureTime) {
      var tstamp = moment(data.DateTimeOriginal, "YYYY:MM:DD HH:mm:ss").format("DD.MM.YYYY");
      return (
        <div>
          <div>{tstamp}</div>
          <div>{data.Model}</div>
          <div>f/{data.FNumber.numerator / data.FNumber.denominator}</div>
          <div>{data.ExposureTime.numerator}/{data.ExposureTime.denominator}</div>
          <div>{data.FocalLength.numerator /data.FocalLength.denominator} mm</div>
          <div>ISO {data.ISOSpeedRatings}</div>
        </div>
      );
    }
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
          imageTitle={getLocationName()}
          onImageLoad={(imgSrc, srcType, image) =>
            getExif(imgSrc, srcType, image)
          }
          imageCaption={getCaptionHTML(imageDetails[photoIndex])}
        />
      )}
    </div>
  );
}

export default Photopage;
