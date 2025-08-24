<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Prueba de Envío a WhatsApp</title>
</head>
<body>
  <h1>Prueba de Envío a WhatsApp</h1>
  <p>Haz clic para enviar mensaje al número <strong>+52 462 187 2594</strong></p>
  <button onclick="enviar()">Enviar mensaje</button>

  <script>
    function enviar() {
      fetch("https://vdc360-proxy-xeom.vercel.app/api/mensaje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          telefono: "+524621872594",
          mensaje: "⚙️ Mensaje de prueba desde el sistema VDC 360°"
        })
      })
      .then(response => response.json())
      .then(data => {
        alert("Mensaje enviado correctamente ✅");
        console.log(data);
      })
      .catch(error => {
        alert("Error al enviar mensaje ❌: " + error);
        console.error(error);
      });
    }
  </script>
</body>
</html>
