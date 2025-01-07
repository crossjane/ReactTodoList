import { useState } from 'react';
import './App.css';


function AppV2() {
  //객체로 정리해보기 . 

  //필요한 상태 check 
  //1.input field창 관리 
  //2.추가된 todo목록 관리
  //객체로 담을 것
  //1.input field에 들어온 값, 체크박스(isChecked), 수정중인지(isEdit), 임시수정저장값(tempInput)
  //
  
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);

  function inputTodoChange(e){
    setInputTodo(e.target.value);
  }


  function add (){
    const updatedInputTodo = [...todos, {value: inputTodo, isChecked: false , isEdit: false, tempInput:""}];
    setTodos(updatedInputTodo);
    setInputTodo("");

  }
  

  function edit(index){
    //여러개 중 수정하고자 하는 index를 가져와야함 
    //수정 클릭시  수정 -> 완료 // todo는 input활성화. 
    const editTodo = todos[index].value;


    const copyTodos = [...todos];
    copyTodos[index].isEdit = true;
    copyTodos[index].tempInput = editTodo;
    setTodos(copyTodos);

  }

  function tempInputChange(e){
    setInputTodo(e.target.value);
  }



  return (
    <div className="App">
        <div className="todo-container">
      <div className="todo-header" style={{color:"#2F4157"}}>🧶오늘의 할일🧶</div>

      <div style={{marginBottom: "10px", display: 'flex', flexDirection: 'row'}}>
        
          <input
            type="text"
            className="todo-input"
            id="todoInput"
            placeholder="할 일을 입력하세요"   
            value={inputTodo}
            onChange={inputTodoChange}
           
          />
        </div>
          <button className="add-btn" style={{marginBottom: 10}} onClick={add}>추가하기</button>
          <button className="select-delete-btn">선택 삭제</button>


     
      <ul className="todo-list" id="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type='checkbox'
              value={todos.tempInput}
              onChange={tempInputChange}
            />
          

            {todos.isEdit?      
              <input
              type="text"
              
              />

              :
              <span>{todo.value}</span>
            }

           {todos.isEdit?      
            
            <button className="update-btn">완료</button>
            :
            <>
            <button className="update-btn" onClick={edit} >수정</button>
            <button className="delete-btn">삭제</button>
            </>
            }
              </li>
        
        ))}
          
      
      </ul>
    </div>
    </div>
  );
}

export default AppV2;


