const express =require ('express');
const app=express();
const path=require('path')
const methodOverride = require('method-override')
const { v4: uuid } = require('uuid');
let comments=[
    {
        id:uuid(),
        username:"Harshit",
        comment: "Reading a Daily Blog is a good thing",
        imgadd:"https://media.istockphoto.com/id/693275072/photo/the-next-best-triumph-could-be-around-the-corner.webp?b=1&s=170667a&w=0&k=20&c=huDAtVrgFXyWgXmdMbNHct2wu7zyQRNDWD2iPHFO05w="
    },
    {
        id:uuid(),
        username:"Rajat",
        comment: "Eat sleep code repeat",
        imgadd:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2fU6VWMdDDAYhNv6NQiHuGeXP3KKtPwVHew&usqp=CAU"
    },
    {
        id:uuid(),
        username:"Raman",
        comment: "A leetcode problem a day remove unemployment away",
        imgadd:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&usqp=CAU"
  
    },
    {
        id:uuid(),
        username:"Yogendra",
        comment: "Web  development is very easy",
        imgadd:"https://media.istockphoto.com/id/1256127007/photo/close-up-portrait-of-his-he-nice-attractive-glad-cheerful-cheery-guy-pointing-forefinger.webp?b=1&s=170667a&w=0&k=20&c=3wxx_FOljVpB6BTWS6F78g6dBU42jrzuInOJrtEBQ0U="
    },
    {
        id:uuid(),
        username:"Saurabh",
        comment: "Reading a Daily Blog is a good thing",
        imgadd:"https://media.istockphoto.com/id/1395880805/photo/indoor-close-up-portrait-of-beauty-asian-indian-serene-young-woman-sitting-near-the-window.webp?b=1&s=170667a&w=0&k=20&c=23cY1qNv9mkjccMZktuioagykwi2npP9wF8MWxzRK00="
    },
]

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.get('/',(req,res)=>{
    res.send("WELCOME TO Blog website")
})


app.get('/blogs',(req,res)=>{
    res.render('index',{comments})
})

app.get('/blog/new',(req,res)=>{
    res.render('new')
})

app.post('/blogs',(req,res)=>{
    
    // console.log(req.body);
    // res.send("data agya")
    let {username,comment}=req.body;
    comments.push({ username, comment ,id:uuid(),imgadd});
    res.redirect('/blogs')
})

app.get('/blogs/:id',(req,res)=>{
    let {id}=req.params;
    
    let foundComment = comments.find(comment=> comment.id == id)
    // console.log(foundComment);
    // console.log("hello");
    res.render('show' , {foundComment} );
})

app.get('/blogs/:id/edit',(req,res)=>{
    let {id}=req.params;
    let foundComment = comments.find(comment=> comment.id == id)
    res.render('edit',{foundComment})
})

app.patch('/blogs/:id' , (req,res)=>{
    let {id} = req.params;
    let foundComment = comments.find(comment=> comment.id == id) 
    let {comment} = req.body;
    foundComment.comment = comment; 
    res.redirect('/blogs');
})

app.delete('/blogs/:id' , (req,res)=>{
    let {id} = req.params;
    let newArray = comments.filter((comment)=>{return comment.id != id })
    comments = newArray;
    res.redirect('/blogs');
})


app.listen(8080,()=>{
    console.log("Port is live at 8080");
})