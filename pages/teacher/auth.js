function checkAuth(rolPermitido = "Docente") {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "../../index.html";
    return;
  }

  if (!rolPermitido == usuario.tipo) {
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

  document.getElementById("btnPerfil").addEventListener("click", function () {
    localStorage.removeItem("usuario");
    window.location.href = "../../index.html";
  });
document.querySelectorAll('btnPerfil').forEach(()=>{
  
})
  //===============================000===============================//
  checkAuth()
});