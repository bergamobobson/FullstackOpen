import { useEffect, useState } from "react";
import countryService from "./services/countries";

// Function to render the list of filtered countries
const MultipleShow = ({ all, filteredCountries, handleClick }) => {
  const listItems = filteredCountries.map((c, index) => (
    <li key={index}>
      {c.name.common} {c.flag}
      {!all && (
        <input type="button" value="show" onClick={() => handleClick(c)} />
      )}
    </li>
  ));

  return <ul>{listItems}</ul>;
};

// Function to render details of a single country
const SingleShow = ({ country }) => {
  const languages = Object.values(country.languages);

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
      <img src={country.flags.png} alt={country.flags.alt} style={flagStyle} />
    </>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");

  // Data loading
  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Filter data based on the filter state
  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.trim().toLowerCase())
  );

  // Handle country click
  const handleClick = (country) => {
    setSelectedCountry(country);
    setFilter("");
  };

  // Handle filter change
  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setSelectedCountry("");
  };

  // Function to handle different cases for rendering filtered countries
  const renderFilteredCountries = () => {
    if (filter.length === 0) {
      return (
        <MultipleShow
          all={true}
          filteredCountries={filteredCountries}
          handleClick={handleClick}
        />
      );
    } else if (filteredCountries.length === 0) {
      return <p>No matches found</p>;
    } else if (filteredCountries.length === 1) {
      return (
        <SingleShow country={filteredCountries[0]} handleBack={handleBack} />
      );
    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else {
      return (
        <MultipleShow
          all={false}
          filteredCountries={filteredCountries}
          handleClick={handleClick}
        />
      );
    }
  };

  return (
    <>
      find countries <input value={filter} onChange={handleFilterChange} />
      {selectedCountry ? (
        <SingleShow country={selectedCountry} />
      ) : (
        renderFilteredCountries()
      )}
    </>
  );
};

export default App;
