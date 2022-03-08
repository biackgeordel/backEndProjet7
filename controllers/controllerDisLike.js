
const sequelize=require('../database');
const DisLike = require('../models/dislike');
exports.addDisLike=(req,res,next)=>{
    sequelize.sync().then(async()=>{
       const test=await DisLike.findOne({
            where:{
                MessageId:req.body.MessageId,
                 UserId:req.body.UserId  
            }
        });
        if(!test){
            DisLike.create({
                MessageId:req.body.MessageId,
               UserId:req.body.UserId
        
            }).then(disLike=>{
                console.log(disLike);
           
                res.status(200).json(disLike);
            
            }).catch(error=>{
              console.log(error);
                
            })

        }else if(test){
            return res.status(202).json({dislike:0});
        }
     
    }
    ).catch(error=>{
        console.log(error);
    });


};
exports.deleteDisLike=(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.params.user);
    DisLike.destroy({
        where:{
            UserId:req.params.user,
            id:req.params.id
        }
    }).then(response=>{
        console.log(response)
      
        res.status(200).json(response);
    }).catch(error=>{
        console.log(error);
    });
}
