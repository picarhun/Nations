import React, { createContext, useState, useEffect, useRef } from "react";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [filteredCountryRegion, setFilteredCountryRegion] = useState("All");
  const inputRef = useRef();
  const regionRef = useRef();
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);

  const baseURL = "https://restcountries.com/v2/all";

  const noCountries = countries.status || countries.message;

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = () => {
    axios.get(baseURL).then((response) => {
      setCountries(response.data);
    });
  };

  //Theme switcher
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  //Searching section
  const searchCountries = () => {
    const searchValue = inputRef.current.value;
    if (searchValue.trim()) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://restcountries.com/v2/name/${searchValue}`
        );
        const data = await response.json();
        setCountries(data);
      };
      try {
        fetchSearch();
      } catch (error) {
        console.log(error);
      }
    } else {
      fetchCountries();
    }
  };

  //Filter Section
  const filteredByRegion = () => {
    const selectValue = regionRef.current.value;
    if (selectValue.trim()) {
      const fetchSelect = async () => {
        setIsLoading(true);
        const response = await fetch(
          `https://restcountries.com/v2/region/${selectValue}`
        );
        const data = await response.json();
        setIsLoading(false);
        if (selectValue === "All") {
          try {
            fetchCountries();
          } catch (error) {
            console.log(error);
          }
          return;
        }

        setCountries(data);
      };

      try {
        fetchSelect();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Context.Provider
      value={{
        countries,
        setCountries,
        searchCountries,
        filtered,
        setFiltered,
        filteredCountryRegion,
        setFilteredCountryRegion,
        filteredByRegion,
        regionRef,
        inputRef,
        noCountries,
        toggleTheme,
        theme,
        setTheme,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </Context.Provider>
  );
};
