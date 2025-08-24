const btnAgregar = document.getElementById("agregar-btn");
const listaMateriales = document.getElementById("lista-materiales");

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-input").value.trim();
  const link = document.getElementById("link-input").value.trim();

  if (nombre && link) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
          <span><strong>${nombre}:</strong> <a href="${link}" target="_blank">${link}</a></span>
          <button class="btn btn-sm"><i class="bi bi-trash3 text-danger"></i></button>
        `;

    // Acción para eliminar material
    li.querySelector("button").addEventListener("click", () => {
      li.remove();
    });

    listaMateriales.appendChild(li);

    // limpiar inputs
    document.getElementById("nombre-input").value = "";
    document.getElementById("link-input").value = "";
  }
});


document.addEventListener("DOMContentLoaded", () => {
  const alumnos = [
    "Maria Gonzales",
    "Carlos Ruiz",
    "Ana Lopez",
    "Pedro Martin",
    "Pedro Perez Pereira"
  ];

  const alumnosSeleccionados = document.getElementById("alumnosSeleccionados");
  const tablaAlumnos = document.getElementById("tablaAlumnos");
  const searchAlumno = document.getElementById("searchAlumno");

  let seleccionados = new Set();

  // Función para renderizar tabla
  function renderTabla(filtro = "") {
    tablaAlumnos.innerHTML = "";
    alumnos
      .filter(nombre => nombre.toLowerCase().includes(filtro.toLowerCase()))
      .forEach(nombre => {
        const tr = document.createElement("tr");

        const tdNombre = document.createElement("td");
        tdNombre.textContent = nombre;

        const tdAccion = document.createElement("td");
        const icon = document.createElement("i");
        icon.className = seleccionados.has(nombre)
          ? "bi bi-check-circle fs-5 text-secondary"
          : "bi bi-plus-circle fs-5 text-success btn-add-alumno";
        icon.style.cursor = "pointer";
        icon.dataset.nombre = nombre;

        tdAccion.appendChild(icon);
        tr.appendChild(tdNombre);
        tr.appendChild(tdAccion);
        tablaAlumnos.appendChild(tr);
      });
  }

  // Añadir alumno arriba
  function addAlumno(nombre) {
    if (!seleccionados.has(nombre)) {
      seleccionados.add(nombre);

      const span = document.createElement("span");
      span.className = "badge rounded-pill bg-primary m-1 p-2 d-inline-flex align-items-center";
      span.dataset.nombre = nombre;

      const text = document.createElement("span");
      text.textContent = nombre;

      const closeBtn = document.createElement("i");
      closeBtn.className = "bi bi-x-circle ms-2 text-white btn-remove-alumno";
      closeBtn.style.cursor = "pointer";

      span.appendChild(text);
      span.appendChild(closeBtn);

      alumnosSeleccionados.prepend(span);

      renderTabla(searchAlumno.value);
    }
  }

  // Eliminar alumno
  function removeAlumno(nombre) {
    seleccionados.delete(nombre);
    const badge = alumnosSeleccionados.querySelector(`[data-nombre="${nombre}"]`);
    if (badge) badge.remove();
    renderTabla(searchAlumno.value);
  }

  // Eventos
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-alumno")) {
      addAlumno(e.target.dataset.nombre);
    }
    if (e.target.classList.contains("btn-remove-alumno")) {
      removeAlumno(e.target.parentElement.dataset.nombre);
    }
  });

  // Búsqueda en vivo
  searchAlumno.addEventListener("input", (e) => {
    renderTabla(e.target.value);
  });

  // Render inicial
  renderTabla();
});