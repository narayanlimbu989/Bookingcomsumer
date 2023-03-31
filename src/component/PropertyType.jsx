import React from "react";
import { useNavigate } from "react-router-dom";

const Property = ({ data, img }) => {
  const name = data[0].toLowerCase();

  const link = useNavigate();
  const search = (type) => {
    link(`/search/type=${type}`);
  };
  return (
    <div className="col-3 py-2" onClick={() => search(data[0])}>
      <div className="guestlike">
        <img className="d-block w-100 rounded" src={img} alt="image" />
      </div>
      <div className="infos p-2">
        <h5 className="mb-0">{data[0]}</h5>
        <p className="mb-0">
          {data[1]} {name}
        </p>
      </div>
    </div>
  );
};

export default Property;
