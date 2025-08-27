async function subConsulta(id) {
  const response = await fetch(
    `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?id=${id}`
  );
  const data = await response.json();
  return data[0];
}
async function cargarDocentes() {
  const response = await fetch(
    `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=${"Docente"}`
  );
  const data = await response.json();
  return data;
}
async function CargarCursos() {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos"
  );
  const data = await response.json();

  let tabla = "";
  for (const curso of data) {
    const docente = await subConsulta(curso.docenteId);
    tabla += `<tr>
        <td>${curso.titulo}</td>
        <td>${curso.categoria}</td>
        <td>${docente.nombre}</td>
        <td><i class="bi bi-people"></i>${curso.estudiantes.length}</td>
        <td>${curso.duracion}</td>
        <td>${curso.estado}</td>
        <td>${curso.fechaCreacion}</td>
        <td>
            <a href="./curso-detalle.html?id=${curso.id}" class="text-black me-2"><i
                    class="bi bi-eye fs-5"></i></a>
            <i class="bi bi-pencil-square fs-5 me-2 text-black" data-id="${curso.id}"  data-bs-toggle="modal"
                data-bs-target="#modalEditar"></i>
            <i class="bi bi-trash3 fs-5 text-black" data-id="${curso.id}" data-bs-toggle="modal"  data-bs-target="#modalEliminar"></i>
        </td>
        </tr>`;
  }

  document.getElementById("table-body").innerHTML = tabla;
}
async function AgregarCurso() {
  const docentes = await cargarDocentes();
  let opciones =
    '<option value="" disabled selected>Selecciona un docente</option>';
  for (const docente of docentes) {
    opciones += `<option value="${docente.id}">${docente.nombre}</option>`;
  }
  document.getElementById("docente-input").innerHTML = opciones;
  //====================agarrar el formulario====================
  const form = document.getElementById("form-curso");
  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    //====================agarrar los valores====================
    const titulo = document.getElementById("tittle-input").value;
    const descripcion = document.getElementById("descripcion-input").value;
    const categoria = document.getElementById("categoria-input").value;
    const duracion = document.getElementById("duracion-input").value;
    const docenteId = document.getElementById("docente-input").value;
    const etiquetas = document.getElementById("etiquetas").value;
    const fechaCreacion = new Date().toISOString().split("T")[0]; // en formato YYYY-MM-DD
    //====================crear el objeto====================
    const nuevoCurso = {
      titulo: titulo,
      descripcion: descripcion,
      categoria: categoria,
      duracion: duracion,
      docenteId: docenteId,
      etiquetas: etiquetas,
      estado: "Activo",
      fechaCreacion: fechaCreacion,
      estudiantes: [],
    };
    //====================mandar el objeto====================
    try {
      const response = await fetch(
        "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoCurso),
        }
      );
      if (response.ok) {
        
        const modalCurso = new bootstrap.Modal(
          document.getElementById("modalCurso")
        );
        modalCurso.hide();
        
        form.reset();
        
        CargarCursos();
        alert("Curso agregado exitosamente");
      } else {
        alert("Error al agregar el curso");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el curso");
    }
  });
}
document.addEventListener("DOMContentLoaded", function () {
  CargarCursos();
  AgregarCurso();
});
