import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function Provider({ children }) {
  const [data, setData] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filteredPlanet, setFilteredPlanet] = useState(data);
  const [
    filterByNumericValues,
    setFilterByNumericValues] = useState([]);
  const [columnFilter, setColumnFilter] = useState('population');
  const [operatorFilter, setOperatorFilter] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const results = await response.json();
      setData(results.results);
      setFilteredPlanet(results.results);
    };
    fetchData();
  }, []);

  const contextValue = {
    data,
    setData,
    filterByName,
    setFilterByName,
    filteredPlanet,
    setFilteredPlanet,
    filterByNumericValues,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    operatorFilter,
    setOperatorFilter,
    valueFilter,
    setValueFilter,
  };

  return (
    <MyContext.Provider value={ contextValue }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
