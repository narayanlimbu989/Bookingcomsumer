import React from "react";
import { useNavigate } from "react-router-dom";
import { base_url } from "../Service/Httpservice";

const Homes = ({ data }) => {
  const link = useNavigate();
  const single = (id) => {
    link(`/single/${id}`);
  };
  return (
    <div className="col-3 mobileproperty py-2" onClick={() => single(data._id)}>
      <div className="homelike">
        <img
          className="d-block w-100"
          src={`${base_url}/${data.photos[0]}`}
          alt="image"
        />
      </div>
      <div className="infos p-2">
        <h5 className="mb-0">{data?.name}</h5>
        <p className="mb-0">
          {data.address},{data.city}
        </p>
        <p className="mb-0 text-success mb-2">
          Starting from Rs {data.cheapestprice}
        </p>
        <div className="rating d-flex align-items-center justify-content-between">
          <h6 className="mb-0 text-white p-1 border rounded bg-success">9.5</h6>
          <span className="text-dark">Excellent</span>
        </div>
      </div>
    </div>
  );
};

export default Homes;
