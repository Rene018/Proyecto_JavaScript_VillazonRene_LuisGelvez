// Obtener un usuario por ID
async function GetUsuario(id) {
  const response = await fetch(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/" + id
  );
  const data = await response.json();
  return data;
}

// Rellenar el modal con los datos del usuario
async function cargarUsuarioEnFormulario(usuario) {
  document.getElementById("edit-nombre").value = usuario.nombre;
  document.getElementById("edit-correo").value = usuario.correo;
  document.getElementById("edit-telefono").value = usuario.telefono;
  document.getElementById("edit-direccion").value = usuario.direccion;
  document.getElementById("edit-tituloAcademico").value =
    usuario.tituloAcademico || "";
  document.getElementById("edit-tipo").value = usuario.tipo;
}

// Editar usuario
async function editarUsuario(id, usuarioOriginal) {
  const usuarioActualizado = {
    nombre: document.getElementById("edit-nombre").value,
    correo: document.getElementById("edit-correo").value,
    telefono: document.getElementById("edit-telefono").value,
    direccion: document.getElementById("edit-direccion").value,
    tituloAcademico: document.getElementById("edit-tituloAcademico").value,
    tipo: document.getElementById("edit-tipo").value,
    // mantener valores originales
    password: usuarioOriginal.password,
    ultimaActividad: usuarioOriginal.ultimaActividad,
    cursosInscritos: usuarioOriginal.cursosInscritos,
    cursosDictados: usuarioOriginal.cursosDictados,
  };

  try {
    const response = await fetch(
      `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users/${id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      }
    );

    if (response.ok) {
      alert("Usuario actualizado exitosamente");
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("editarUsuarioModal")
      );
      modal.hide();
      CargarUsuarios(); // recarga la tabla
    } else {
      alert("Error al actualizar el usuario");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al actualizar el usuario");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("click", async (e) => {
    if (e.target.classList.contains("edit-user")) {
      const id = e.target.getAttribute("data-id");
      const usuario = await GetUsuario(id);

      cargarUsuarioEnFormulario(usuario);

      
      const formEdit = document.getElementById("formEditarUsuario");
      formEdit.onsubmit = async (ev) => {
        ev.preventDefault();
        await editarUsuario(id, usuario);
      };
    }
  });
});
