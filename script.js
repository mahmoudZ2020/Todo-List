// getting all required elements
var inputBox = document.getElementById("getData");
var addBtn = document.getElementById("addBtn");
var todoList = document.getElementById("todoList");
var deleteAllBtn = document.getElementById("clearBtn");
var addBtn1 = document.getElementById("addBtn1");
var pendingTasksNumb = document.getElementById("pendingTasks");

var currentIndex=0;
var getLocalStorageData = localStorage.getItem("New Todo");//getting localstorage
if(getLocalStorageData == null){//if localstorage has no data
  listArray = [];
 
}else{
  listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
  showTasks(); //calling showTask function
}

function update(inedx)
{
    currentIndex =inedx;
    console.log(currentIndex)
    inputBox.value = listArray[currentIndex];
}
addBtn1.onclick =()=>{
    listArray[currentIndex]=inputBox.value;
        localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
        showTasks(); //calling showTask function
        addBtn.classList.remove("active");
}






inputBox.onkeyup =()=>{
    let userData = inputBox.value;//getting user entered value
    // console.log(userData)
    if(userData.trim()!=0)//if the user value isn't only spaces
    {
        addBtn.classList.add("active"); //active the add button
        addBtn1.classList.add("active")
    }else{
        addBtn.classList.remove("active") //unactive the add button
        addBtn1.classList.remove("active")
    }
}

addBtn.onclick = ()=>{ //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value
    
    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
  }
 
function showTasks(){
    pendingTasksNumb.innerHTML = listArray.length; //passing the array length in pendingtask
    if(listArray.length > 0){ //if array length is greater than 0
      deleteAllBtn.classList.add("active"); //active the delete button
    }else{
      deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = "";
    listArray.forEach((element, index) => {
      newLiTag += `<li onclick="update(${index})">${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value = ""; //once task added leave the input field blank
  }


  // delete task function
function deleteTask(index){
  
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
  }



  deleteAllBtn.onclick = ()=>{
   listArray=[];
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
  }