// DOM
const input = document.getElementById("ingresarTareas");
const btnAdd = document.getElementById("btnAgregar");
const list = document.getElementById("list");
const totalTareas = document.getElementById("totalTareas");
const tareasCompletadas = document.getElementById("tareasCompletas");
const tareasPendientes = document.getElementById("tareasPendientes");

// Estado
let tareas = [];

// Lógica
function agregarTarea() {
  const textoTarea = input.value.trim();

  if (textoTarea === "") return;

  const nuevaTarea = {
    id: Date.now(),
    tarea: textoTarea,
    completado: false,
  };

  tareas.push(nuevaTarea);
  input.value = "";
}

function eliminarTarea(id) {
  tareas = tareas.filter((tarea) => tarea.id !== id);
  render();
}

function actualizarEstado() {
  const total = tareas.length;
  const completadasCount = tareas.filter((tarea) => tarea.completado).length;
  const pendientesCount = total - completadasCount;

  totalTareas.textContent = total;
  tareasCompletadas.textContent = completadasCount;
  tareasPendientes.textContent = pendientesCount;
}

// Render
function render() {
  list.innerHTML = "";

  tareas.forEach((element) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = element.tarea;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = element.completado;

    checkbox.addEventListener("change", () => {
      element.completado = checkbox.checked;
      render();
    });

    if (element.completado) {
      p.style.textDecoration = "line-through";
    }

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Eliminar";
    btnDelete.addEventListener("click", () => {
      eliminarTarea(element.id);
    });

    li.append(checkbox, p, btnDelete);
    list.appendChild(li);
  });

  actualizarEstado();
}

// Eventos
btnAdd.addEventListener("click", () => {
  agregarTarea();
  render();
});

render();
