export default async function handler(req, res) {
  // CORS para permitir solicitudes desde navegador
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { telefono, mensaje } = req.body;

  try {
    const response = await fetch("https://backend.aisensy.com/campaign/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWI1OTJlZWRkNDM0MGMyOGEwNzdmNiIsIm5hbWUiOiJOb3RpZmljYWNpb25lc1ZEQzM2MCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2OGFiNTdkOGVkZDQzNDBjMjhhMDUyNDciLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzU2MDU5OTUwfQ.hfrN4s8u7IPA21IGi36vviFaq4ZPd12TusgfsHZKVf0"
      },
      body: JSON.stringify({
        campaignName: "Notificacionesvdc360",
        destination: telefono,
        userName: "VDC 360",
        templateParams: [mensaje],
        source: "marcianoper"
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al enviar mensaje" });
  }
}
