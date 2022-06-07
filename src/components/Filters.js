import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function Filters() {
  const { data,
    filterByName,
    setFilterByName,
    filteredPlanet,
    setFilteredPlanet,
  } = useContext(MyContext);

  useEffect(() => {
    const filterPlanets = data
      .filter((planet) => planet.name.toLowerCase().includes(filterByName.name));
    setFilteredPlanet(filterPlanets);
    console.log(filterPlanets);
  }, [filterByName]);

  const handleChange = ({ target }) => {
    setFilterByName({ name: target.value });
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
          <select name="column">
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
          </select>
        </label>
        <label htmlFor="operator">
          Operador
          <select name="operator">
            <option>menor que</option>
            <option>maior que</option>
            <option>igual a</option>
          </select>
        </label>
        <input type="number" />
        <button type="button">Filtrar</button>
        <label htmlFor="order">
          Ordenar
          <select name="order">
            <option>population</option>
            <option>orbital_period</option>
            <option>diameter</option>
            <option>rotation_period</option>
            <option>surface_water</option>
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
