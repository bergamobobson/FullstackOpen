import { useEffect, useState } from "react";
import countryService from "./services/countries";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  //Data loading
  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  //FILTER DATA
  const filteredCountries = countries.filter((country) => {
    return country.name.common
      .toLowerCase()
      .includes(filter.trim().toLowerCase());
  });

  // Function to render the list of filtered countries
  const multipleShow = () => {
    return (
      <ul>
        {filteredCountries.map((c, index) => (
          <li key={index}>
            {c.name.common} {c.flag}
          </li>
        ))}
      </ul>
    );
  };

  const singleShow = () => {
    const country = filteredCountries[0];
    const languages = Object.values(country.languages);

    // Define the style for the flag
    const flagStyle = {
      width: "300px",
      height: "auto",
    };

    return (
      <>
        <h1>{country.name.common}</h1>
        <br />
        <p style={{ margin: 0 }}>capital {country.capital[0]}</p>
        <p style={{ marginTop: 1 }}>area {country.area}</p>
        <p>Languages</p>
        <ul>
          {languages.map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={flagStyle}
        />
      </>
    );
  };

  // Function to handle different cases for rendering filtered countries
  const renderFilteredCountries = () => {
    if (filter.length === 0) {
      return multipleShow();
    } else if (filteredCountries.length === 0) {
      return <p>No matches found</p>;
    } else if (filteredCountries.length === 1) {
      return singleShow();
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return multipleShow();
    }
  };

  return (
    <>
      <h1>Hello Countries</h1>
      find countries{" "}
      <input
        value={filter}
        onChange={(event) => setFilter(event.target.value)}
      />
      {renderFilteredCountries()}
    </>
  );
};

export default App;
