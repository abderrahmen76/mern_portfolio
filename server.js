const express = require("express");
const app = express();
require("dotenv").config();
const dbConfig = require("./config/dbConfig"); // Case-sensitive

const portfolioRoute = require("./routes/portfolioRoutes");
app.use(express.json());
app.use("/api/portfolio", portfolioRoute);

const port = process.env.PORT || 5000;
const path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/my_portfolio/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/my_portfolio/build/index.html"));
  });
}
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
