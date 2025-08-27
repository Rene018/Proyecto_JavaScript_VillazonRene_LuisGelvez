// ==========================
// PERFIL ESTUDIANTE
// ==========================

// Cargar usuario desde localStorage
function getUsuarioLocal() {
  const usuario = localStorage.getItem("usuario");
  return usuario ? JSON.parse(usuario) : null;
}

// Rellenar inputs con datos del usuario
function cargarPerfil(usuario) {
  if (!usuario) {
    console.warn("⚠️ No se encontró usuario en localStorage");
    return;
  }

  // Cabecera
  document.querySelector(".name").textContent = usuario.nombre || "Sin nombre";
  document.querySelector(".profesion").textContent = usuario.tipo || "Estudiante";

  // Datos personales
  document.getElementById("nombre-input").value = usuario.nombre || "";
  document.getElementById("correo-input").value = usuario.correo || "";
  document.getElementById("telefono-input").value = usuario.telefono || "";
  document.getElementById("direccion-input").value = usuario.direccion || "";

  // Datos académicos
  document.getElementById("idEstudiante-input").value = usuario.idEstudiante || "";
  document.getElementById("programa-input").value = usuario.programa || "";
  document.getElementById("fechaInicio-input").value = usuario.fechaInicio || "";
  document.getElementById("fechaGraduacion-input").value = usuario.fechaGraduacion || "";
}

// Ejecutar cuando cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  const usuario = getUsuarioLocal();
  cargarPerfil(usuario);
});
