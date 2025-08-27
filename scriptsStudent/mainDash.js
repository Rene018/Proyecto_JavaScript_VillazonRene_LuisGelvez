async function fetchdata(enp, cont) {
  const url = new URL(enp);
  url.searchParams.append("estado", "Activo");
  fetch(url, {
    method: "GET",
    headers: { "content-type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data.length);
      document.getElementById(cont).textContent = data.length;
    });
} 
async function cargarAll() {
  await fetchdata(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos",
    "cant-cursos"
  );
  await fetchdata(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=Docente",
    "cant-docentes"
  );
  await fetchdata(
    "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=Estudiante",
    "cant-estudiantes"
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  document
    .querySelectorAll(".dropdown-name")
    .forEach((el) => (el.textContent = usuario["nombre"]));
  document
    .querySelectorAll(".dropdown-correo")
    .forEach((el) => (el.textContent = usuario["correo"]));

  document.getElementById("btnLogout").addEventListener("click", function () {
    localStorage.removeItem("usuario");
    window.location.href = "../../index.html";
  });

  //===============================000===============================//
  cargarAll()
});
