import { useState } from 'react';
import './App.css';


function AppV2() {

 



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
           
          />
        </div>
          <button className="add-btn" style={{marginBottom: 10}}>추가하기</button>
          <button className="select-delete-btn">선택 삭제</button>


     
      <ul className="todo-list" id="todo-list">
      <li className="todo-item">
      <span>할일 추가</span>

      
             <button className="update-btn" >수정</button>
             <button className="delete-btn">삭제</button>
             
          
         
          
          </li>
       
        
          
      
      </ul>
    </div>
    </div>
  );
}

export default AppV2;


