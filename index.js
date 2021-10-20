const fs = require("fs");
const express = require('express');
const app = express();
const cors = require('cors')
const serverRoutes = require("./routes");
const path = require("path")
const PORT = 8080;

app.use("/html", express.static(path.join(__dirname,"public")));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    console.log("En la raiz del server");
    res.send(true);
});

serverRoutes(app);

const server = app.listen(PORT, () => {
    console.log(`Servidor funcionando en la URL http://localhost:${PORT}`);
})














