const jwt=require('jsonwebtoken');
module.exports=(req,res,next)=>{
        const auth=(req.headers.authorization);
        let userId="";
        if(req.body.message){
            console.log("mon id");
            userId=JSON.parse(req.body.message).idUser;

        }else{
            userId=req.body.UserId ||req.params.user ||req.params.id;  
        }
        console.log('mon id iduser:');
        console.log(userId);
        console.log("mon token");
        console.log(auth);
        jwt.verify(auth,'RANDOM_TOKEN_SECRET',(error,tabToken)=>{
            if(!error){
                if(tabToken.id===userId){
                    console.log("vous etes authentifié");
                    next();
                }
            }else{
                res.status(401).json(error);
            }
        

        });
      

 


}