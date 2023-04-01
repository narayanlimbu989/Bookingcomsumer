import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { MdLocationOn } from "react-icons/md";
import moment from "moment/moment";
import { toast } from "react-toastify";
import { api } from "../Service/Httpservice";

const Reserve = () => {
  const [reserve, setReserve] = useState([]);
  const [load, setload] = useState(false);
  const { user } = useSelector((s) => s.auth);

  const mediaQuery = window.matchMedia("(max-width: 480px)");

  const calldata = async () => {
    const { data } = await api.get(`/reserve/api/${user?.id}`);
    setReserve(data);
  };
  useMemo(() => {
    setload(true);
    try {
      calldata();
    } catch (error) {
    } finally {
      setload(false);
    }
  }, []);
  const cancelReservation = async (id) => {
    try {
      const response = await api.delete(`/reserve/api/cancel/${id}`);
      if (response.data.cancel) {
        calldata();
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {}
  };
  return (
    <>
      {load ? (
        <p>loading please wait!</p>
      ) : (
        <div className="container-xxl py-5">
          {reserve?.length > 0 ? (
            reserve?.map((i, j) => {
              return (
                <div
                  key={j}
                  className="reservation d-flex align-items-top justify-content-between"
                >
                  <div className="d-flex flex-column gap-1">
                    <h4 className="mb-0">
                      Reservation for {i.reserveDate.length} days
                    </h4>
                    <h3 className="mb-0">At {i.reserveHotel?.name}</h3>
                    <small>
                      <MdLocationOn />{" "}
                      {i.reserveHotel?.address + "," + i.reserveHotel?.city}
                    </small>
                    <p className="mb-0">
                      Adults: {i.adult} & Children: {i.child}
                    </p>
                    <h5 className="mb-0">Reserve rooms:</h5>
                    {i.reserveRooms?.map((i, j) => {
                      return (
                        <p key={j} className="mb-0">
                          {i.title} , Room number: {i.roomNumber}
                        </p>
                      );
                    })}
                  </div>
                  <div className="mobilenone">
                    <h4>Reserve Date</h4>
                    <div>
                      {i.reserveDate.map((i, j) => {
                        return (
                          <p className="mb-0" key={j}>
                            {moment(i).format("MMMM Do YYYY")}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <button
                    className="cancel bg-success text-white"
                    disabled={load}
                    onClick={() => cancelReservation(i._id)}
                  >
                    {mediaQuery.matches ? "x" : "cancel Reservation"}
                  </button>
                </div>
              );
            })
          ) : (
            <h1 className="mb-0 maxcontainer">No Reservation</h1>
          )}
        </div>
      )}
    </>
  );
};

export default Reserve;
