import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { data,
    filterByName,
    setFilterByName,
    setFilteredPlanet,
    filterByNumericValues,
    setFilterByNumericValues,
    columnFilter,
    setColumnFilter,
    operatorFilter,
    setOperatorFilter,
    valueFilter,
    setValueFilter,
  } = useContext(MyContext);

  useEffect(() => {
    const filterPlanets = data
      .filter((planet) => planet.name.toLowerCase().includes(filterByName.name));
    setFilteredPlanet(filterPlanets);

    const arrayFiltered = filterByNumericValues
      .reduce((acc, filter) => acc.filter((planet) => {
        switch (filter.operatorFilter) {
        case 'maior que':
          return planet[filter.columnFilter] > Number(filter.valueFilter);
        case 'menor que':
          return planet[filter.columnFilter] < Number(filter.valueFilter);
        case 'igual a':
          return Number(planet[filter.columnFilter]) === Number(filter.valueFilter);
        default:
          return true;
        }
      }), filterPlanets);
    setFilteredPlanet(arrayFiltered);
  }, [filterByName, filterByNumericValues]);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
  };

  const handleClickFilter = () => {
    const newFilter = {
      columnFilter,
      operatorFilter,
      valueFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
  };

  return (
    <div>
      <div>
        <input
          placeholder="nome do planeta"
          data-testid="name-filter"
          type="text"
          onChange={ handleChange }
        />
      </div>
      <form>
        <label htmlFor="column">
          Coluna
          <select
            name="column"
            value={ columnFilter }
            data-testid="column-filter"
            onChange={ ({ target }) => setColumnFilter(target.value) }
          >
            <option selected value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select
            name="operator"
            value={ operatorFilter }
            data-testid="comparison-filter"
            onChange={ ({ target }) => setOperatorFilter(target.value) }
          >
            <option>maior que</option>
            <option>menor que</option>
            <option>igual a</option>
          </select>
        </label>
        <input
          name="valueField"
          placeholder="0"
          min="0"
          type="number"
          data-testid="value-filter"
          value={ valueFilter }
          onChange={ ({ target }) => setValueFilter(target.value) }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filtrar

        </button>
        {filterByNumericValues
          .map((filter, i) => (
            <p key={ i }>
              {filter.columnFilter}
              /
              {filter.operatorFilter}
              /
              {filter.valueFilter}
            </p>))}
        <label htmlFor="order">
          Ordenar
          <select name="order">
            <option selected value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="ascent">
          <input type="radio" name="ascent" />
          Ascendente
        </label>
        <label htmlFor="descent">
          Descendente
          <input type="radio" name="descent" />
        </label>
        <button type="button">Ordenar</button>
      </form>
    </div>
  );
}

export default Filters;
