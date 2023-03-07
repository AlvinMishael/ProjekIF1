import express from 'express';
import path, { resolve } from 'path';
import bodyParser from 'body-parser';

const port = 8080;
const app = express();
app.set('view engine','ejs');

app.use(express.static(path.resolve('public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(port,()=>{
    console.log('running on port 8080');
});

app.get('/',async(req,res)=>{
    res.render('prompt')
});

app.get('/survey',async(req,res)=>{
    res.render('survey')
});

app.post('/survey',async(req,res)=>{
    let name = req.body.name;
    let age = req.body.age;
    let fruit = req.body.favoriteFruit;

    console.log(name)
    console.log(age)
    console.log(fruit)
    res.render('Res')
});


