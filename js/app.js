let todosDefault = ["3 Litre Su İç", "Ödevleri Yap", "EN az 3 Saat Kodlama Yap", "Yemek Yap", "50 Sayfa Kitap Oku"]

// tüm elementleri seçme
const input = document.querySelector("#task");
const list = document.querySelector("#list");
const clearButton = document.querySelector("#clear-todos");


eventListener();

function eventListener() {
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);
    list.addEventListener("click", selectDeleteTodo);
    clearButton.addEventListener("click", clearAll);
}

function newElement() {
    let newTodo = input.value.trim();
    if (newTodo === "") $("#liveToastEmpty").toast("show")
    else {
        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        $("#liveToastSuccess").toast("show")
    }
}

function addTodoToUI(newTodo) {
    const listItem = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    listItem.className = "select"
    button.className = "close h-100 p-3";
    span.className = "remove"
    span.innerHTML = "&times;"
    button.appendChild(span);
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(button);

    listItem.addEventListener("click", function () {
        if (listItem.classList.contains("bg-info")) {
            listItem.classList.remove("bg-info", "line")


        } else {
            listItem.classList.add("bg-info", "line")
        }
    })

    list.appendChild(listItem);
    input.value = "";
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    if (!(todos.includes(newTodo))) {
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
}

function loadAllTodosToUI() {
    let todos = JSON.parse(localStorage.getItem("todos")) || todosDefault;

    todos.forEach(addTodoToUI);
    todos.forEach(addTodoToStorage);
}

function selectDeleteTodo(e) {
    // if (e.target.className === "select") {
    //     if (e.target.classList.contains("bg-info")) {
    //         e.target.classList.remove("bg-info", "line")
    //     } else {
    //         e.target.classList.add("bg-info", "line")
    //     }
    // }


    if (e.target.className === "remove") {
        e.target.parentElement.parentElement.remove();
        $("#liveToastRemove").toast("show")
        deleteFromStorage(e.target.parentElement.parentElement.textContent);
    }
}

function deleteFromStorage(deletetodo) {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo, index) {
        if ((todo + "×") === deletetodo) {
            todos.splice(index, 1);
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
}

function clearAll() {
    if (confirm("emin misiniz?")) {

        // List.innerHTML=""; //yavaş

        while (list.firstElementChild != null) {
            list.removeChild(list.firstElementChild);
            ;
        }

        localStorage.removeItem("todos");
        $("#liveToastClear").toast("show")
    }
}

