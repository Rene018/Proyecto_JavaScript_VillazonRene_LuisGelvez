document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("formLogin")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const usuario = document.getElementById("usuario").value;
      const password = document.getElementById("password").value;

      let valid = true;

      if (usuario.trim() === "") {
        document
          .querySelector("#usuario + .text-danger")
          .classList.remove("d-none");
        valid = false;
      } else {
        document
          .querySelector("#usuario + .text-danger")
          .classList.add("d-none");
      }

      if (password.trim() === "") {
        document
          .querySelector("#password + .text-danger")
          .classList.remove("d-none");
        valid = false;
      } else {
        document
          .querySelector("#password + .text-danger")
          .classList.add("d-none");
      }

      if (valid) {
        const url = new URL(
          "https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users"
        );
        url.searchParams.append("correo", usuario);
        url.searchParams.append("password", password);
        console.log(url);
        fetch(url, {
          method: "GET",
          headers: { "content-type": "application/json" },
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            if (data.length > 0) {
              const user = data[0];
              localStorage.setItem("usuario", JSON.stringify(data[0])); 
              if (user["tipo"] == "Estudiante") {
                window.location.href = "./pages/student/dashboard.html";
              } else if (user["tipo"] == "Docente") {
                window.location.href = "./pages/teacher/dashboard.html";
              } else if (user["tipo"] == "Administrador") {
                window.location.href = "./pages/admin/dashboard.html";
              }
            } else {
            }
          });
      }
    });
});
