const express=require('express');
const sequelize=require('./database');
const app=express();
const routeUser=require('./routes/routeUser');
const routeMsg=require('./routes/routesMsg');
const routeCommentaire=require('./routes/routeCommentaire');
const routeLike=require('./routes/routeLike');
const routeDisLike=require('./routes/routeDisLike');
const path=require('path');
const helmet=require('helmet');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


//on teste la connection à la base de données
sequelize.authenticate().then(()=>{
  console.log("connection la base de données ok");
  //on crée tous les tables s'ils n'existe pas 
  sequelize.sync();
}).catch(error=>{
  console.log(error);
});



app.use(express.json());

app.use('/images',express.static(path.join(__dirname, 'images')));
app.use(helmet());
app.use('/api/auth',routeMsg);
app.use('/api/auth',routeUser);
app.use('/api/auth',routeCommentaire);
app.use('/api/auth',routeLike);
app.use('/api/auth',routeDisLike);






module.exports=app;



