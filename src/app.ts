import express from "express";

const app = express();

// Allows parsing of json in the body of the request.
app.use(express.json());

app.get("/", function (_req, res) {
    return res.send("This is just the backend for TODO test app");
});


export default app;
