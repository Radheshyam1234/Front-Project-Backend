const express = require("express");
const app = express();
const cors = require("cors");
const { initializeConnection } = require("./database/databaseConnection");

app.use(express.json());
app.use(cors());
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 8080;
initializeConnection();

app.get("/", (req, res) => {
  res.send("Hello from backend");
});

app.use("/products", require("./routes/products"));
app.use("/users", require("./routes/user"));
app.use("/wishlist", require("./routes/wishlist"));
app.use("/cart", require("./routes/cart"));
app.use("/addresses", require("./routes/address"));
app.use("/videos", require("./routes/videos"));
app.use("/playlist", require("./routes/playlist"));
app.use("/notes", require("./routes/notes"));

app.listen(process.env.PORT || PORT, () => {
  console.log(`listening to port 8080`);
});
