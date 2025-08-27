async function GetUsuario(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id
  );
  const data = await response.json();
  return await data;
}

async function cargarUsuarioVer(usuario) {
  document.getElementById("verNombre").textContent =
    usuario.nombre || "Sin nombre";
  document.getElementById("verCorreo").textContent =
    usuario.correo || "Sin correo";

  const ultimaActividad = new Date(usuario.ultimaActividad);
  const hoy = new Date();
  const diferencia = (hoy - ultimaActividad) / (1000 * 60 * 60 * 24); // días

  document.getElementById("verEstado").textContent =
    diferencia <= 30 ? "Activo" : "Inactivo";
}
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("ver-student")) {
      const id = e.target.getAttribute("data-id");
      const usuario = await GetUsuario(id);
      await cargarUsuarioVer(usuario);

      const modalVer = new bootstrap.Modal(document.getElementById("modalVer"));
      modalVer.show();
    }
  });
});
