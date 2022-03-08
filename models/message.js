 
const {Sequelize, Model,DataTypes}=require('sequelize');
const sequelize=require('../database');
const commentaire=require('./commentaire');
const like=require('./like');
const dislike=require('./dislike');
class Message extends Model {}

Message.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull:true,// allowNull defaults to true
    validate:{
       validationAttribut(value){
         if(value){
         const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
           let valeur=expRegex.test(value);
           if(valeur===false){
             throw  new Error ("les caractères saisi pour le titre ne sont pas acceptés");
           }
         }
       }
     }
  
  },
  dateMessage:{
    type:DataTypes.STRING,
    allowNull:false,
  },
 
  description :{
    type: DataTypes.TEXT,
    allowNull:true,// allowNull defaults to true
    validate:{
    
       validationAttribut(value){

        if(value){
         const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
           let valeur=expRegex.test(value);
           if(valeur===false){
             throw  new Error ("les caractères saisi pour la description ne sont pas acceptés");
           }  
         }
       }
     }
  },
  urlImage :{
    type: DataTypes.STRING,
    allowNull:false,

    // allowNull defaults to true
  }, 
},
{
  hooks: {
    afterCreate:(message,options)=>{
      console.log("mon message cree");
      console.log(message);
      return message;
    },

  },

  // Other model options go here
  sequelize, // We need to pass the connection instance,
});


module.exports=Message;