const {Model,DataTypes}=require('sequelize');
const sequelize=require('../database');
const Message=require('./message');
const Commentaire=require('./commentaire');
const Like = require('./like');
const DisLike = require('./dislike');
class User extends Model {}

User.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
  username: {
    type: DataTypes.STRING,
    allowNull:false,
    unique:{msg:"username que vous avez saisi  existe déjâ"},
    validate:{
      is:/^[a-z-A-Z]+[\s/-]?[a-z-A-Z-0-9]+$/g
    }
  
    // allowNull defaults to true
  },
  pays:{
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue:"inconnu",
    validate:{
      validationAttribut(value){
        const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
          let valeur=expRegex.test(value);
          if(valeur===false){
            throw  new Error ("les caractères saisi pour le pays ne sont pas acceptés");
          }
  
          
        }
    }
  },
  ville:{
    type: DataTypes.STRING,
    allowNull:false,
    defaultValue:"inconnue",
    validate:{
   
      validationAttribut(value){
      const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
        let valeur=expRegex.test(value);
        if(valeur===false){
          throw  new Error ("les caractères saisi pour la ville  ne sont pas acceptés");
        }

        
      }
    }

  },
  bio:{
    type: DataTypes.TEXT,
    allowNull:false,
    defaultValue:"aucune information",
    validate:{
  
      validationAttribut(value){
        const expRegex=new RegExp(/^[a-z-A-Z]+[\w*\W]+$/g);
          let valeur=expRegex.test(value);
          if(valeur===false){
            throw  new Error ("les caractères saisi pour votre biographie ne sont pas acceptés");
          }
  
          
        }
    }

  

  },
  dateUser:{
    type:DataTypes.STRING,
    allowNull:false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false,

    // allowNull defaults to true
  },
  email:{
      type:DataTypes.STRING,
      allowNull:false,
      unique:{msg:"l'email que vous avez  saisi existe déjâ"}
 

  },
  urlImage:{
      type:DataTypes.STRING,
      allowNull:false,

  }
  
},

{
  // Other model options go here
  sequelize,modelName:'User' // We need to pass the connection instance
});


//User.sync();
//association entre user et message
User.hasMany(Message,{
  foreignKey:{
    allowNull:false,
    onDelete: 'CASCADE',
    hooks:true
  }
});
Message.belongsTo(User);
//-------------------------
//Message.sync(console.log);
//association entre message et commentaire
Message.hasMany(Commentaire,{
  foreignKey:{
  allowNull:false,
    onDelete: 'CASCADE',
    hooks:true
  }
  
});
Commentaire.belongsTo(Message);
//------------------------------

//association entre user et commentaire
User.hasMany(Commentaire,{
  foreignKey:{
    allowNull:false,
      onDelete: 'CASCADE',
      hooks:true
    }
});
Commentaire.belongsTo(User);
//--------------------------------

//Commentaire.sync();
//association entre user et like
User.hasOne(Like,{
  foreignKey:{
    allowNull:false,
      onDelete: 'CASCADE',
      hooks:true
    }
});
Like.belongsTo(User);
//---------------------------------

//association entre message et like
Message.hasMany(Like,{
  foreignKey:{
    allowNull:false,
      onDelete: 'CASCADE',
      hooks:true
    }
});
Like.belongsTo(Message);
//----------------------------------

//association entre user et dislike
User.hasOne(DisLike,{
  foreignKey:{
    allowNull:false,
      onDelete: 'CASCADE',
      hooks:true
    }
});
DisLike.belongsTo(User);
//---------------------------------
//association entre message dislike
Message.hasMany(DisLike,{
  foreignKey:{
    allowNull:false,
      onDelete: 'CASCADE',
      hooks:true
    }
});
DisLike.belongsTo(Message);
//---------------------------------
/*Like.sync();
DisLike.sync();*/



module.exports=User;