const sequelize=require('../database');
const like=require('../models/like');
const user=require('../models/user');
//function pour ajouter les like
exports.addLike=(req,res,next)=>{
    sequelize.sync().then(async()=>{
      const test=await like.findOne({
          where:{
            MessageId:req.body.MessageId,
            UserId:req.body.UserId

          }});
          console.log(test);
          if(!test){
            like.create({
                MessageId:req.body.MessageId,
               UserId:req.body.UserId
        
            }).then((likes)=>{
                like.findByPk(likes.id,{
                    include:[{
                        model:user,
                        attributes:['username']
                    }]
                }).then(likeExist=>{
                    res.status(200).json(likeExist);
                }).catch(error=>{
                    console.log(error);
                })
   
            }).catch(error=>{
              console.log(error);
                
            })
          }else if(test){
             return  res.status(202).json({like:0});
          }

    }
    ).catch(error=>{
        console.log(error);
    });


};
//function pour supprimer un like
exports.deleteLike=(req,res,next)=>{
    console.log(req.params.id);
    console.log(req.params.user);
    like.destroy({
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