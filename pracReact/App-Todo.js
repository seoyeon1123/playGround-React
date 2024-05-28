import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [toDo, setToDo] = useState('');
  const [list, setList] = useState([]);

  const onChangeInput = (e) => {
    setToDo(e.target.value);
  };

  const onClickAdd = () => {
    if (toDo.trim() !== '') {
      // 입력된 값이 공백이 아닌지 확인합니다.
      setList([...list, toDo.trim()]); // list에 새로운 할 일을 추가합니다.
      setToDo(''); // 입력 필드를 초기화합니다.
    }
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    onClickAdd(); // 폼이 제출될 때 할 일을 추가합니다.
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div>
        <h1>ToDoList : {list.length}</h1>
        <input
          onChange={onChangeInput}
          value={toDo}
          type="text"
          placeholder="write your to do"
        />
      </div>
      <button type="submit">Add To Do</button>
      <hr />
      <ul>
        {list.map(
          (
            item,
            index // 각 항목을 렌더링합니다.
          ) => (
            <li key={index}>{item.toUpperCase()}</li>
          )
        )}
      </ul>
    </form>
  );
};

export default App;
