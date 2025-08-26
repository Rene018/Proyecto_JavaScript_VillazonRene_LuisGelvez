function checkAuth(rolPermitido = "Estudiante") {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  console.log(usuario);

  if (!usuario) {
    window.location.href = "../../index.html";
    return;
  }

  if (rolPermitido != usuario.tipo) {
    window.location.href = "./dashboard.html";
    return;
  }
}
document.addEventListener('DOMContentLoaded',function () {
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
  checkAuth()
});


