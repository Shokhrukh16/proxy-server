const express = require("express");
const axios = require("axios");
const app = express();

// Use the Render-assigned port (default to 3000 for local dev)
const PORT = process.env.PORT || 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/proxy-image", async (req, res) => {
  const imageUrl = req.query.url;
  if (!imageUrl) {
    return res.status(400).send("Image URL is required");
  }

  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });
    res.set("Content-Type", response.headers["content-type"]);
    res.send(response.data);
  } catch (error) {
    console.error("Error fetching image:", error.message);
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));
