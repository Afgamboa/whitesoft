import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { getCountries, newUser } from "./js/home.js";

const Home = () => {
  const [username, setUsername] = useState("");
  const [userCountry, setUserCountry] = useState("");
  const [countries, setCountries] = useState(null);
  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const getCountriesAsync = async () => {
      try {
        const res = await getCountries();
        const countries = res;
        setCountries(countries);
      } catch (e) {
        console.log(e);
        setErrors(e.message);
        setTimeout(() => {
          setErrors("");
        }, 2500);
      }
    };
    getCountriesAsync();
  }, [countries]);

  const handleSubmit = async () => {
    try {
      const res = await newUser(username, userCountry);
      setSuccess(res.message);
    } catch (e) {
      setErrors(e.message);
    } finally {
      setTimeout(() => {
        setErrors("");
        setSuccess("");
        setUsername("");
        setUserCountry("");
      }, 2500);
    }
  };

  return (
    <div>
      <div className="container-main card">
        <div className="card-body sub-container col">
          <h1 className="mb-5">WHITESOFT</h1>
          <input
            type="text"
            className="form-control mb-3 username"
            placeholder="Escriba su nombre aqui.."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            value={username}
          />
          <select
            name="countries"
            aria-label=".form-select"
            onChange={(e) => setUserCountry(e.target.value)}
            className="form-select mb-3 countrie"
            id="countries"
            value={userCountry}
          >
            <option value="" defaultValue>
              Pais...
            </option>
            {countries &&
              countries.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
          </select>
          <button
            className="btn btn-outline-light"
            onClick={() => {
              handleSubmit();
            }}
          >
            enviar
          </button>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          width: 400,
          margin: "auto",
          textAlign: "center",
          fontWeight: 600,
        }}
      >
        {success && <div className="alert alert-success">{success}</div>}
        {errors && <div className="alert alert-danger">{errors}</div>}
      </div>
    </div>
  );
};

export default Home;
