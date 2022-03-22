const user=require('../models/user');
const sequelize=require('../database');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const fs=require('fs');
require('dotenv').config({path:"../configuration.env"});

exports.userSignup=(req,res,next)=>{
    //console.log(req.body);
    let email;
    let  password;
    if(req.body.password && req.body.email && req.body.username){
   const regexEmail=new RegExp(/^[a-z]+[.a-z0-9\-]+@[a-z]+[.][a-z]{2,}$/);
   const regexPassword=new RegExp(/^[A-Z][a-zA-Z-0-9]+[$!#&*]$/g);
            if(req.body.email.match(regexEmail)){
                email=req.body.email;
        
            }else{
            return res.status(401).json({message:"le format de votre email n'est pas accepté"});
            }
            if(req.body.password.match(regexPassword) && req.body.password.length>=6){
                password=bcrypt.hashSync(req.body.password,10);
            }else{
               return res.status(401).json({message:"le mot de passe doit avoir au moins 6"+
                " caractères et contenir un maj suivi des lettres alphanumeriques"+
                 " et d'un caractère spécial(!$*&#)"});
            }           
                user.create({
                    email:email,
                   password:password,
                   username:req.body.username,
                   dateUser:req.body.date,
                   admin:req.body.admin,
                   //assignation de l'image par defaut pour la création d'un compte
                   urlImage:`${req.protocol}://${req.get('host')}/images/default/user.jpg`,
                }).then((user)=>{
                    if(user){
                        //dossier contenant les images des messages
                        const message=`./images/${req.body.username}/message`;
                        //dossier contenant les images du profil
                        const avatar=`./images/${req.body.username}/avatar`;
                        //création du dossier message
                        fs.mkdirSync(`${message}`,{recursive:true});
                        //création du dossier avatar
                        fs.mkdirSync(`${avatar}`,{recursive:true});
                       // console.log('new user:',user);
                        res.status(201).json({message:"compte crée avec success"});
                    
                    }
                    
                  
                }).catch(error=>{
                   // console.log(error);
                    let tabError=[];
                    if(error){
                        error.errors.forEach(element => {
                            tabError.push(element.message);
                            
                        });
                    }
                    return res.status(401).json({message:tabError[0]});
                    
                })
        sequelize.sync();
            }else{
               let tabError=[];
           
                if(!req.body.email){
                    tabError.push("Vous n'avez saisi aucun email")
                }
                if(!req.body.password){
                  tabError.push("vous n'avez saisi aucun mot de passe")
                }
                if(!req.body.username){
                 tabError.push("Vous n'avez saisi aucun username")
                }
                return res.status(500).json(tabError);
            }
      
        
   
    }

exports.userLogin= async (req,res)=>{
    const userExist= await user.findOne({
        where:
        {email:req.body.email}
        });
       // console.log(userExist);
    if(userExist){
        const valid= await bcrypt.compare(req.body.password,userExist.password);
        if(valid){
            console.log(userExist.admin);
            res.status(200).json({
                id:userExist.id,
                username:userExist.username,
                admin:userExist.admin,
                token:jwt.sign(
                    {id:userExist.id},
                    process.env.SECRET_RANDOM,
                    {expiresIn:'24h'}
                )
                
                })
            }else{
                return res.status(400).json({message:"Le mot de passe saisi"
                +" ne correspond pas à ce compte"});
            }


    }else{
        return res.status(404).json({message:"  Ce compte utilisateur n'existe pas "});
    }
}
//middleware pour recupérer un user
exports.getOne=(req,res)=>{
  //  console.log(req.params.id);
    user.findOne({
        where:{
            id:req.params.id
        },
        attributes:['ville','pays','bio','urlImage','dateUser']
    })
    .then(user=>{
      //  console.log(user);
        res.status(200).json(user);
    }).catch(error=>{
        console.log(error);
    })
}


exports.updateUser=(req,res,next)=>{
   // console.log(req.file);
    //console.log(req.body.user);
    const objectUser=JSON.parse(req.body.user)||req.body.user;
    //nom dossier contenant les avatar de l'user
    const dossier=objectUser.dossier;
    console.log('new done',objectUser);
     
    user.findByPk(req.params.id).then(users=>{
        if(!objectUser.ville){
            objectUser.ville=users.ville
        }
        if(!objectUser.pays){
            objectUser.pays=users.pays
        }
        if(!objectUser.bio){
            objectUser.bio=users.bio
        }
        users.update((req.file)?{...objectUser,
         urlImage:`${req.protocol}://${req.get('host')}/images/${dossier}/avatar/${req.file.filename}`,
        
        }:{...objectUser},{
            attributes:[,'pays','ville','bio','urlImage']
        }
        ).then(response=>{
            console.log(response);
            res.status(200).json(response);
        }).catch(error=>{
           let tabError=[];
           if(error){
               //on supprimer l'image si error existe
               if(req.file){
                   let path=req.file.path;
                fs.unlink(path,()=>{
                    console.log('image supprimée');
                });
               }
               let message=error.errors;
              message.forEach(element=>{
                  tabError.push(element.message);
              });
            }
            return res.status(401).json({message:tabError});
            })

     
    }).catch(error=>{
      //  console.log(error);
      let tabError=[];
      if(error){
          tabError.push(error.message);
      }
       return res.status(401).json({message:tabError});
      
    })
}
exports.deleteUser=async(req,res,next)=>{
    //on recupère le username de l'utilisateur pour créer le path du dossier
   const val=await user.findByPk(req.params.user);
   console.log("nom dossier:"+val.username);
   //on recupere le path du dossier  contenant les images 
   const chemin=`./images/${val.username}`;
   //on supprime le dossier du l'utilisateur puis on supprime le compte user
   fs.rmdir(`${chemin}`,{recursive:true},(error)=>{
       if(error) throw error;
        user.destroy({
    where:{
        id:req.params.user
    }
     }).then(response=>{
       res.status(200).json(response);
    }).catch(error=>{
      console.log(error);
    })

   });
  

}