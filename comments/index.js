const express = require('express');
const {randomBytes} = require('crypto');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors({origin: true})); 

const commentsByPostId={};

app.get('/posts/:id/comments',(req,res)=>{
    res.send(commentsByPostId[req.params.id] || []);
})

app.post('/posts/:id/comments',(req,res)=>{
    const commentsId = randomBytes(4).toString('hex');
    const {content} = req.body;

    const comments = commentsByPostId[req.params.id] || [];

    comments.push({
        id:commentsId,content
    });

    commentsByPostId[req.params.id] = comments;

    res.status(201).send(comments);
    
})

app.listen(8081,()=>{
    console.log("COMMENTS SERVER RUNNING...");
})