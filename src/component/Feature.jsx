import React from "react";
import { useNavigate } from "react-router-dom";

const Feature = ({ data, img }) => {
  const link = useNavigate();
  const search = (place) => {
    link(`/search/city=${place}`);
  };
  return (
    <div
      className="col-4 mb-2 featurecontainer"
      onClick={() => search(data[0])}
    >
      <img className="d-block w-100" src={img} alt="image" />
      <div className="info">
        <h2 className="textblur mb-0 fs-1">{data[0]}</h2>
        <p className="textblur mb-0 fs-2">{data[1]} properties</p>
      </div>
    </div>
  );
};

export default Feature;
