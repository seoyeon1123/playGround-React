import React, { useEffect, useState } from 'react';
import './App.css';
const App = () => {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null); // 선택한 코인의 ID를 상태로 관리합니다.
  const [myCoins, setMyCoins] = useState('');
  const [buyCoinAmount, setBuyCoinAmount] = useState(0); // 구매할 코인의 양을 상태로 관리합니다.

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  const handleChangeSelectedCoin = (e) => {
    setSelectedCoin(e.target.value); // 선택한 코인의 ID를 업데이트합니다.
  };

  const handleInputChange = (e) => {
    setMyCoins(e.target.value); // 입력된 USD 금액을 상태로 업데이트합니다.
  };

  const buyCoins = () => {
    if (!selectedCoin || !myCoins) return; // 코인과 금액이 선택되지 않았으면 함수를 종료합니다.

    const selectedCoinPrice = coins.find((coin) => coin.id === selectedCoin)
      ?.quotes.USD.price;
    if (!selectedCoinPrice) return; // 선택한 코인의 가격을 찾을 수 없으면 함수를 종료합니다.

    const amount = parseFloat(myCoins) / selectedCoinPrice; // 구매할 코인의 양을 계산합니다.
    setBuyCoinAmount(amount.toFixed(2)); // 소수점 두 자리까지만 표시합니다.
  };

  return (
    <>
      <div>
        <h1>This Coins! 💸 {loading ? '' : coins.length}</h1>
        {loading ? (
          <span>loading...</span>
        ) : (
          <select onChange={handleChangeSelectedCoin}>
            <option value="">Select a coin</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
        <div>
          My Coins :
          <input type="number" value={myCoins} onChange={handleInputChange} />
          <button onClick={buyCoins}>Calculate</button>
          <div>구매 가능한 코인 수량: {buyCoinAmount}</div>
        </div>
      </div>
    </>
  );
};

export default App;
