async function subConsulta(id) {
  const response = await fetch(
    `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?id=${id}`
  );
  const data = await response.json();
  return data[0];
}
async function cargarDocentes() {
  const response = await fetch(
    `https://68abc0057a0bbe92cbb82d40.mockapi.io/lms/users?tipo=${"Docente"}`
  );
  const data = await response.json();
  return data;
}