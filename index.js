const express = require("express");
const cors = require("cors");
const { default: axios } = require("axios");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

const PORT = 3001 || process.env.PORT;

app.get("/", (req, res) => {
  res.send("hello there");
});

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      {
        username: username,
        secret: username,
        first_name: username,
      },
      {
        headers: { "PRIVATE-KEY": process.env.PRIVATE_KEY },
      }
    );

    res.status(r.status).json(r.data);
  } catch (err) {
    res.status(err.response.status).json(err.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running ${PORT}`);
});
