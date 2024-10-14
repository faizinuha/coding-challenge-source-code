// Fungsi untuk menambahkan todo
function addTodo() {
  const todoInput = document.getElementById("new-todo");
  const todoList = document.getElementById("todo-list");

  if (todoInput.value === "") return;

  const newTodo = document.createElement("li");
  newTodo.innerHTML = `${todoInput.value} <button onclick="deleteTodo(this)">Hapus</button>`;
  newTodo.addEventListener("click", function() {
    newTodo.classList.toggle("completed");
    saveTodos(); // Simpan todo setelah menandai sebagai selesai
  });

  todoList.appendChild(newTodo);
  saveTodos(); // Simpan todo setelah ditambahkan
  todoInput.value = "";
}

// Fungsi untuk menghapus todo
function deleteTodo(element) {
  element.parentElement.remove();
  saveTodos(); // Simpan todo setelah dihapus
}

// Fungsi untuk menyimpan todo list ke local storage
function saveTodos() {
  const todoListItems = document.querySelectorAll("#todo-list li");
  let todos = [];

  todoListItems.forEach(item => {
    const todoText = item.firstChild.textContent.trim();
    const isCompleted = item.classList.contains("completed");
    todos.push({ text: todoText, completed: isCompleted });
  });

  localStorage.setItem("todos", JSON.stringify(todos));
}

// Fungsi untuk memuat todo dari local storage saat halaman di-refresh
function loadTodos() {
  const savedTodos = localStorage.getItem("todos");

  if (savedTodos) {
    const todos = JSON.parse(savedTodos);
    const todoList = document.getElementById("todo-list");

    todos.forEach(todo => {
      const newTodo = document.createElement("li");
      newTodo.innerHTML = `${todo.text} <button onclick="deleteTodo(this)">Hapus</button>`;
      
      if (todo.completed) {
        newTodo.classList.add("completed");
      }

      newTodo.addEventListener("click", function() {
        newTodo.classList.toggle("completed");
        saveTodos(); // Simpan perubahan
      });

      todoList.appendChild(newTodo);
    });
  }
}

// Fungsi untuk generate QR Code berdasarkan todo list
function generateQRCode() {
  const todoListItems = document.querySelectorAll("#todo-list li");
  let todoText = "";

  todoListItems.forEach(item => {
    todoText += item.firstChild.textContent.trim() + "\n";
  });

  if (todoText === "") {
    alert("Todo List kosong! Silakan tambahkan tugas.");
    return;
  }

  const qrCodeContainer = document.getElementById("qrcode");
  qrCodeContainer.innerHTML = ""; // Clear previous QR code if exists

  // Generate QR code based on the todoText
  new QRCode(qrCodeContainer, {
    text: todoText,
    width: 128,
    height: 128
  });
}

// Saat halaman dimuat, panggil loadTodos untuk memuat todo dari local storage
window.onload = function() {
  loadTodos();
};
