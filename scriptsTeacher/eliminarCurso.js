
async function eliminarCurso(id) {
  try {
    const response = await fetch(
      `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos/${id}`,
      { method: "DELETE" }
    );

    if (response.ok) {
      alert("Curso eliminado exitosamente");
      const modal = bootstrap.Modal.getInstance(
        document.getElementById("modalEliminar")
      );
      modal.hide();
      CargarCursos(); 
    } else {
      alert("Error al eliminar el curso");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error al eliminar el curso");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  let cursoIdEliminar = null;

  
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("bi-trash3")) {
      cursoIdEliminar = e.target.getAttribute("data-id");

      
      const btnConfirmarEliminar = document.querySelector(
        "#modalEliminar .btn-danger"
      );

      
      btnConfirmarEliminar.onclick = async () => {
        if (cursoIdEliminar) {
          await eliminarCurso(cursoIdEliminar);
          cursoIdEliminar = null;
        }
      };
    }
  });
});
