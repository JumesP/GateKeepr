require('dotenv').config();

const express = require('express');
const router = express.Router();
const env = process.env;

const app = express();

app.use(express.static(__dirname + '/public'));

router.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
// Routes
const authRouter = require("./src/routes/authRoutes");
app.use("/auth", authRouter);

})
