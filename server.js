const express = require('express');
//const bodyParser = require('body-parser');

const app = express();

const db = {
    users :[
        {
            id: '1',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
    ]
}

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use((req, res, next) => {
    next();
})

app.get('/', (req, res)=> {
    res.send('This is working');
});

app.post('/signin', (req, res) => {
    if( req.body.email === db.users[0].email && 
        req.body.password === db.users[0].password){
            res.json('success');
        }else{
            res.status(400).json('error logging in');
        }
});

app.post('/register', (req, res) => {
    const { email, name, password } = req.body;
    db.users.push(
        {
            id: db.users.length + 1,
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        }
    );
    res.json(db.users[db.users.length - 1]);
});

app.get('/profile/:id', (req, res) => {
    const { id } = req.params;
    let found = false;
    db.users.forEach(user => {
        if(user.id === id) {
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('user not found');
    }
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});