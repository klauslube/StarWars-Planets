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
    selectColumn,
    setSelectColumn,
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

  const handleRemoveOption = () => {
    const result = selectColumn
      .filter((typeOption) => typeOption !== columnFilter);
    setSelectColumn(result);
    setColumnFilter(result[0]);
  };

  const handleClickFilter = (event) => {
    event.preventDefault();
    const newFilter = {
      columnFilter,
      operatorFilter,
      valueFilter,
    };
    setFilterByNumericValues([...filterByNumericValues, newFilter]);
    handleRemoveOption();
  };

  const handleRemoveFilter = (column) => {
    setFilterByNumericValues((prev) => prev.filter((obj) => obj.columnFilter !== column));
    setSelectColumn([...selectColumn, column]);
  };

  const removeAllFilters = () => {
    setFilterByNumericValues([]);
    setSelectColumn([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
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
            {selectColumn.map((option) => (
              <option key={ option } value={ option }>{option}</option>
            ))}
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
          type="submit"
          data-testid="button-filter"
          onClick={ handleClickFilter }
        >
          Filtrar

        </button>
        {filterByNumericValues
          .map((filter, i) => (
            <div key={ i }>
              <div data-testid="filter">
                {filter.columnFilter}
                /
                {filter.operatorFilter}
                /
                {filter.valueFilter}
                <button
                  type="button"
                  onClick={ () => handleRemoveFilter(filter.columnFilter) }
                >
                  remove
                </button>
              </div>
            </div>))}
        {filterByNumericValues.length >= 1
          ? (
            <button
              type="button"
              data-testid="button-remove-filters"
              onClick={ removeAllFilters }
            >
              Remove All

            </button>)
          : null }

        <label htmlFor="order">
          Ordenar
          <select name="order">
            <option value="population">population</option>
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
