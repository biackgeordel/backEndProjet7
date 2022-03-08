 
const {Sequelize, Model,DataTypes}=require('sequelize');
const sequelize=require('../database');
class Like extends Model {}

Like.init({
  // Model attributes are defined here
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey:true,
    defaultValue:DataTypes.UUIDV4
  },
   
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
});

module.exports=Like;