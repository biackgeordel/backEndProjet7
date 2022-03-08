const  express=require('express');
const route=express.Router();
const control=require('../controllers/controllerCommentaire');
const auth=require('../controllers/controllerToken');

route.post('/addCommentaire',auth,control.createdCommentaire);
route.get('/oneCommentaire/:id',control.getOneCommentaire);
route.get('/allCommentaire',control.getAllCommentaire);
module.exports=route;