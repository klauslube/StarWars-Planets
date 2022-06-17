import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import planetImages from '../images/planetImages';
import '../styles/table.module.css';

function Table() {
  const { filteredPlanet } = useContext(MyContext);
  const unknownPlanets = [
    'Aleen Minor',
    'unknown', 'Troiken', 'Tholoth', 'Quermia', 'Stewjon', 'Tund', 'Glee Anselm',
  ];
  const filtered = filteredPlanet
    .filter((planet) => !planet === unknownPlanets.includes(planet.name));

  return (
    <div className="wrapper">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
          </tr>
        </thead>
        <tbody>
          {
            filtered
              .map((planet) => (
                <tr key={ planet.name }>
                  <td>
                    <img
                      className="planetImages"
                      src={ planetImages.find((img) => img.planet === planet.name).image }
                      alt={ planet.name }
                    />
                  </td>
                  <td data-testid="planet-name">{planet.name}</td>
                  <td>{planet.rotation_period}</td>
                  <td>{planet.orbital_period}</td>
                  <td>{planet.diameter}</td>
                  <td>{planet.climate}</td>
                  <td>{planet.gravity}</td>
                  <td>{planet.terrain}</td>
                  <td>{planet.surface_water}</td>
                  <td>{planet.population}</td>
                </tr>
              ))
          }

        </tbody>
      </table>

    </div>
  );
}

export default Table;
