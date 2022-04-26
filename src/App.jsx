import { useState } from 'react';
import './App.css';
import { InputTodo } from './components/InputTodo';
import { IncompleteTodos } from './components/IncompleteTodos';
import { CompleteTodos } from './components/CompleteTodos';

export const App = () => {
  const [todoText, setTodoText] = useState('');

  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === '') return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText('');
  }

  // タスクを削除する
  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    // newTodosから指定のindex番号を１つ削除する
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  // 未完了のタスクを完了タスクへ
  const onClickComplete = (index) => {
    const newIncompleteTodos = [...incompleteTodos];
    // newTodosから指定のindex番号を１つ削除する
    newIncompleteTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, incompleteTodos[index]];
    setIncompleteTodos(newIncompleteTodos);
    setCompleteTodos(newCompleteTodos);
  };

  // 完了のタスクを未完了のタスクへ
  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);

    const newIncompleteTodos = [...incompleteTodos, completeTodos[index]];
    setCompleteTodos(newCompleteTodos);
    setIncompleteTodos(newIncompleteTodos);
  };

  return (
    <>
    <InputTodo
    todoText={todoText}
    onChange={onChangeTodoText}
    onClick={onClickAdd}
    />
    <IncompleteTodos
    todos={incompleteTodos}
    onClickComplete={onClickComplete}
    onClickDelete={onClickDelete}
    />
    <CompleteTodos
     todos={completeTodos}
     onClickBack={onClickBack}
   />
    </>
  );
};