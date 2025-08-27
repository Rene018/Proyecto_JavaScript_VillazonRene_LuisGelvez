async function AgregarUsuario() {
  const form = document.getElementById("formAgregarUsuario");

  form.onsubmit = async function (e) {
    e.preventDefault();

    //====================agarrar los valores====================
    const nombre = document.getElementById("nombre-input").value.trim();
    const correo = document.getElementById("correo-input").value.trim();
    const telefono = document.getElementById("telefono-input").value.trim();
    const direccion = document.getElementById("direccion-input").value.trim();
    const tituloAcademico = document
      .getElementById("tituloAcademico-input")
      .value.trim();
    const tipo = document.getElementById("tipo-input").value.trim();
    const ultimaActividad = new Date().toISOString().split("T")[0];

    //====================crear el objeto====================
    const nuevoUsuario = {
      nombre,
      correo,
      tipo,
      telefono,
      direccion,
      tituloAcademico,
      ultimaActividad,
      cursosInscritos: [],
      cursosDictados: [],
    };

    //====================mandar el objeto====================
    try {
      const response = await fetch(
        "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(nuevoUsuario),
        }
      );

      if (response.ok) {
        // Cerrar modal
        const modalEl = document.getElementById("agregarUsuarioModal");
        const modal =
          bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
        modal.hide();

        // Limpiar formulario
        form.reset();

        // Recargar tabla
        CargarUsuarios();

        alert("Usuario agregado exitosamente");
      } else {
        alert("Error al agregar el usuario");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al agregar el usuario");
    }
  };
}

document.addEventListener("DOMContentLoaded", function () {
  CargarUsuarios();
  AgregarUsuario();
});
