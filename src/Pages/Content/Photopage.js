import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Photopage.css";
import Header from "../Header";

function getImageHTML(images) {
  console.log(images);
  let imagesReturn = [];

  for (let i = 0; i < images.length; i++) {
    let adress = "http://localhost:8081/" + images[i];
    let image = <img className="image" src={adress} key={i} />;
    imagesReturn.push(image);
  }
  return imagesReturn;
}

function Photopage(props) {
  console.log(props.name);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("http://localhost:8081/images")
      .then(function (response) {
        // handle success
        setImages(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, []);

  return (
    <div className="photopage">
      <Header />
      {getImageHTML(images)}
    </div>
  );
}

export default Photopage;
