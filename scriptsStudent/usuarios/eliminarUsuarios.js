async function GetUsuario(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id
  );
  const data = await response.json();
  return data;
}
// Eliminar usuario
async function eliminarUsuario(id) {
  try {
    const response = await fetch(
      `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      alert("Usuario eliminado exitosamente");
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("eliminarUsuarioModal")
      );
      modal.hide();
      CargarUsuarios(); // recarga la tabla
    } else {
      alert("Error al eliminar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al eliminar el usuario");
  }
}


document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("delete-user")) {
      const id = e.target.getAttribute("data-id");

      
      const usuario = await GetUsuario(id);

      
      document.querySelector(
        "#nombre-usuario"
      ).innerHTML = usuario.nombre;

      
      const btnEliminar = document.querySelector(
        "#eliminarUsuarioModal .btn-danger"
      );
      btnEliminar.onclick = async () => {
        await eliminarUsuario(id);
      };
    }
  });
});
