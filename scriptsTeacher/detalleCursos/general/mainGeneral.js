const params = new URLSearchParams(window.location.search);
const cursoId = params.get("id");

async function GetCurso(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/" + id
  );
  return await response.json();
}

async function GetDocente(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id
  );
  return await response.json();
}
async function CargarCurso() {
  const curso = await GetCurso(cursoId);
  const docente = await GetDocente(curso.docenteId);

  document.getElementById("title-curso").textContent = curso.titulo;
  document.getElementById("info-curso").textContent = curso.descripcion;
  document.getElementById("categoria").textContent = curso.categoria;
  document.getElementById("docente").textContent = docente.nombre;
  document.getElementById("duracion").textContent = curso.duracion;

  document.getElementById("cant-estudiantes").textContent =
    curso.estudiantes.length;
  document.getElementById("cant-estudiantes-activos").textContent =
    curso.estudiantes.length;
  document.getElementById("cant-modulos").textContent = 0;

  const tagsContainer = document.getElementById("tags");
  tagsContainer.innerHTML = "";
  if (curso.tags && curso.tags.length > 0) {
    curso.tags.forEach((tag) => {
      tagsContainer.innerHTML += `<span class="badge bg-secondary text-white me-2">${tag}</span>`;
    });
  } else {
    tagsContainer.innerHTML =
      '<span class="text-muted">Este curso no tiene tags</span>';
  }
}

document.addEventListener("DOMContentLoaded", function () {
  CargarCurso();
});
