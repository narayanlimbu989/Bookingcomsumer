import React from "react";
import { useNavigate } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
import { base_url } from "../Service/Httpservice";

const Search = ({ grid, data }) => {
  const link = useNavigate();

  return (
    <>
      {grid ? (
        <div
          className="col-3 mobileproperty p-4 mb-5"
          style={{ cursor: "pointer" }}
        >
          <div className="guestlike">
            <img
              className="d-block w-100"
              src={`${base_url}/${data.photos[0]}`}
              alt="image"
            />
          </div>
          <div
            className="info mt-2"
            onClick={() => link(`/single/${data._id}`)}
          >
            <h5 className="card-title mb-0">{data.name}</h5>
            <p className="mb-0">
              {data.address} , {data.city}
            </p>
            <h6 className="text-success mb-0">
              Starting price Rs {data.cheapestprice}
            </h6>
          </div>
        </div>
      ) : (
        <div
          className="mobilenone col-12 mb-2 d-flex"
          style={{ cursor: "pointer" }}
        >
          <div className="col-12 newtry">
            <div className="col-5 newtry1 product-card">
              <img src={`${base_url}/${data.photos[0]}`} alt="product" />
            </div>
            <div className="col-5 d-flex newtry2 card-body">
              <div>
                <h5 className="card-title fs-3 mb-0">{data.name}</h5>
                <p className="service2 mb-0">{data.distance}</p>
                <p className="distance mb-0">
                  <MdLocationOn />
                  {data.address} , {data.city}
                </p>
                <p className="service1 mb-0">free airport texi</p>
                <p className="service3 mb-0">1 bathroom + King size bed</p>{" "}
                <p className="service5 mb-0 fs-5 text-success">
                  free cancellation
                </p>
                <p className="service6 mb-0 text-success">
                  you can cancel later,so look in this great price today!
                </p>
              </div>
            </div>
            <div className="col-2 Excellent d-flex flex-column justify-content-between p-1">
              <div className="d-flex align-items-center justify-content-between">
                <h5 className="mb-0">Excellent</h5>
                <p className="mb-0 text-white bg-success rounded">9.5</p>
              </div>
              <div className="d-flex flex-column align-items-end">
                <h5 className="mb-0">
                  <small>Starting with: Rs</small> {data.cheapestprice}
                </h5>
                <p className="mb-0">Includes taxes and fees</p>
                <button
                  className="w-100 text-white seemore"
                  onClick={() => link(`/single/${data._id}`)}
                >
                  See Availability
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Search;
