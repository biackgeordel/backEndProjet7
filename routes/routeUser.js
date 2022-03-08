const  express=require('express');
const route=express.Router();
const controllerUser=require('../controllers/controllerUser');
const multer=require('../controllers/multer-config');
auth=require('../controllers/controllerToken');

route.post('/signup',controllerUser.userSignup);
route.post('/login',controllerUser.userLogin)
route.get('/getOne/:id',auth,controllerUser.getOne);
route.put('/updateUser/:id',auth,multer,controllerUser.updateUser);
route.delete('/deleteUser/:user',auth,controllerUser.deleteUser);




module.exports=route;