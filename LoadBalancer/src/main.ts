import express from 'express';
import httpProxy from 'http-proxy';

const app = express();
const proxy = httpProxy.createProxyServer();
const PORT = process.env.PORT || 80; // Puerto del balanceador de carga

// URLs de los microservicios backend (estos son los nombres de los servicios en Docker Compose)
const targets = [
  'http://backend-1:3000',
  'http://backend-2:3000',
  'http://backend-3:3000',
];

let currentTargetIndex = 0;

app.all('*', (req, res) => {
  // Selecciona el siguiente objetivo en modo round robin
  const target = targets[currentTargetIndex];
  currentTargetIndex = (currentTargetIndex + 1) % targets.length;

  console.log(`Proxying request to: ${target}${req.url}`);

  // Redirige la solicitud al microservicio seleccionado
  proxy.web(req, res, { target: target }, (err) => {
    console.error('Proxy error:', err);
    res.status(500).send('Load Balancer Error');
  });
});

app.listen(PORT, () => {
  console.log(`Load Balancer running on http://localhost:${PORT}`);
  console.log(`Backend targets: ${targets.join(', ')}`);
});