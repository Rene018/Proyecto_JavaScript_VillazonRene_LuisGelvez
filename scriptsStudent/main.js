let preguntaCount = 1;

document.getElementById("addPreguntaBtn").addEventListener("click", () => {
  preguntaCount++;

  const preguntasDiv = document.getElementById("preguntas");

  const nuevaPregunta = document.createElement("div");
  nuevaPregunta.classList.add("pregunta", "mb-3");
  nuevaPregunta.id = `pregunta${preguntaCount}`;

  nuevaPregunta.innerHTML = `
    <div class="col-12 mb-2">
      <label for="pregunta-input-${preguntaCount}" class="form-label">Pregunta ${preguntaCount}</label>
      <input type="text" class="form-control" id="pregunta-input-${preguntaCount}" 
        placeholder="Escribe tu pregunta aquí..." />
    </div>

    <div class="input-group mb-2">
      <div class="input-group-text">
        <input type="checkbox">
      </div>
      <input type="text" class="form-control" placeholder="Opción 1">
    </div>

    <div class="input-group mb-2">
      <div class="input-group-text">
        <input type="checkbox">
      </div>
      <input type="text" class="form-control" placeholder="Opción 2">
    </div>

    <div class="input-group mb-2">
      <div class="input-group-text">
        <input type="checkbox">
      </div>
      <input type="text" class="form-control" placeholder="Opción 3">
    </div>

    <div class="input-group mb-2">
      <div class="input-group-text">
        <input type="checkbox">
      </div>
      <input type="text" class="form-control" placeholder="Opción 4">
    </div>
  `;

  preguntasDiv.appendChild(nuevaPregunta);
});

//https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users
//https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/cursos