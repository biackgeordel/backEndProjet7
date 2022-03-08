require('dotenv').config({path:"./configuration.env"});
const {Sequelize, Model,DataTypes}=require('sequelize');
//connection à la base de données mysql
const sequelize= new Sequelize(
    process.env.NAME_BD,
    process.env.USERNAME_BD,
    process.env.PWD_BD,
    {
      host:process.env.HOST_BD,
      dialect:process.env.SYSTEME_BD,
      logging:false,
      dialectOptions: {
        charset: 'utf8mb4',
        supportBigNumbers: true,
        bigNumberStrings: true
      },
    }
);


module.exports=sequelize;


  