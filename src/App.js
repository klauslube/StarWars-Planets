import React from 'react';
import './App.css';
import Table from './components/Table';
// import Header from './components/Header';
import Provider from './context/Provider';

function App() {
  return (
    <div>
      <Provider>
        {/* <Header /> */}
        <Table />
      </Provider>
    </div>
  );
}

export default App;
