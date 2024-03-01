// localStorage.clear();

const todoValue = document.getElementById("todoText");
const todoAlert = document.getElementById("Alert");
const listItems = document.getElementById("list-items");

let todo = JSON.parse(localStorage.getItem("todo-list")) || [];

function ReadToDoItems() {
  todo.forEach((element) => {
    let li = document.createElement("li");
    let style = "";
    if (element.status) {
      style = "style='text-decoration: line-through'";
      
    }
    const todoItems = `<div ${style} title="${element.item}" onclick="CompletedToDoItems(this)">${
      element.item
    }
    ${
      style === ""
        ?  '</div><div><span class="material-symbols-outlined todo-controls done" onclick="CompletedToDoItems(this)">check</span>'
        : '</div><div><span class="material-symbols-outlined" onclick="DeleteToDoItems(this)" >delete</span></div'
    }
    ${
      style === ""
        ? '<span class="material-symbols-outlined todo-controls edit" onclick="UpdateToDoItems(this)">edit</span> '
        : ""
    }
    ${
      style === ""
        ? '<span class="material-symbols-outlined" onclick="DeleteToDoItems(this)" >delete</span> '
        : ""
    }
    
    </div>`;
    li.innerHTML = todoItems;
    listItems.appendChild(li);
  });
}
ReadToDoItems();

function CreateToDoItems() {
  if (todoValue.value === "") {
      todoAlert.style.color = "red"; 
      todoAlert.innerText = "Please enter your todo text!";
      todoValue.focus();
      return;
  }

  const IsPresent = todo.some(element => element.item === todoValue.value);

  if (IsPresent) {
      setAlertMessage("This item is already present in the list!");
      return;
  }

  const li = document.createElement("li");
  
  const todoItems = `<div title="${todoValue.value}" onclick="CompletedToDoItems(this)">${todoValue.value}</div>
                      <div>                         
                          <span class="material-symbols-outlined todo-controls edit" onclick="UpdateToDoItems(this)">
                              edit
                          </span>
                          <span class="material-symbols-outlined todo-controls delete" onclick="DeleteToDoItems(this)">
                              delete
                          </span>                                           
                      </div>`;
  li.innerHTML = todoItems;
  listItems.appendChild(li);

  todo.push({ item: todoValue.value, status: false });
  setLocalStorage();

  todoValue.value = "";
  setAlertMessage("Todo item Created Successfully!");
}

function UpdateToDoItems(e) {
    const listItem = e.parentElement.parentElement.querySelector("div");
    if (listItem.style.textDecoration === "") {
        todoValue.value = listItem.innerText;
        const originalItemText = todoValue.value;
        e.innerText = "refresh";
        e.setAttribute("onclick", `UpdateOnSelectionItems('${originalItemText}')`);
        todoValue.focus();
    }
}

function UpdateOnSelectionItems(originalItemText) {
    const updatedItemText = todoValue.value.trim();
    if (!updatedItemText) {
        setAlertMessage("Please enter a valid item!","red");
        return;
    }

    const existingItem = todo.find(element => element.item === updatedItemText);
    if (existingItem) {
        setAlertMessage("This item already exists in the list!","red");
        return;
    }
    
    const listItem = listItems.querySelector(`div [title="${originalItemText}"] `);
    listItem.innerText = updatedItemText;
    listItem.setAttribute("title", updatedItemText);
    listItem.style.textDecoration = "";
    const editSpan = listItem.parentElement.querySelector(".edit");
    editSpan.innerText = "edit";
    editSpan.setAttribute("onclick", "UpdateToDoItems(this)");
    const index = todo.findIndex(element => element.item === originalItemText);
    todo[index].item = updatedItemText;
   
    setLocalStorage();

    todoValue.value = "";
    setAlertMessage("Todo item Updated Successfully!");
}

function DeleteToDoItems(e) {
  let deleteValue =
    e.parentElement.parentElement.querySelector("div").innerText;

  if (confirm(`Are you sure. Due you want to delete this ${deleteValue}!`)) {
    e.parentElement.parentElement.setAttribute("class", "deleted-item");
    todoValue.focus();

    todo.forEach((element) => {
      if (element.item == deleteValue.trim()) {
        todo.splice(element, 1);
      }
    });

    setTimeout(() => {
      e.parentElement.parentElement.remove();
    }, 1000);

    setLocalStorage();
  }
}

function CompletedToDoItems(e) {
  if (e.parentElement.querySelector("div").style.textDecoration === "") {
    // const img = document.createElement("img");
    // img.src = "/images/check-mark.png";
    // img.className = "todo-controls";
    e.parentElement.querySelector("div").style.textDecoration = "line-through";
    // e.parentElement.querySelector("div").appendChild(img);
    // e.parentElement.querySelector("img.edit").remove();

    todo.forEach((element) => {
      if (
        e.parentElement.querySelector("div").innerText.trim() == element.item
      ) {
        element.status = true;
      }
    });
    setLocalStorage();
    setAlertMessage("Todo item Completed Successfully!");
  }
}


function setLocalStorage() {
    localStorage.setItem("todo-list", JSON.stringify(todo));
}

function setAlertMessage(message,color="green") {
    todoAlert.innerText = message;
    todoAlert.style.color = color;
    setTimeout(() => {
        todoAlert.innerText = "";
    }, 1000);
}
