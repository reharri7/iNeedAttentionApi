const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    next();
})

app.get('/', (req, res)=> {
    res.send('This is working');
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});