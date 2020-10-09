const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const axios = require('axios');

app.use(bodyParser.json()); 
app.use(cors({origin: true}));

const posts={}


app.get('/posts',(req,res)=>{
    res.send(posts)
})

app.post('/posts',async (req,res)=>{
    const id = randomBytes(4).toString('hex');
    const {title} = req.body;

    posts[id] = {
        id,title
    };

    //updated
    await axios.post('http://localhost:8085/events',{
        type:'PostCreated',
        data:{
            id,title
        }
    })

    res.status(201).send(posts[id]);  
})

app.post('/events',(req,res)=>{
    console.log('Received Event',req.body.type);

    res.send({});
})

app.listen(8080,()=>{
    console.log("POSTS SERVER RUNNING...");
})