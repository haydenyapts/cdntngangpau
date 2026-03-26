import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

// Your API route
app.get("/api/ip", async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip && ip.includes(",")) ip = ip.split(",")[0];

  // Replace with your Firebase project ID
  await fetch("https://cdntngangpau.firebaseio.com/ips.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip: ip, time: new Date().toISOString() })
  });

  res.send(`<h1>Your IP Address</h1><p>${ip}</p>`);
});

// Optional homepage
app.get("/", (req, res) => {
  res.send(`<h1>IP Logger</h1><p>Go to <a href="/api/ip">/api/ip</a> to log your IP.</p>`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
