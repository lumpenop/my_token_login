const Sequelize = require('sequelize');


module.exports = class User extends Sequelize.Model{
   static init(sequelize){
       return super.init({
           id:{
               type:Sequelize.STRING(20),
               allowNull:false,
               primaryKey:true,               
           },
           pw:{
               type:Sequelize.STRING(100),
               allowNull:false,
           }       

           
       },{
           sequelize,
           timestamps:false,
           underscored:false,
           paranoid:false,
           Modelname:'User',
           tablename:'users',
           charset:'utf8',
           collate:'utf8_general_ci'

       })
   }
}