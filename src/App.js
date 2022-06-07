import React from 'react';
import './App.css';
import Table from './components/Table';
import Filters from './components/Filters';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        <Filters />
        <Table />
      </Provider>
    </div>
  );
}

export default App;
