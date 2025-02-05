// import { useState } from 'react';
// import './App.css';


// function App() {

//   //1. 유저가 입력한 todo값의 상태관리 
//   // 1-1. 상태를 만들고, input부분과 연결해준다.(value값과 유저가 입력하면 변하는 값 onChange설정, onChange할 수 있는 함수 새로 만들기)
//   //2. 실질적으로 추가한 todo 값의 상태 관리 (배열)
//   //  2-1. 추가한 todo값을 map으로 돌려봄 
//   //3. 추가하기 버튼의 기능
//   // 3-1. 추가하기 버튼 클릭 시 function을 생성, 배열로 todos를 받아야함. 
//   //4. 수정하기 (수정 버튼 클릭시, 입력할 수 있는 창으로 변경, 완료버튼으로 변경) 
//   // 4-1. onClick 기능이용해 함수 생성, 연결 . 함수에는 입력할 수 있는 창으로 변경 
//   // 여러 todos의 인덱스 중, 사용자가 클릭해서 변경하고자 하는 todo의 index를 가져와야함.
//   // 이때, isEdit 의 boolean 값으로 상태관리할 수 있는 useState를 하나 생성해야함. 
//   //5. 삭제하기

//   const [inputTodo, setInputTodo] = useState("");//입력창상태관리 
//   const [todos, setTodos] = useState([]); //추가한일 상태관리
//   const [isEdit, setIsEdit] = useState(false);//수정상태관리
//   const [editIndex, setEditIndex] = useState();//여러개의 인덱스 중 수정/선택하고자하는 index상태관리
//   const [tempInput, setTempInput] = useState(""); //수정중 임시 입력값 상태관리.
//   const [checkTodos, setCheckTodos] = useState([]);// 근데 배열로 해야됨. why? 여러개를 넣어야 하니까..
 


//   function inputTodoChange(e){
//     setInputTodo(e.target.value);
//     }

//   function addTodo(){
//     setTodos([...todos,inputTodo]);
//     setInputTodo("");
//   }
  
//   function editTodo(index){
//     //여러 개 중 수정하고자 하는 index를 가져와야함. 모두 수정될 수 없으니까. 
//     const editedTodo = todos[index];//수정할 todo의 값 가져오기. 
//     setTempInput(editedTodo);//이미 적혀있는 todo입력창에 표시. 
//     setIsEdit(true);
//     setEditIndex(index);//수정할 인덱스 저장 
//   }

//   function doneTodo(){
//     //setTodo는 배열 .
//     const updatedTodo = [...todos];
//     updatedTodo[editIndex] = tempInput; //이부분 다시 해보기. 
//     setTodos(updatedTodo);
//     setIsEdit(false);
  
//   }

//   function deleteTodo(index){
//     const deletedTodo = todos.filter((_, i) => index !== i ); 
//     setTodos(deletedTodo);

//   }

//   //체크박스를 ui를 input으로 만든다. 
//   //어떤 박스가 체크 되었는지 안되었는지 확인해야함.  -> 임의의 check 된 todos상태를 만들어준다. checkTodos
//   //체크가 된 박스는 삭제가 되어 todos에서 제거가 되어야 하고 
//   //체크가 안된 박스는 그대로 두어야 한다. 
//   //indexOf  => 특정 문자열을 찾고, 검색된 문자열이 첫번째로 나타나는 위치를 return 
//   // 찾는 문자열이 없으면 -1를 return 
//   //

//   function clickCheckBox(index){
//     //클릭된 체크박스를 인지하는 함수. 저장하는 함수 x 체크박스가 클릭됐을때 일어나는 일을 
//     //나타내는 함수.

