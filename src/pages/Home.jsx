import { useEffect, useState } from "react";
import Prodect from "../components/Prodect";
import axios from "axios";
const Home = () => {
  const [car, setCars] = useState([]);

  useEffect(() => {
    getData();
  },[]);

  const getData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/car?limit=10&page=1",
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlkIjoiNCIsImlhdCI6MTY5OTk3Nzk4NSwiZXhwIjoxNzAwNTgyNzg1fQ.F1GXtAIe-eeo4DaAeRoHdcRWZM4BNTGiZWSwoD6Wm3s`,
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
      <div className="p-20"><Prodect products={car} /></div>
    </>
  );
};
export default Home;
