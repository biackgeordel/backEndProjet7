const  express=require('express');
const route=express.Router();
const control=require('../controllers/controlllerLike');
const auth=require('../controllers/controllerToken');

route.post('/addLike',auth,control.addLike);
route.delete('/delete/:id/:user',auth,control.deleteLike);
module.exports=route;