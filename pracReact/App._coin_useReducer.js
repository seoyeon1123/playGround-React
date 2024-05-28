import React, { useReducer, useEffect } from 'react';
import './App.css';

// 초기 상태값 정의
const initialState = {
  loading: true,
  coins: [],
  selectedCoin: null,
  myCoins: '',
  buyCoinAmount: 0,
};

// 리듀서 함수 정의
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_COINS':
      return { ...state, coins: action.payload, loading: false };
    case 'SELECT_COIN':
      return { ...state, selectedCoin: action.payload };
    case 'SET_MY_COINS':
      return { ...state, myCoins: action.payload };
    case 'SET_BUY_COIN_AMOUNT':
      return { ...state, buyCoinAmount: action.payload };
    default:
      return state;
  }
};

const App = () => {
  // useReducer 훅을 사용하여 상태와 디스패치 함수를 받아옵니다.
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('https://api.coinpaprika.com/v1/tickers')
      .then((response) => response.json())
      .then((json) => {
        // 액션을 디스패치하여 상태를 업데이트합니다.
        dispatch({ type: 'SET_COINS', payload: json });
      });
  }, []);

  const handleChangeSelectedCoin = (e) => {
    // 액션을 디스패치하여 선택한 코인을 업데이트합니다.
    dispatch({ type: 'SELECT_COIN', payload: e.target.value });
  };

  const handleInputChange = (e) => {
    // 액션을 디스패치하여 입력된 금액을 업데이트합니다.
    dispatch({ type: 'SET_MY_COINS', payload: e.target.value });
  };

  const buyCoins = () => {
    if (!state.selectedCoin || !state.myCoins) return;

    const selectedCoinPrice = state.coins.find(
      (coin) => coin.id === state.selectedCoin
    )?.quotes.USD.price;
    if (!selectedCoinPrice) return;

    const amount = parseFloat(state.myCoins) / selectedCoinPrice;
    // 액션을 디스패치하여 구매 가능한 코인의 양을 업데이트합니다.
    dispatch({ type: 'SET_BUY_COIN_AMOUNT', payload: amount.toFixed(2) });
  };

  return (
    <>
      <div>
        <h1>This Coins! 💸 {state.loading ? '' : state.coins.length}</h1>
        {state.loading ? (
          <span>loading...</span>
        ) : (
          <select onChange={handleChangeSelectedCoin}>
            <option value="">Select a coin</option>
            {state.coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name}({coin.symbol}) : {coin.quotes.USD.price} USD
              </option>
            ))}
          </select>
        )}
        <div>
          My Coins :
          <input
            type="number"
            value={state.myCoins}
            onChange={handleInputChange}
          />
          <button onClick={buyCoins}>Calculate</button>
          <div>구매 가능한 코인 수량: {state.buyCoinAmount}</div>
        </div>
      </div>
    </>
  );
};

export default App;
