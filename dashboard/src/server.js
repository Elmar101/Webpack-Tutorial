const express = require("express");
const path = require("path");
const fs = require('fs');   
const app = express();
const PORT = 9000;

// Statik faylları təqdim et
app.use("/",express.static(path.resolve(__dirname, "../dist")));

// History API Fallback (SPA üçün)
app.get("*", (req, res) => {
  const pathToHtmlFile = path.resolve(__dirname, "../dist/dashboard.html");
  const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, "utf8");
  res.send(contentFromHtmlFile);
});

// Serveri işə sal
app.listen(PORT, () => {
  console.log(`Dashboard is running on http://localhost:${PORT}`);
});
