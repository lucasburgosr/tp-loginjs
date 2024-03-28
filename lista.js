window.addEventListener("DOMContentLoaded", () => {
  fetchData("");

  document.getElementById("botonBuscar").addEventListener("click", () => {
    let searchValue = document.getElementById("barraBusqueda").value;
    fetchData(searchValue);
  });
});

// Esta función obtiene los datos del servidor
function fetchData(searchValue) {
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BUSCAR&usuario=" +
    encodeURIComponent(searchValue);

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      renderDataGrid(data);
    })
    .catch((error) => {
      console.error("Error al obtener los datos:", error);
    });
}

// Renderiza datos en la tabla
function renderDataGrid(data) {
  let tabla = document.getElementById("dataGrid");
  tabla.innerHTML = "";

  if (data.length === 0) {
    let row = tabla.insertRow();
    let cell = row.insertCell();
    cell.colSpan = "7";
    cell.appendChild(document.createTextNode("No se encontraron resultados."));
    return;
  }

  // Crea los encabezados de columna
  let headers = Object.keys(data[0]);
  headers.push("Bloquear/Desbloquear");
  let headerRow = tabla.insertRow();
  headers.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  // Llena la tabla con datos
  data.forEach((obj) => {
    let row = tabla.insertRow();
    headers.forEach((header) => {
      let cell = row.insertCell();
      if (header === "Bloquear/Desbloquear") {
        let blockButton = document.createElement("button");
        blockButton.textContent =
          obj["bloqueado"] === "N" ? "Bloquear" : "Desbloquear";
        blockButton.classList.add("blockButton");
        blockButton.addEventListener("click", () => {
          toggleBlockStatus(obj["id"], obj["bloqueado"]);
        });
        cell.appendChild(blockButton);
      } else {
        cell.textContent = obj[header];
      }
    });
    row.classList.add(obj["bloqueado"] === "N" ? "desbloqueado" : "bloqueado");
  });
}

// Alterna el estado de bloqueo/desbloqueo de un usuario
function toggleBlockStatus(userId, currentState) {
  let newState = currentState === "N" ? "Y" : "N";
  let url =
    "http://168.194.207.98:8081/tp/lista.php?action=BLOQUEAR&idUser=" +
    userId +
    "&estado=" +
    newState;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      fetchData(document.getElementById("barraBusqueda").value);
    })
    .catch((error) => {
      console.error("Error al cambiar el estado de bloqueo:", error);
    });
}
