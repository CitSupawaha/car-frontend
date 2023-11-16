import { useEffect, useState } from "react";
import Prodect from "../components/Prodect";
import axios from "axios";
const Home = () => {
  const [car, setCars] = useState([]);
  const token = localStorage.getItem("accessToken");
  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/car?limit=10&page=1",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log("res ==> ", res.data.item);
        setCars(res.data.item);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log('res ==> data',car);
  return (
    <>
      <div className="pt-14"><Prodect products={car} /></div>
    </>
  );
};
export default Home;
