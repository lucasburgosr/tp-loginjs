document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let nombreUsuario = document.getElementById("nombreUsuario").value;
    let password = document.getElementById("password").value;

    let url =
      "http://168.194.207.98:8081/tp/login.php?user=" +
      encodeURIComponent(nombreUsuario) +
      "&pass=" +
      encodeURIComponent(password);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.respuesta === "OK") {
          window.location.href = "lista.html";
        } else {
          alert(data.mje);
        }
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  });
