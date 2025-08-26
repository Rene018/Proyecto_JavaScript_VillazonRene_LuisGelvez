document.addEventListener("DOMContentLoaded", async () => {
  const tablaAlumnos = document.getElementById("tablaAlumnos");
  const alumnosSeleccionadosDiv = document.getElementById(
    "alumnosSeleccionados"
  );
  const searchInput = document.getElementById("searchAlumno");

  let alumnosDisponibles = [];
  let seleccionados = new Set();

  // Obtener ID de curso desde la URL del navegador
  const urlParams = new URLSearchParams(window.location.search);
  const cursoId = urlParams.get("id");

  // Cargar solo estudiantes que NO estén inscritos en este curso
  async function cargarUsuarios() {
    try {
      const res = await fetch(
        "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=Estudiante"
      );
      const estudiantes = await res.json();

      alumnosDisponibles = estudiantes.filter(
        (u) => !(u.cursosInscritos || []).includes(cursoId)
      );

      seleccionados.clear();
      renderAlumnos(alumnosDisponibles);
    } catch (error) {
      console.error("Error cargando estudiantes:", error);
    }
  }

  function renderAlumnos(lista) {
    tablaAlumnos.innerHTML = "";
    lista.forEach((alumno) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${alumno.nombre}</td>
        <td>
          <button class="btn ${
            seleccionados.has(alumno.id) ? "btn-danger" : "btn-success"
          } btn-sm toggle-alumno" data-id="${alumno.id}">
            ${seleccionados.has(alumno.id) ? "Quitar" : "Agregar"}
          </button>
        </td>
      `;
      tablaAlumnos.appendChild(fila);
    });
    renderSeleccionados();
  }

  function renderSeleccionados() {
    alumnosSeleccionadosDiv.innerHTML = "";
    seleccionados.forEach((id) => {
      const alumno = alumnosDisponibles.find((a) => a.id === id);
      if (alumno) {
        const span = document.createElement("span");
        span.className = "badge bg-primary text-white me-2 mb-2 p-2";
        span.textContent = alumno.nombre;

        const btn = document.createElement("button");
        btn.className = "btn-close btn-close-white ms-2";
        btn.style.fontSize = "0.7rem";
        btn.onclick = () => {
          seleccionados.delete(alumno.id);
          renderAlumnos(alumnosDisponibles);
        };

        span.appendChild(btn);
        alumnosSeleccionadosDiv.appendChild(span);
      }
    });
  }

  searchInput.addEventListener("input", (e) => {
    const term = e.target.value.toLowerCase();
    const filtrados = alumnosDisponibles.filter((a) =>
      a.nombre.toLowerCase().includes(term)
    );
    renderAlumnos(filtrados);
  });

  tablaAlumnos.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle-alumno")) {
      const id = e.target.getAttribute("data-id");
      if (seleccionados.has(id)) {
        seleccionados.delete(id);
      } else {
        seleccionados.add(id);
      }
      renderAlumnos(alumnosDisponibles);
    }
  });

  document
    .querySelector("#modalAlumnos .btn-primary")
    .addEventListener("click", async () => {
      const idsSeleccionados = Array.from(seleccionados);

      // 1. Obtener curso actual
      const cursoRes = await fetch(
        `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/${cursoId}`
      );
      const cursoData = await cursoRes.json();
      const estudiantesCurso = cursoData.estudiantes || [];

      // 2. Inscribir alumnos en sus perfiles y actualizar curso
      for (const id of idsSeleccionados) {
        const alumno = alumnosDisponibles.find((a) => a.id === id);
        if (alumno) {
          const cursos = alumno.cursosInscritos || [];
          if (!cursos.includes(cursoId)) cursos.push(cursoId);

          await fetch(
            `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/${id}`,
            {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ cursosInscritos: cursos }),
            }
          );

          if (!estudiantesCurso.includes(id)) {
            estudiantesCurso.push(id);
          }
        }
      }

      // 3. Actualizar curso con lista completa de estudiantes
      await fetch(
        `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/${cursoId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ estudiantes: estudiantesCurso }),
        }
      );

      alert("Alumnos inscritos al curso correctamente");
      seleccionados.clear();
      cargarUsuarios();
      CargarEstudiantes();
    });
  async function subConsulta(id) {
    const response = await fetch(
      `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?id=${id}`
    );
    const data = await response.json();
    return data[0];
  }
  async function CargarEstudiantes() {
    const params = new URLSearchParams(window.location.search);
    const cursoId = params.get("id");
    const response = await fetch(
      "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/" + cursoId
    );
    const data = await response.json();
    console.log();

    let tabla = "";

    for (const estudiante of data.estudiantes) {
      const estud = await subConsulta(parseInt(estudiante));
      tabla += `<tr>
            <td>${estud.nombre}</td>
            <td>
                15 Cumplidas <br>
                5 Pendientes <br>
                <span class="text-danger">2 Retrasadas</span>
            </td>
            <td>${estud.nombre}%</td>
            <td>${estud.nombre}</td>
            <td>
                <i class="bi ver- bi-eye me-2 text-black" role="button" data-bs-toggle="modal" data-bs-target="#modalVer"></i>
                <i class="bi bi-pencil-square me-2 text-black" role="button" data-bs-toggle="modal" data-bs-target="#modalEditar"></i>
                <i class="bi bi-trash text-black" role="button" data-bs-toggle="modal" data-bs-target="#modalEliminar"></i>
            </td>
        </tr>`;
    }

    document.getElementById("tablaEstudiantes").innerHTML = tabla;
  }
  CargarEstudiantes();
  cargarUsuarios();
});
