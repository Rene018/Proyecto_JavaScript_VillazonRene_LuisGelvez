const btnAgregar = document.getElementById("agregar-btn");
const listaMateriales = document.getElementById("lista-materiales");

btnAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre-input").value.trim();
  const link = document.getElementById("link-input").value.trim();

  if (nombre && link) {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-center";

    li.innerHTML = `
          <span><strong>${nombre}:</strong> <a href="${link}" target="_blank">${link}</a></span>
          <button class="btn btn-sm"><i class="bi bi-trash3 text-danger"></i></button>
        `;

    // Acción para eliminar material
    li.querySelector("button").addEventListener("click", () => {
      li.remove();
    });

    listaMateriales.appendChild(li);

    // limpiar inputs
    document.getElementById("nombre-input").value = "";
    document.getElementById("link-input").value = "";
  }
});