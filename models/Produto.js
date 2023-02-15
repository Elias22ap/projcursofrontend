const sequelize = require('sequelize');
const db = require('../connection');

const Produto = db.define('produtos', {
    
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
    preco:{
        type:sequelize.STRING,
        required:true,

    },
    cor:{
        type:sequelize.STRING,
        required:true,

    },

    qtde:{
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

module.exports = Produto;