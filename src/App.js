import { useState } from 'react';
import './App.css';


function App() {

  //1. 유저가 입력한 todo값의 상태관리 
  // 1-1. 상태를 만들고, input부분과 연결해준다.(value값과 유저가 입력하면 변하는 값 onChange설정, onChange할 수 있는 함수 새로 만들기)
  //2. 실질적으로 추가한 todo 값의 상태 관리 (배열)
  //  2-1. 추가한 todo값을 map으로 돌려봄 
  //3. 추가하기 버튼의 기능
  // 3-1. 추가하기 버튼 클릭 시 function을 생성, 배열로 todos를 받아야함. 
  //4. 수정하기 (수정 버튼 클릭시, 입력할 수 있는 창으로 변경, 완료버튼으로 변경) 
  // 4-1. onClick 기능이용해 함수 생성, 연결 . 함수에는 입력할 수 있는 창으로 변경 
  // 여러 todos의 인덱스 중, 사용자가 클릭해서 변경하고자 하는 todo의 index를 가져와야함.
  // 이때, isEdit 의 boolean 값으로 상태관리할 수 있는 useState를 하나 생성해야함. 
  //5. 삭제하기

  const [inputTodo, setInputTodo] = useState("");//입력창상태관리 
  const [todos, setTodos] = useState([]); //추가한일 상태관리

 


  function inputTodoChange(e){
    setInputTodo(e.target.value);
    }

  function tempInputChange(e, index){
    const copyTodos = [...todos];
    copyTodos[index].tempInput=e.target.value;

    setTodos(copyTodos);
  } 

  function addTodo(){
    setTodos([...todos,{value:inputTodo, isEdit:false, tempInput:"", isChecked:false}]);
    setInputTodo("");
  }
  
  function editTodo(index){
    //여러 개 중 수정하고자 하는 index를 가져와야함. 모두 수정될 수 없으니까. 
    const editedTodo = todos[index].value;//수정할 todo의 값 가져오기. 

    
    const copyTodos = [...todos]
    copyTodos[index].tempInput =editedTodo;
    copyTodos[index].isEdit=true

    setTodos(copyTodos);
  }

  function doneTodo(index){
    //setTodo는 배열 .
    const copyTodos = [...todos];
    copyTodos[index].isEdit=false;
    copyTodos[index].value=copyTodos[index].tempInput;
    setTodos(copyTodos);

  
  }

  function deleteTodo(index){

    const deletedTodo = todos.filter((_, i) => index !== i ); 
    setTodos(deletedTodo);

  }

  //체크박스를 ui를 input으로 만든다. 
  //어떤 박스가 체크 되었는지 안되었는지 확인해야함.  -> 임의의 check 된 todos상태를 만들어준다. checkTodos
  //체크가 된 박스는 삭제가 되어 todos에서 제거가 되어야 하고 
  //체크가 안된 박스는 그대로 두어야 한다. 
  //indexOf  => 특정 문자열을 찾고, 검색된 문자열이 첫번째로 나타나는 위치를 return 
  // 찾는 문자열이 없으면 -1를 return 
  //

  function clickCheckBox(index){
    //클릭된 체크박스를 인지하는 함수. 저장하는 함수 x 체크박스가 클릭됐을때 일어나는 일을 
    //나타내는 함수.

    //checkTodos(check된것의 여부 상태)와 todos(실제 목록의 todos) 구분하기. 
    //여기서는 박스가 체크되었으면 먼저 checkTodos에 넣어두고 
    const copyTodos = [...todos];
    //복사하는이유 복습
    if (copyTodos[index].isChecked===true){
      copyTodos[index].isChecked=false;
    }else{
      copyTodos[index].isChecked=true;
    }
    setTodos(copyTodos)
  }


   // 체크박스 삭제기능 
   function clickDelete(){
    //todos의 요소 자체를 봐야 한다 .배열이 아니라 값 하나하나를 돌면서 filter
    const deletedTodos = todos.filter((todo) => !todo.isChecked)
    setTodos(deletedTodos);

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
          <button className="add-btn" style={{marginBottom: 10}} onClick={addTodo}>추가하기</button>
          <button className="select-delete-btn" onClick={clickDelete}>삭제</button>


     
      <ul className="todo-list" id="todo-list">
       {todos.map((todo,index)=> (
          <li key={index} className="todo-item">
            <input
              type="checkbox"    
              checked={todo.isChecked}
              onClick={()=>clickCheckBox(index)}
            />
            {todo.isEdit ? 
            <input
              type="text"
              value={todo.tempInput} 
              onChange={(e)=>tempInputChange(e,index)}
           
              />
            :
            <span>{todo.value}</span>
            }  

            {todo.isEdit ?
             <button className="update-btn" onClick={()=>doneTodo(index)}>완료</button>
             : 
            
             <>
             <button className="update-btn" onClick={()=> editTodo(index)}>수정</button>
             <button className="delete-btn" onClick={()=> deleteTodo(index)}>삭제</button>
             </>
            }
          
         
          
          </li>

       ))}
       
        
          
      
      </ul>
    </div>
    </div>
  );
}

export default App;


