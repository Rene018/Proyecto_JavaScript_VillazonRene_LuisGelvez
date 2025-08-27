// Obtener un curso por ID
async function GetCurso(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/" + id
  );
  const data = await response.json();
  return data; // la API devuelve un objeto único
}
async function cargarDocentes() {
  const response = await fetch(
    `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=${"Docente"}`
  );
  const data = await response.json();
  return data;
}

// Rellenar el modal con los datos del curso
async function cargarCursoEnFormulario(curso) {
  const docentes = await cargarDocentes();
  let opciones =
    '<option value="" disabled selected>Selecciona un docente</option>';
  for (const docente of docentes) {
    opciones += `<option value="${docente.id}">${docente.nombre}</option>`;
  }
  document.getElementById("docente-input-edit").innerHTML = opciones;
  document.getElementById("tittle-input-edit").value = curso.titulo;
  document.getElementById("descripcion-input-edit").value = curso.descripcion;
  document.getElementById("categoria-input-edit").value = curso.categoria;
  document.getElementById("duracion-input-edit").value = curso.duracion;
  document.getElementById("docente-input-edit").value = curso.docenteId;
  document.getElementById("etiquetas-edit").value = curso.etiquetas;
}

// Editar curso (manteniendo datos originales)
async function editarCurso(id, cursoOriginal) {
  const cursoActualizado = {
    titulo: document.getElementById("tittle-input-edit").value,
    descripcion: document.getElementById("descripcion-input-edit").value,
    categoria: document.getElementById("categoria-input-edit").value,
    duracion: document.getElementById("duracion-input-edit").value,
    docenteId: document.getElementById("docente-input-edit").value,
    etiquetas: document.getElementById("etiquetas-edit").value,
    // Mantener valores originales importantes
    estado: cursoOriginal.estado,
    fechaCreacion: cursoOriginal.fechaCreacion,
    estudiantes: cursoOriginal.estudiantes,
  };

  try {
    const response = await fetch(
      `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cursoActualizado),
      }
    );

    if (response.ok) {
      alert("Curso actualizado exitosamente");
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalEditar")
      );
      modal.hide();
      CargarCursos(); // función global definida en mainCurso.js
    } else {
      alert("Error al actualizar el curso");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al actualizar el curso");
  }
}

// Listener para abrir modal de edición y cargar datos
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", async (e) => {
    if (
      e.target.classList.contains("edit-modal-open") ||
      e.target.classList.contains("bi-pencil-square")
    ) {
      const id = e.target.getAttribute("data-id");
      const curso = await GetCurso(id);

      // Cargar datos en formulario
      cargarCursoEnFormulario(curso);

      // Cambiar título y botón del modal
      document.querySelector("#modalEditar .modal-title").textContent =
        "Editar Curso";
      document.querySelector("#btn-submit-curso").textContent =
        "Guardar Cambios";

      // Manejar submit del formulario
      const formEdit = document.getElementById("form-curso-edit");
      formEdit.onsubmit = async (ev) => {
        ev.preventDefault();
        await editarCurso(id, curso);
      };
    }
  });
});
