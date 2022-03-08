const sequelize=require('../database');
const commentaire=require('../models/commentaire');
const Message = require('../models/message');
const User = require('../models/user');
exports.createdCommentaire=(req,res,next)=>{
  
  //  console.log(req.body);
sequelize.sync().then(()=>{
    commentaire.create({
        description:req.body.description,
        MessageId:req.body.MessageId,
       UserId:req.body.UserId,
       dateCommentaire:req.body.date

    },
 
    ).then((comments)=>{
      if(comments.id){
        commentaire.findByPk(comments.id,{
         include:[{
             model:User,
             attributes:['username','urlImage']
             }]
          }).then(comments=>{
             res.status(201).json(comments)
            }).catch(error=>{
                console.log(error)
            })
       }
       }).catch(error=>{
           console.log( error.errors.length);
           //let messageError="";
            if(error){
               error.errors.forEach(element => {
                   messageError=element.message;
                   
               });
               res.status(401).json({message:messageError});
            }
         })
    }
).catch(error=>{
    console.log(error);
});

};
exports.getOneCommentaire=(req,res,next)=>{
    console.log('params',req.params.id)
    commentaire.findByPk(req.params.id,{
        include:[{
            model:User,
            attributes:['username','urlImage']
        }]

    }).then(comments=>{
        res.status(200).json(comments)
    }).catch(error=>{
        console.log(error)
    })
}
exports.getAllCommentaire=(req,res,next)=>{
    commentaire.findAll({
        include:[{
            model:User,
            attributes:['username']
        },
        {
        model:Message,
        attributes:['title','id']

        }
    
    ],
    

    }).then(comments=>{
        res.status(200).json(comments)
    }).catch(error=>{
        console.log(error)
    })



}
