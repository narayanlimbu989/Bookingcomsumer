import { useEffect, useState } from "react";
import { api } from "../Service/Httpservice";

export const useFatch = (url) => {
  const [data, setdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  useEffect(() => {
    const fatchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url);
        setdata(response.data);
      } catch (error) {
        setErr(err);
      }
      setLoading(false);
    };
    fatchData();
  }, [url]);

  const refatchData = async () => {
    setLoading(true);
    try {
      const response = await api.get(url);
      setdata(response.data);
    } catch (error) {
      setErr(err);
    }
    setLoading(false);
  };
  return { data, loading, err, refatchData };
};
