const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios')

const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events',(req,res)=>{
    const event = req.body;

    events.push(event);
    
    axios.post('http://localhost:8080/events',event);
    axios.post('http://localhost:8081/events',event);
    axios.post('http://localhost:4000/events',event); 
    axios.post('http://localhost:8083/events',event);

    res.send({status:'OK'});

});

app.get("/events",(req,res)=>{
    res.send(events);
})


app.listen(8085,()=>{
    console.log('LISTENING ON EVENTBUS')
})