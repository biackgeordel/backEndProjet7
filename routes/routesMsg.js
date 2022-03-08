const  express=require('express');
const route=express.Router();
const control=require('../controllers/controllersMsg');
const multer=require('../controllers/multer-config');
const auth=require('../controllers/controllerToken');

route.post('/created',multer,auth,control.createdMessage);
route.get('/allmessage',control.getAllMessage);
route.get('/oneMessage/:id',control.getOneMessage);
route.delete('/deleteMessage/:id/:user',auth,control.deleteMessage);

module.exports=route;