// Obtener usuario por ID
async function GetUsuario(id) {
  const response = await fetch("https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id);
  return await response.json();
}

// Actualizar usuario en la API (PUT)
async function UpdateUsuario(id, usuarioActualizado) {
  const response = await fetch("https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioActualizado),
  });
  return await response.json();
}

// Cargar datos en el modal de edición
async function cargarUsuarioEditar(usuario) {
  document.getElementById("editarNombre").value = usuario.nombre || "";
  document.getElementById("editarCorreo").value = usuario.correo || "";
  document.getElementById("editarTelefono").value = usuario.telefono || "";
  document.getElementById("editarDireccion").value = usuario.direccion || "";
  document.getElementById("editarTituloAcademico").value = usuario.tituloAcademico || "";
  document.getElementById("editarTipo").value = usuario.tipo || "Estudiante";
}

// Listener para abrir el modal y cargar datos
document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("editar-student")) {
    const id = e.target.getAttribute("data-id");
    const usuario = await GetUsuario(id);

    // Guardamos el id en el modal para usarlo después
    document.getElementById("formEditarEstudiante").setAttribute("data-id", id);

    await cargarUsuarioEditar(usuario);

    const modalEditar = new bootstrap.Modal(document.getElementById("modalEditar"));
    modalEditar.show();
  }
});

// Listener para guardar cambios
document.getElementById("formEditarEstudiante").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = e.target.getAttribute("data-id");

  const usuarioActualizado = {
    nombre: document.getElementById("editarNombre").value,
    correo: document.getElementById("editarCorreo").value,
    telefono: document.getElementById("editarTelefono").value,
    direccion: document.getElementById("editarDireccion").value,
    tituloAcademico: document.getElementById("editarTituloAcademico").value,
    tipo: document.getElementById("editarTipo").value,
  };

  await UpdateUsuario(id, usuarioActualizado);

  
  const modalEditar = bootstrap.Modal.getInstance(document.getElementById("modalEditar"));
  modalEditar.hide();

  alert("Estudiante actualizado con éxito");
});
