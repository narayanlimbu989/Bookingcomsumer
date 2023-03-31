import React, { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useFatch } from "../CustomHooks/useFatch";
import { api } from "../Service/Httpservice";

const Reserve = ({ setOpen, hotelid, date, person }) => {
  const [load, setload] = useState(false);
  const { user, islogin } = useSelector((s) => s.auth);
  const { startDate, endDate } = date[0];
  const [selectedroom, setSelectedroom] = useState([]);
  const { data, loading } = useFatch(`/hotels/api/hotelsroom/${hotelid}`);

  const link = useNavigate();
  const getDates = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const datelist = new Date(start.getTime());
    let list = [];

    while (datelist <= end) {
      list.push(new Date(datelist));
      datelist.setDate(datelist.getDate() + 1);
    }
    return list;
  };
  const allDates = getDates(startDate, endDate);

  const handlechange = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectedroom(
      selected
        ? [...selectedroom, value]
        : selectedroom.filter((i) => i !== value)
    );
  };

  const handlereserve = async () => {
    if (islogin && user !== null) {
      setload(true);
      try {
        const { data } = await api.post(`/reserve/api/reserveroom/${hotelid}`, {
          userId: user.id,
          allDates,
          person,
          selectedroom,
        });
        if (data.reserve) {
          toast.success(data.message);
          setOpen(false);
        }
      } catch (error) {
      } finally {
        setload(false);
      }
    } else {
      link("/signin");
    }
  };
  return (
    <div className="reserve">
      <div className="innerreserve">
        <AiFillCloseCircle
          className="closebth fs-3"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(false)}
        />
        <h5>select your rooms:</h5>
        {loading ? (
          <p>please wait!</p>
        ) : (
          <div
            className={`${
              data?.length > 4 ? "roomscontainer" : ""
            } d-flex flex-column gap-3`}
          >
            {data?.length > 0 ? (
              data?.map((i, j) => {
                return (
                  <div
                    className="d-flex align-items-center justify-content-between"
                    key={j}
                  >
                    <div>
                      <h3 className="mb-0">{i.title}</h3>
                      <p className="mb-0">{i.features}</p>
                      <h6 className="mb-0">Max people: {i.maxpeople}</h6>
                      <h6 className="mb-0 text-success">
                        Per Night: {i.price}
                      </h6>
                    </div>
                    <div>
                      {!i.available && (
                        <h6 className="mb-0 text-danger">Booked</h6>
                      )}
                      <div className="d-flex gap-2">
                        <label
                          htmlFor="roomid"
                          className={!i.available ? "text-danger" : ""}
                        >
                          {i.roomNumber}
                        </label>
                        <input
                          type="checkbox"
                          disabled={!i.available}
                          style={{ cursor: "pointer" }}
                          id="roomid"
                          value={i._id}
                          onChange={handlechange}
                        />
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="maxcontainer">
                <h1>No Rooms available</h1>
              </div>
            )}
          </div>
        )}
        {data?.length > 0 && selectedroom.length > 0 && (
          <button onClick={handlereserve}>
            {load ? "loading..." : "Reserve Now!"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Reserve;
