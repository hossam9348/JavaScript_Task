const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
const wordsRouter = require('./routes/words');
const rankRouter = require('./routes/rank');
require("dotenv").config();
const PORT = process.env.PORT;

//  express app listening
app.listen(PORT, (err) => {
    if (!err) return console.log(`server is running at http://localhost:${PORT} .....`);
    console.log(err);
})

//cors
app.use(cors({
    origin: [process.env.FRONTEND_URL,]
}));

// routes
app.get('/', (req, res)=>{
    res.send({ "message": "Hello, World!" })
})
app.use('/words', wordsRouter);
app.use('/rank', rankRouter);   



   


    