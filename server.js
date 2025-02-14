const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

let dataStore = {}; // Temporary memory storage

// Store data
app.post("/store", (req, res) => {
    const { key, value } = req.body;
    if (!key || !value) return res.status(400).send("Missing key or value");
    dataStore[key] = value;
    res.send({ success: true, stored: { key, value } });
});

// Retrieve data
app.get("/retrieve/:key", (req, res) => {
    const key = req.params.key;
    if (!dataStore[key]) return res.status(404).send("Not found");
    res.send({ success: true, value: dataStore[key] });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
