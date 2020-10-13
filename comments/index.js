const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const axios = require('axios');

app.use(bodyParser.json());
app.use(cors({origin: true})); 

const commentsByPostId={};

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',async (req,res)=>{
    const commentsId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id:commentsId,content
    });

    commentsByPostId[req.params.id] = comments;

    //updated
    await axios.post('http://localhost:8085/events',{
        type:'CommentCreated',
        data:{
            id:commentsId,
            content,
            postId: req.params.id,
            status:'pending'
        }
    })

    res.status(201).send(comments);
    
})


app.post('/events',(req,res)=>{
    console.log('Received Event',req.body.type);

    res.send({});
})


app.listen(8081,()=>{
    console.log("COMMENTS SERVER RUNNING...");
})