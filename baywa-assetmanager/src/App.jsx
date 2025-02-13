import "./App.css";
import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar.comp.jsx";

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    onAPIFetch();
    console.log(data);
  }, []);

  const onAPIFetch = async () => {
    try {
      setLoading(true);
      const request = await fetch("http://localhost:3000/assets");
      if (!request.ok) {
        throw new Error("request failed");
      }
      const result = await request.json();
      setData(result);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log(error, error.message);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3000);
    }
  };

  return (
    <>
      <NavBar />
    </>
  );
}

export default App;
