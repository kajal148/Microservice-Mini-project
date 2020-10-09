const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts ={}
  

app.get('/posts',(req,res)=>{
    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type,data} = req.body;

    if(type === 'PostCreated'){
       const {id,title} = data;
       
       posts[id] = {id,title,comments:[]}
    }

    if(type === 'CommentCreated'){
        const {id,content,postId} = data;
        
        const post = posts[postId];
        post.comments.push({id,content});
    }
    console.log(posts);
    res.send({});

});

app.listen(4000, ()=>{
    console.log('Listening at 4000');
})