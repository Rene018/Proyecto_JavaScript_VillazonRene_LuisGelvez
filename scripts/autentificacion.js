function checkAuth(rolPermitido = "") {
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  if (!usuario) {
    window.location.href = "./index.html";
    return;
  }

  if (!rolPermitido == usuario.tipo) {
    window.location.href = "./dashboard.html";
    return;
  }
}