const express = require("express");
const bodyParser = require("body-parser");
const port = 3000;
const app = express();


//middleware
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var users = [
    { id: 1, username: 'admin', age: '12' },
    { id: 2, username: 'vinit', age: '30' },
    { id: 3, username: 'rohan', age: '40' }
];
function login(req, res, next){
    const userName = req.body.userName;
    const password = req.body.password;
    if(userName != 'vinitk' || password != 12345){
        res.status(403).json({ message: 'Password is incorrect'});
        return; // early returning
    }
    next();
}
let numberOFRequests = 0;
function calculateRequest(req, res, next){
    numberOFRequests += 1; next();
    console.log(`[Request count]: ${numberOFRequests}`)
}
app.use(calculateRequest); // middleware that needed to be called for every request
app.get("/", (req, response) => {
    response.send("Active");
})
app.post("/login", login, (req, response) => {
    
    response.json({ message: 'Welcome here' });
})
app.get("/users", (req, response) => {
    response.json(users);
})
app.get("/user", (req, response) => {
    const id = req.query.id;
    const user = users.find(user => user.id == id);
    response.json(user);
})
app.post("/user", (req, response) => {
    const newUser = { id: Math.floor(Math.random()), username: req.body.username, age: req.body.age };
    users.push(newUser);
    response.json(users);
})
app.put("/user", (req, response) => {
    const id = req.body.id;
    const username = req.body.username;
    const age= req.body.age;
    for(let i = 0; i < users.length; i++) {
        if(users[i].id == id){
            if(username!= undefined) users[i].username = username;
            if(age!= undefined) users[i].age = age;
        }
    }
    response.json(users);
})

app.listen(port, () => {
    console.log(`listening on port ${port}`);
})