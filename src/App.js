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
  const [isEdit, setIsEdit] = useState(false);//수정상태관리
  const [editIndex, setEditIndex] = useState();//여러개의 인덱스 중 수정/선택하고자하는 index상태관리
  const [tempInput, setTempInput] = useState(""); //수정중 임시 입력값 상태관리.


  function inputTodoChange(e){
    setInputTodo(e.target.value);
    }

  function addTodo(){
    setTodos([...todos,inputTodo]);
    setInputTodo("");
  }
  
  function editTodo(index){
    //여러 개 중 수정하고자 하는 index를 가져와야함. 모두 수정될 수 없으니까. 
    const editedTodo = todos[index];//수정할 todo의 값 가져오기. 
    setTempInput(editedTodo);//이미 적혀있는 todo입력창에 표시. 
    setIsEdit(true);
    setEditIndex(index);//수정할 인덱스 저장 
  }

  function doneTodo(){
    //setTodo는 배열 .
    const updatedTodo = [...todos];
    updatedTodo[editIndex] = tempInput; //이부분 다시 해보기. 
    setTodos(updatedTodo);
    setIsEdit(false);
  
  }

  function deleteTodo(index){
    const deletedTodo = todos.filter((_, i) => index !== i ); 
    setTodos(deletedTodo);

    
    
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
          <button className="add-btn" onClick={addTodo}>추가하기</button>
        

     
      <ul className="todo-list" id="todo-list">
       {todos.map((todo,index)=> (
          <li key={index} className="todo-item">
            { isEdit && editIndex === index ? 
            <input
              type="text"
              value={tempInput} 
              onChange={(e)=>setTempInput(e.target.value)}//setInput에 있는 값을 전달 받는것?
              />
            :
            <span>{todo}</span>
            }  

            { isEdit && editIndex === index ?
             <button className="update-btn" onClick={doneTodo}>완료</button>
             : 
            //  빈괄호는 언제언제 쓰는가  ? 
             <>
             <button className="update-btn" onClick={()=> editTodo(index)}>수정</button>
             <button className="delete-btn" onClick={()=>deleteTodo(index)}>삭제</button>
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


