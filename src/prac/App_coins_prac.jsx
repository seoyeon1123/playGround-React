import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [myMoney, setMyMoney] = useState('');
  const [buyCoinAmount, setBuyCoinAmount] = useState(0);

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const onChangeSeletedCoin = (e) => {
    selectedCoin(e.target.value);
  };

  const InputMyMoney = (e) => {
    setMyMoney(e.target.value);
  };

  const buyCoins = () => {
    if (!selectedCoin || !myMoney) {
      return;
    }
    const selectedCoinPrice = coins.find((coin) => coin.id === selectedCoin)
      ?.quotes.USD.price;
    if (!selectedCoinPrice) {
      return;
    }

    const amount = parseFloat(myMoney) / selectedCoinPrice;
    setBuyCoinAmount(amount.toFixed(2));
  };

  return (
    <>
      <div>
        <h1>This Coins ! </h1>
        {loading ? (
          <span>Loading...</span>
        ) : (
          <select onChange={onChangeSeletedCoin}>
            <option>select a coin</option>
            {coins.map((coin) => (
              <option>
                {coin.name}({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
      </div>
      <div>
        My Coins :
        <input type="number" value={myMoney} onChange={InputMyMoney} />
        <button onClick={buyCoins}>Calculate</button>
      </div>
    </>
  );
};

export default App;
