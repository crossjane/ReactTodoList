import { useState } from 'react';
import './App.css';
import { useEffect } from 'react';


function AppV2() {

  useEffect(() => {
    console.log("ddd")
  }, [])
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

  function done(index){
    //클릭 시, 입력된 temp의 값이 todo로 저장이 되어야 하고 . isEdit => false로 변경
    const copyTodos = [...todos];
    copyTodos[index].isEdit = false;
    copyTodos[index].value = copyTodos[index].tempInput;
    setTodos(copyTodos);
    
  }

  function tempInputChange(e, index){
    const copyTodos = [...todos];
    copyTodos[index].tempInput = e.target.value;
    setTodos(copyTodos);

  }

  function checkboxClick(index){

    //클릭했을때, 안했을때를 나누어 설정해 주어야함 : 클릭 했다가 안했다가 반복 가능하기 때문에.
    //클릭 했을때는 체크 되도록 안되도륵... 
    const copyTodos = [...todos];

    if(copyTodos[index].isChecked === true){
      copyTodos[index].isChecked = false;
    } else {
      copyTodos[index].isChecked = true

    }
    
    setTodos(copyTodos);

  }

  function checkboxDelete(){

    //선택 삭제를 눌렀을때, 체크된 index들의 todos목록이 사라져야 한다. 나머지만 return 되어야 한다. 
    //그러려면 index를 받아오기 .=> index를 받아올 필요 없다. 
    //왜? isChecked가 false인 경우만 filtering 하여 return 하면 되기 때문에 

    const deletedTodos = todos.filter((todo)=> !todo.isChecked);
    setTodos(deletedTodos);

    }

    function deleteTodo(index){
      //splice는 안돌아도된다. filer는 반복해서 돌아서 비효율적. 찾아야될때 쓰기.
     
      // const deleteTodos = todos.filter((_,todoIndex)=> {
      //   return todoIndex !== index;
      // });

      // console.log(deleteTodos)
      // setTodos(deleteTodos);

      const copyTodos = [...todos];
      copyTodos.splice(index,1);
      setTodos(copyTodos);
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
          <button className="select-delete-btn" onClick={checkboxDelete}>선택 삭제</button>


     
      <ul className="todo-list" id="todo-list">
        {todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <input
              type='checkbox'
              checked={todo.isChecked}
              onClick={()=>checkboxClick(index)}
            />
          

            {todo.isEdit?      
              <input
              type="text"
              value={todo.tempInput}
              onChange={(e)=>tempInputChange(e,index)}
              />

              :
              <span>{todo.value}</span>
            }

           {todo.isEdit?      
            <button className="update-btn" onClick={()=>done(index)}>완료</button>
            :
            <>
            <button className="update-btn" onClick={()=>edit(index)} >수정</button>
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

export default AppV2;


