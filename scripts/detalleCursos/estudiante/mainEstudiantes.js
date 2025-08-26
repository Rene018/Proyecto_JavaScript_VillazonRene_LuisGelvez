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

document.addEventListener("DOMContentLoaded", function () {
CargarEstudiantes();
});
