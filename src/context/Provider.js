import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

const M = -1;

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
  const [selectColumn, setSelectColumn] = useState([
    'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [order, setOrder] = useState({ column: 'population', sort: 'ASC' });

  useEffect(() => {
    const fetchData = async () => {
      // const url01 = 'https://swapi-trybe.herokuapp.com/api/planets/';
      // const url02 = 'https://swapi-trybe.herokuapp.com/api/planets/?page=2';
      // const url03 = 'https://swapi-trybe.herokuapp.com/api/planets/?page=3';
      // const url04 = 'https://swapi-trybe.herokuapp.com/api/planets/?page=4';
      // const url05 = 'https://swapi-trybe.herokuapp.com/api/planets/?page=5';

      // const results = await Promise.all([fetch(url01, url02, url03, url04, url05)]);
      // const dataPromises = results.map((result) => result.json());
      // const [page01, page02, page03, page04, page05] = await Promise.all(dataPromises);

      // const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      // const results = await response.json();

      // const allPages = [
      //   ...page01.results,
      //   ...page02.results,
      //   ...page03.results,
      //   ...page04.results,
      //   ...page05.results,
      // ];

      const [api01, api02, api03, api04, api05] = await Promise.all([
        fetch('https://swapi-trybe.herokuapp.com/api/planets/'),
        fetch('https://swapi-trybe.herokuapp.com/api/planets/?page=2'),
        fetch('https://swapi-trybe.herokuapp.com/api/planets/?page=3'),
        fetch('https://swapi-trybe.herokuapp.com/api/planets/?page=4'),
        fetch('https://swapi-trybe.herokuapp.com/api/planets/?page=5'),
      ]);

      const [planet01, planet02, planet03, planet04, planet05] = await Promise
        .all([api01.json(), api02.json(), api03.json(), api04.json(), api05.json()]);

      const allPlanets = [
        ...planet01.results,
        ...planet02.results,
        ...planet03.results,
        ...planet04.results,
        ...planet05.results,
      ];

      setData(allPlanets);
      allPlanets.sort((a, b) => (a.name > b.name ? 1 : M));
      setFilteredPlanet([...allPlanets]);
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
    selectColumn,
    setSelectColumn,
    order,
    setOrder,
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
