const express = require("express");

//Top
const app = express();

const cats = ['JSON', 'XML', 'Cat cat = new Cat()'];

const logger = (req,res, next) => {
console.log("Host: ", req.hostname);
console.log("Method: ", req.method);
console.log("Path: ", req.path);
next();
}

app.use(logger);


app.use(express.json());

app.get('/getAll', (req,res) => {res.json(cats)});

app.post('/create',(req,res) =>{cats.push(req.body.name);
res.status(201).json(cats[cats.length-1]);});

app.delete('/remove/:id', (req,res) =>
{
    const {id} = req.params;
    const deadCat = cats.splice(id,1);
    res.status(200).json(deadCat);
})

app.patch('/update/:id', (req,res,next) =>
{
    const {id} = req.params;
    const {name} = req.query;
    if(id >= cats.length){
        return next({msg:`ERROR: out of bounds: ${id}`,status:404});
    }
    cats[id] = name; 
    res.status(200).json(cats[id]);
})


app.use((err,req,res,next) =>
{
    res.status(err.status).send(err.msg);
})





//🥺
const server = app.listen(40400, () =>
  console.log(`Server started on ${server.address().port}`)
);
