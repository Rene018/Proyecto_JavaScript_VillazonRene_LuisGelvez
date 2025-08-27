async function CargarUsuarios() {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users"
  );
  const data = await response.json();

  let tabla = "";
  for (const user of data) {
    tabla += `<tr>
                <td>${user.nombre}</td>
                <td>${user.correo}</td>
                <td>${user.tipo}</td>
                <td>${user.ultimaActividad}</td>
                <td>
                    <i class="bi ver-user bi-eye"data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#verUsuarioModal"></i>
                    <i class="bi edit-user bi-pencil"data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#editarUsuarioModal"></i>
                    <i class="bi delete-user bi-trash"data-id="${user.id}" data-bs-toggle="modal" data-bs-target="#eliminarUsuarioModal"></i>
                </td>
             </tr>`;
  }

  document.getElementById("tabla-users").innerHTML = tabla;
}
document.addEventListener("DOMContentLoaded", function () {
  CargarUsuarios();
});
