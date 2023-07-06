const express = require("express");
const fs = require("fs");
const http = require("http");
const path = require("path");

const PORT = 3000;

const app = express();
const httpServer = http.createServer(app);

app.use(express.static(path.join(__dirname, '../build')));

httpServer.listen(PORT);

