 
const {Sequelize, Model,DataTypes}=require('sequelize');
const sequelize=require('../database');
class Commentaire extends Model {}
Commentaire.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
  description: {
    type:DataTypes.TEXT,
    allowNull:false,
    validate:{
       validationAttribut(value){
          if(value.length>=3){
         const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
           let valeur=expRegex.test(value);
           if(valeur===false){
             throw  new Error ("les caractères saisi pour le message ne sont pas acceptés");
           }
   
           
         }
        else{
          throw  new Error ("le commentaire doit avoir au moins 3 caractères");
         }
        }
     }
  },
  dateCommentaire:{
    type:DataTypes.STRING,
    allowNull:false,


  },


   
}
, {
  // Other model options go here
  sequelize // We need to pass the connection instance
});

module.exports=Commentaire;