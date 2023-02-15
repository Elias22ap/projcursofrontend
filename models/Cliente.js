const sequelize = require('sequelize');
const db = require('../connection');

const Cliente = db.define('clientes', {
    
    id:{
        type: sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true,
    },

    nome:{
        type:sequelize.STRING,
        required:true,

    },
    email:{
        type:sequelize.STRING,
        required:true,

    },
    senha:{
        type:sequelize.STRING,
        required:true,

    },
        
    status:{
        type:sequelize.STRING,
        required:true,

    },

    imagem:{
        type:sequelize.STRING,
        required:true,

    },
});

module.exports = Cliente;