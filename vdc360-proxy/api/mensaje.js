<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Formulario Producción VDC 360°</title>
  <style>
    body {
      font-family: sans-serif;
      background: #eee;
      padding: 20px;
    }
    h1 {
      text-align: center;
    }
    .bloque {
      background: white;
      padding: 20px;
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .bloque h2 {
      color: green;
    }
    input {
      width: 100%;
      padding: 10px;
      margin: 5px 0 15px 0;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
    button {
      background: green;
      color: white;
      border: none;
      padding: 10px;
      width: 100%;
      border-radius: 5px;
      cursor: pointer;
      font-weight: bold;
    }
    .icono {
      margin-right: 8px;
    }
  </style>
</head>
<body>
  <h1>Formulario Producción VDC 360°</h1>

  <div class="bloque">
    <h2>Apertura de Camión</h2>
    <label>Hora de apertura:</label>
    <input type="time" id="hora_apertura" />
    <button onclick="enviarMensaje('Apertura de camión', document.getElementById('hora_apertura').value)">
      📩 Guardar y Enviar
    </button>
  </div>

  <div class="bloque">
    <h2>Registro de Patas</h2>
    <label>Hora de envío a limpieza:</label>
    <input type="time" id="hora_envio_patas" />
    <label>Hora de llegada de limpieza:</label>
    <input type="time" id="hora_llegada_patas" />
    <button onclick="enviarMensajePatas()">📩 Guardar y Enviar</button>
  </div>

  <script>
    const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWI1OTJlZWRkNDM0MGMyOGEwNzdmNiIsIm5hbWUiOiJOb3RpZmljYWNpb25lc1ZEQzM2MCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2OGFiNTdkOGVkZDQzNDBjMjhhMDUyNDciLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzU2MDU5OTUwfQ.hfrN4s8u7IPA21IGi36vviFaq4ZPd12TusgfsHZKVf0";

    const numerosDestino = [
      "+524621872594", // Tú
      "+524621391119", // Tu papá
      "+524621521152"  // Fabiola
    ];

    function enviarMensaje(titulo, hora) {
      const texto = `🚛 ${titulo} registrada a las ${hora}`;
      numerosDestino.forEach(numero => {
        fetch("https://backend.aisensy.com/campaign/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            campaignName: "Notificacionesvdc360",
            destination: numero,
            userName: "Marciano",
            templateParams: { message: texto }
          })
        })
        .then(res => res.json())
        .then(data => console.log("Mensaje enviado:", data))
        .catch(err => console.error("Error al enviar:", err));
      });
    }

    function enviarMensajePatas() {
      const horaEnvio = document.getElementById("hora_envio_patas").value;
      const horaLlegada = document.getElementById("hora_llegada_patas").value;
      const texto = `🦵 Registro de patas:\n- Envío: ${horaEnvio}\n- Llegada: ${horaLlegada}`;
      numerosDestino.forEach(numero => {
        fetch("https://backend.aisensy.com/campaign/message", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
          },
          body: JSON.stringify({
            campaignName: "Notificacionesvdc360",
            destination: numero,
            userName: "Marciano",
            templateParams: { message: texto }
          })
        })
        .then(res => res.json())
        .then(data => console.log("Mensaje enviado:", data))
        .catch(err => console.error("Error al enviar:", err));
      });
    }
  </script>
</body>
</html>
