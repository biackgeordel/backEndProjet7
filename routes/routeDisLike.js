const  express=require('express');
const route=express.Router();
const control=require('../controllers/controllerDisLike');
const auth=require('../controllers/controllerToken');

route.post('/addDisLike',auth,control.addDisLike);
route.delete('/deleteDisLike/:id/:user',auth,control.deleteDisLike);
module.exports=route;