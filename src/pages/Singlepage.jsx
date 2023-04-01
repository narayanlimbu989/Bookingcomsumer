import React, { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { useParams } from "react-router-dom";
import Reserve from "../component/Reserve";
import { useFatch } from "../CustomHooks/useFatch";
import { CgCalendarDates } from "react-icons/cg";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { base_url } from "../Service/Httpservice";
import { IoIosWoman } from "react-icons/io";

const Singlepage = () => {
  const [openperson, setopenperson] = useState(false);
  const [opendate, setopendate] = useState(false);
  const [date, setdate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [person, setperson] = useState({
    adult: 1,
    children: 0,
  });
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const { data, loading } = useFatch(`/hotels/api/find/${id}`);

  const handledata = (name, opt) => {
    setperson((pre) => ({
      ...pre,
      [name]: opt === "i" ? person[name] + 1 : person[name] - 1,
    }));
  };
  return (
    <div className="container-xxl py-3">
      {loading ? (
        <p>Loading please wait</p>
      ) : (
        <div className="row">
          <div className="d-flex col-12 justify-content-between py-3">
            <div className="left">
              <h5 className="card-title fs-3 mb-0">{data?.name}</h5>
              <p className="distance mb-0">
                <MdLocationOn /> {data?.address}, {data?.city}
              </p>
              <p className="service2 mb-0">{data?.distance}</p>
              <p className="service1 mb-0">free airport texi</p>
              <p className="service3 mb-0">1 bathroom + King size bed</p>
              <p className="service5 mb-0 fs-5 text-success">
                free cancellation
              </p>
              <p className="service6 mb-0 text-success">
                you can cancel later,so look in this great price today!
              </p>
              <h6 className="mb-0 text-success">
                <small>Starting with: Rs</small> {data.cheapestprice}
              </h6>
            </div>
            <div className="right d-flex flex-column align-items-end justify-content-between">
              <button
                className="seemore px-3 text-white"
                onClick={() => setOpen(true)}
              >
                Reserve or Book Now!
              </button>
              <div className="p-2 rounded timedate mt-3">
                <h6 className="mb-0">select Date & Person & Rooms</h6>
                <div className="d-flex flex-column gap-5 p-3">
                  <div
                    className="headersearchitem"
                    onClick={() => setopendate(!opendate)}
                  >
                    <CgCalendarDates
                      className="headericon"
                      style={{ color: " #fe831e" }}
                    />
                    <span>{`${format(
                      date[0]?.startDate,
                      "MM/dd/yyyy"
                    )} to ${format(date[0]?.endDate, "MM/dd/yyyy")}`}</span>
                    {opendate && (
                      <DateRange
                        editableDateInputs={true}
                        onChange={(e) => setdate([e.selection])}
                        monthDisplayFormat={false}
                        ranges={date}
                        className="datepicker"
                      />
                    )}
                  </div>
                  <div
                    className="headersearchitem"
                    onClick={() => setopenperson(!openperson)}
                  >
                    <IoIosWoman
                      className="headericon"
                      style={{ color: " #fe831e" }}
                    />
                    <span>
                      {person.adult} adults {person.children} children
                    </span>
                    {openperson && (
                      <div className="options">
                        <div className="optionsitem">
                          <span>Adult</span>
                          <div>
                            <button
                              disabled={person.adult <= 1}
                              onClick={() => handledata("adult", "d")}
                            >
                              -
                            </button>
                            <span>{person.adult}</span>
                            <button onClick={() => handledata("adult", "i")}>
                              +
                            </button>
                          </div>
                        </div>
                        <div className="optionsitem">
                          <span>Children</span>
                          <div>
                            <button
                              disabled={person.children <= 0}
                              onClick={() => handledata("children", "d")}
                            >
                              -
                            </button>
                            <span>{person.children}</span>
                            <button onClick={() => handledata("children", "i")}>
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="row mb-3">
            {data.photos?.map((i, j) => {
              return (
                <img
                  key={j}
                  className="col-xl-4 col-md-6 p-2"
                  src={`${base_url}/${i}`}
                  alt="img"
                />
              );
            })}
          </div>
          <div className="d-flex">
            <div className="about">
              <h4>{data?.title}</h4>
              <p className="mb-0" style={{ textAlign: "justify" }}>
                {data?.description}
              </p>
            </div>
          </div>
        </div>
      )}
      {open && (
        <Reserve setOpen={setOpen} hotelid={id} date={date} person={person} />
      )}
    </div>
  );
};

export default Singlepage;
