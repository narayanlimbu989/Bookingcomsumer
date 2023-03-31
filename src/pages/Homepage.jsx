import React from "react";
import Feature from "../component/Feature";
import Homes from "../component/HomesType";
import Property from "../component/PropertyType";
import { useFatch } from "../CustomHooks/useFatch";
import type1 from "./public/hotel-gb5d847242_1920.jpg";
import type2 from "./public/dining-room-gf6fcca05a_1280.jpg";
import type3 from "./public/house-gb7dd2af72_1920.jpg";
import type4 from "./public/large-home-g1d53bf621_1280.jpg";
import city1 from "./public/window-view-1505463__340.jpg";
import city2 from "./public/welcome_hotel_marburg_lobby_2k.2560x1600.jpg";
import city3 from "./public/hotel-room-with-two-beds-and-orange-chair.jpg";

const cityimages = [city2, city1, city3];

const typeimages = [type3, type1, type2, type4];
const Homepage = () => {
  const {
    data: featureddata,
    loading: featuredlod,
    err: featuredErr,
  } = useFatch("/hotels/api?featured=true&limit=4");
  const { data: fedata, loading: felod } = useFatch(
    "/hotels/api/countbycities"
  );
  const { data: typedata, loading: typelod } = useFatch(
    "/hotels/api/countbytype"
  );
  return (
    <div className="container-xxl py-1">
      <div className="row py-5">
        {felod ? (
          <p>please wait</p>
        ) : (
          fedata?.map((i, j) => {
            return <Feature data={i} key={j} img={cityimages[j]} />;
          })
        )}
      </div>
      <div className="row mb-5">
        <h4>Properties like by others</h4>
        {typelod ? (
          <p>please wait</p>
        ) : (
          typedata?.map((i, j) => {
            return <Property data={i} key={j} img={typeimages[j]} />;
          })
        )}
      </div>
      <div className="row py-5">
        <h4>Home Guests love</h4>
        {featuredlod ? (
          <p>please wait</p>
        ) : (
          featureddata?.map((i, j) => {
            return <Homes data={i} key={j} img={typeimages[j]} />;
          })
        )}
      </div>
    </div>
  );
};

export default Homepage;
