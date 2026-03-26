export default async function handler(req, res) {
  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (ip && ip.includes(',')) ip = ip.split(',')[0];

  // Send IP to Firebase
  await fetch("https://cdntngangpau.firebaseio.com/ips.json", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      ip: ip,
      time: new Date().toISOString()
    })
  });

  res.status(200).send(`
    <h1>Your IP Address</h1>
    <p>${ip}</p>
  `);
}
