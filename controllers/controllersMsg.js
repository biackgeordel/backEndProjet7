
const message=require('../models/message');
const sequelize=require('../database');
const user=require('../models/user');
const commentaire=require('../models/commentaire');
const like=require('../models/like');
const disLike=require('../models/dislike');
const fs=require('fs');

exports.createdMessage=(req,res,next)=>{
  
  const msgObject=JSON.parse(req.body.message);
  //nom du dossier contant les images des messages crées
  const dossier=msgObject.dossier;
   // console.log(msgObject);
    message.create({
        title:msgObject.title,
        description:msgObject.description,
       urlImage:`${req.protocol}://${req.get('host')}/images/${dossier}/message/${req.file.filename}`,
       UserId:msgObject.idUser,
       dateMessage:msgObject.date

    }).then(messages=>{
       
    res.status(200).json({msg:"ok"});
    
    }).catch(error=>{
     let tabError=[];
        if(error){
          error.errors.forEach(element => {
            tabError.push(element.message);
          });
        }
        return res.status(401).json({message:tabError});
        
    });
    sequelize.sync();
   
}

exports.getAllMessage= async (req,res,next)=>{
  const allMessage= await message.findAll(
    {
      order:[['createdAt','DESC']],
      distinct:true,
      include:[
        {model:user,
          
          attributes:['username','urlImage']
        },
      {
          model:commentaire,
           attributes:['description','dateCommentaire'],
          separate:true,
          order:[['createdAt','DESC']],
            include:[
            {
              model:user,
              attributes:['username','urlImage']
            }
          ]
        
        },
        {
          model:like,
    
        },
        {
          model:disLike
        }
     
      ]
    }
  );
  if(allMessage){
    res.status(200).json(allMessage);
  }else{
    res.status(200).json({message:"aucun message enregistré"});
  }

}
exports.getOneMessage=(req,res,next)=>{
  console.log('params',req.params.id)
  message.findByPk(req.params.id,{
      include:[{
          model:user,
          attributes:['username','urlImage']
      },
      {
        model:commentaire,
        attributes:['description','createdAt'],
        separate:true,
        order:[['createdAt','DESC']],
          include:[
          {
            model:user,
            attributes:['username','urlImage']
          }
        ]
      
      },
    
    {
      model:like,

    },
    {
      model:disLike
    }]

  }).then(msg=>{
      res.status(200).json(msg)
  }).catch(error=>{
      console.log(error)
  })
}
exports.deleteMessage=async(req,res,next)=>{
  console.log(req.params.id);
  console.log(req.params.user);
  //on recupère url de l'image
 const url=(await message.findByPk(req.params.id)).urlImage;
 //on recupere le path de l'image
 const chemin=url.split('/images/')[1];
 console.log("mon chemin");
 console.log(chemin);
 console.log("--------------------");
 //on recupère le path du fichier
 const path=`./images/${chemin}`;
 console.log(path);
 //on supprime l'image puis  on supprime le message crée
 fs.unlink(path,()=>{
  message.destroy({
    where:{
        id:req.params.id
    },
  }).then(response=>{
    console.log(response)
  
    res.status(200).json(response);
}).catch(error=>{
    console.log(error);
});

 })





}