import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/api/ip", async (req, res) => {
  let ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
  if (ip && ip.includes(",")) ip = ip.split(",")[0];

  await fetch("https://YOUR_PROJECT_ID.firebaseio.com/ips.json", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ip: ip, time: new Date().toISOString() })
  });

  res.send(`<h1>Your IP Address</h1><p>${ip}</p>`);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
