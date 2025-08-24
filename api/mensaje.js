export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const { numero, mensaje } = req.body;

  if (!numero || !mensaje) {
    return res.status(400).json({ error: 'Faltan datos: número o mensaje' });
  }

  try {
    const response = await fetch('https://backend.aisensy.com/campaigns/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YWI1OTJlZWRkNDM0MGMyOGEwNzdmNiIsIm5hbWUiOiJOb3RpZmljYWNpb25lc1ZEQzM2MCIsImFwcE5hbWUiOiJBaVNlbnN5IiwiY2xpZW50SWQiOiI2OGFiNTdkOGVkZDQzNDBjMjhhMDUyNDciLCJhY3RpdmVQbGFuIjoiRlJFRV9GT1JFVkVSIiwiaWF0IjoxNzU2MDU5OTUwfQ.hfrN4s8u7IPA21IGi36vviFaq4ZPd12TusgfsHZKVf0'
      },
      body: JSON.stringify({
        phone: numero,
        message: mensaje
      })
    });

    const data = await response.json();
    return res.status(200).json({ success: true, data });
  } catch (error) {
    return res.status(500).json({ error: 'Error al enviar el mensaje', details: error.message });
  }
}
Crear endpoint /api/mensaje


