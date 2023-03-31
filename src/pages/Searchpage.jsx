import React, { useState } from "react";
import MetaHeaderchanger from "../component/MetaHeaderchanger";
import { FaThList } from "react-icons/fa";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import Search from "../component/search";
import { useParams } from "react-router-dom";
import { useFatch } from "../CustomHooks/useFatch";

const SearchPage = () => {
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [active, setactive] = useState(false);

  const { id } = useParams();

  const { data, loading } = useFatch(
    `/hotels/api?${id}&min=${min || 1}&max=${max || 10000}`
  );
  return (
    <div>
      <MetaHeaderchanger title="Search" />
      <div className="store-wrapper home-wrapper-2 py-5">
        <div className="container-xxl">
          <div className="row">
            {data.length > 0 && (
              <h5 className="mb-0">{data.length} properties Found</h5>
            )}
            <div className="col-12 sort">
              <div className="price d-flex gap-3">
                <div className="d-flex align-items-center gap-1">
                  <h6 className="mb-0">min price:</h6>
                  <input
                    type="Number"
                    onChange={(e) => setMin(e.target.value)}
                    className="p-1"
                  />
                </div>
                <div className="d-flex align-items-center gap-1">
                  <h6 className="mb-0">max price:</h6>
                  <input
                    type="Number"
                    onChange={(e) => setMax(e.target.value)}
                    className="p-1"
                  />
                </div>
              </div>
              <p className="mb-0">
                view:
                <BsFillGrid1X2Fill
                  onClick={() => setactive(true)}
                  style={{ cursor: "pointer" }}
                  className="sortitem"
                />{" "}
                <FaThList
                  onClick={() => setactive(false)}
                  style={{ cursor: "pointer" }}
                  className="sortitem"
                />
              </p>
            </div>
            <div className="col-12 d-flex flex-wrap mt-4">
              {loading ? (
                "please wait!"
              ) : data.length > 0 ? (
                data?.map((i, j) => {
                  return <Search grid={active} data={i} key={j} />;
                })
              ) : (
                <h4>No Results</h4>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
