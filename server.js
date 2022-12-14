const express = require('express');
const app = express();
const port = 3000;
const showRouter = require('./routes/show');
const userRouter = require('./routes/user');
const { db } = require('./db');
const seed = require('./seed');


app.get('/', (req, res) => {
    res.send("Root Path Get Endpoint successfully running");
})

app.use('/show', showRouter);
app.use('/user', userRouter);

app.listen(port, () => {
    db.sync();
    console.log(`Server listening on  http://localhost:${port}`);
})