import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import { ChevronDownIcon } from '@heroicons/react/outline';

function HoldingsTable({ holdings }) {
  return (
    <div className="table-container">
      <table className="styled-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Ticker</th>
            <th>Asset Class</th>
            <th>Average Price</th>
            <th>Market Price</th>
            <th>Latest Change (%)</th>
            <th>Market Value (Base CCY)</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((holding, index) => (
            <tr key={index}>
              <td>{holding.name}</td>
              <td>{holding.ticker}</td>
              <td>{holding.asset_class}</td>
              <td>{holding.avg_price}</td>
              <td>{holding.market_price}</td>
              <td>{holding.latest_chg_pct}</td>
              <td>{holding.market_value_ccy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [holdings, setHoldings] = useState([]);
  const [selectedAssetClass, setSelectedAssetClass] = useState({});
  const [theme, setTheme] = useState('light'); // Default theme is light

  useEffect(() => {
    async function fetchHoldings() {
      try {
        const response = await axios.get('https://canopy-frontend-task.now.sh/api/holdings');
        setHoldings(response.data.payload);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchHoldings();
  }, []);

  const assetClasses = Array.from(new Set(holdings.map(holding => holding.asset_class)));

  const handleAssetClassChange = (assetClass) => {
    setSelectedAssetClass({
      ...selectedAssetClass,
      [assetClass]: !selectedAssetClass[assetClass]
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`container ${theme}`}>
      <h1 className="center">Holdings Table</h1>
      <button className="theme-toggle" onClick={toggleTheme}>
        Toggle Theme
      </button>
      {assetClasses.map((assetClass, index) => (
        <div key={index}>
          <div onClick={() => handleAssetClassChange(assetClass)} className="asset-dropdown">
            <span className="asset-class">{assetClass}</span>
            {selectedAssetClass[assetClass] ? '▼' : '▶'}
          </div>
          {selectedAssetClass[assetClass] && <HoldingsTable holdings={holdings.filter(holding => holding.asset_class === assetClass)} />}
        </div>
      ))}
    </div>
  );
}

export default App;