//     //checkTodos(check된것의 여부 상태)와 todos(실제 목록의 todos) 구분하기. 
//     //여기서는 박스가 체크되었으면 먼저 checkTodos에 넣어두고 
//     //마지막에 checked된 것을 넣어 두어야 된다 .
//     const findIndex = checkTodos.indexOf(index); 
//     if(findIndex === -1){
//       // -1이 아니라면 . 박스킄 체크되어서 들어가야함/그렇다면... 
//       //findeIndex에는 들어간 index의 값이 .들어간다. 그러면 그값을 checkTodos에 넣어둔다. 
//       //근데 checkTodos는 배열이다. 왜? 여러개 선택할 수 있어야 하니까. 
//       const copyCheckedTodos = [...checkTodos, findIndex];
//       setCheckTodos(copyCheckedTodos);

//       //checkTodos는 index값이 아님/.. ?? checked된 내용? 

//     } else {
//       //체크박스가 해제된 경우, 이미 체크된 목록인 checkTodos에서 해당 항목을 뺴줘야함. 
//       //그 위치(findINdex)를 찾아서 splice로 제거 findIndex에 해당하는 하나 1번째 index것을 뺴줘야함.
//       const copyCheckedTodos = [...checkTodos]; //얕은 복사를 해주고
//       copyCheckedTodos.splice(findIndex,1);//그 check된 것중에 , findIndex(선택한 것중에 todo에 있는 값.)
//       setCheckTodos(copyCheckedTodos);

//     }
    
//   }

//   // 체크박스 삭제기능 
//   function clickDelete(){
//     console.log("!1111");
//     //checkTodos에 있는 목록과 매치시켜서 todos에서 같은 것을 삭제 한다. 
//     //여기서 왜 todos만 얕은 복사...? checkTodos는 왜 ?  여기서 checkTodos는 값이 아니고 인덱스 인데 어떻게 이중포문? 
  
//     let updatedTodos = [...todos];

//     for(let i = 0; i < checkTodos.length; i++){
//       for(let j = 0; j < updatedTodos.length; j++){
//         //checkTodos에 저장된 index와 일치하는 updated의 항목삭제 
//         if(){
//           s

//         }
//       }
//     }
//     setTodos(updatedTodos);
//     setCheckTodos([]);
//   }
 
// //   function clickCheckBox(index) {
// //     if (!checkTodos.includes(index)) {
// //         // 체크박스 선택
// //         setCheckTodos([...checkTodos, index]);
// //     } else {
// //         // 체크박스 해제
// //         setCheckTodos(checkTodos.filter((i) => i !== index));
// //     }
// // }
 
 


//   return (
//     <div className="App">
//         <div className="todo-container">
//       <div className="todo-header" style={{color:"#2F4157"}}>🧶오늘의 할일🧶</div>

//       <div style={{marginBottom: "10px", display: 'flex', flexDirection: 'row'}}>
        
//           <input
//             type="text"
//             className="todo-input"
//             id="todoInput"
//             placeholder="할 일을 입력하세요"   
//             value={inputTodo}
//             onChange={inputTodoChange}
//           />
//         </div>
//           <button className="add-btn" style={{marginBottom: 10}} onClick={addTodo}>추가하기</button>
//           <button className="select-delete-btn" onClick={clickDelete}>선택 삭제</button>


     
//       <ul className="todo-list" id="todo-list">
//        {todos.map((todo,index)=> (
//           <li key={index} className="todo-item">
//             <input
//               type="checkbox"    
//               onClick={()=>clickCheckBox(index)}
//             />
           
//             { isEdit && editIndex === index ? 
//             <input
//               type="text"
//               value={tempInput} 
//               onChange={(e)=>setTempInput(e.target.value)}
//               />
//             :
//             <span>{todo}</span>
//             }  

//             { isEdit && editIndex === index ?
//              <button className="update-btn" onClick={doneTodo}>완료</button>
//              : 
            
//              <>
//              <button className="update-btn" onClick={()=> editTodo(index)}>수정</button>
//              <button className="delete-btn" onClick={()=> deleteTodo(index)}>삭제</button>
//              </>
//             }
          
         
          
//           </li>

//        ))}
       
        
          
      
//       </ul>
//     </div>
//     </div>
//   );
// }

// export default App;