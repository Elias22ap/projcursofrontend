const express = require('express'); //Chamando express;
const app = express(); //Criando constante app;
const bodyParser = require('body-parser'); //Chamando
const session = require('express-session'); //Chamando a Session para usuário;
const conn = require('./connection'); //Chamando arquivo de conexão com banco de dados;
//const usuario = require('./models/Usuario');
const Usuario = require('./models/Usuario'); //Chamando Models;
const Cliente = require('./models/Cliente');
const Produto = require('./models/Produto');

//Configurações
app.set('view engine', 'ejs'); //Configurando View Engine EJS;
app.set('views', './views');

app.use(session({
    secret:"cursonodejs",
    resave:true,
    saveUninitialized:true,
}))

app.use(express.static('public')); //Chamando Pasta para Css e Imagens;

app.use(bodyParser.urlencoded({extended:true})); //Configurando Body Parser;

app.get('/', function(req, res){
    res.render('login');

});

app.get('/home', function(req, res){

    res.render('home');
    
});

app.get('/cliente/:id', async function(req, res){
    
    const dados = await Cliente.findOne({raw:true, where:{id:id}});

    res.render('cliente', {dados});

});


// LOGIN COM ADMIN


app.post('/login', async function(req, res){
    
    const user = await Usuario.findOne({
    attributes: ['id', 'nome', 'usuario', 'senha', 'tipo'],
            where: {
                usuario: req.body.usuario
            }
    });

        if(user.usuario == req.body.usuario && user.senha === req.body.senha && user.tipo === "admin"){
        
        res.render('home', {usuarios:user})

        }else if(user.usuario == req.body.usuario && user.senha === req.body.senha && user.tipo != "admin"){
        
            res.render('listaruser2', {usuarios:user});
        
        }else{

        res.redirect('/');

        }

});

// CADASTRO DE USUÁRIO
app.get('/cadusuario', function(req, res){

   
        res.render('cadusuario')

    
});

app.post('/cadusuario', async function(req, res){
    const usuarios = req.body;
    const nome = usuarios.nome;
    const usuario = usuarios.usuario;
    const senha = usuarios.senha;
    const tipo = usuarios.tipo;
    const status = usuarios.status;

    await Usuario.create({nome, usuario, senha, tipo, status})
    res.redirect('/listar')
});


//LSTAR USUÁRIOS
app.get('/listar', async function(req, res){
    
    const dados = await Usuario.findAll({raw:true})

    res.render('listaruser', {usuarios:dados});


});


app.get('/listar2', async function(req, res){

    const dados = await Usuario.findAll({raw:true})
    
    res.render('listaruser2', {usuarios:dados});


});

//
app.get('/usuario/:id', async function(req, res){
    const id = req.params.id;
    const dados = await Usuario.findOne({raw:true, where:{id:id}});

    res.render('usuario', {dados});

});


//ATUALIZAR CADASTRO
app.post('/atualizar', async function(req, res){
    const user = req.body;
    const id = user.id;
    const nome = user.nome;
    const usuario = user.usuario;
    const senha = user.senha;
    const tipo = user.tipo;
    const status = user.status;


    const dados ={
        id,
        nome,
        usuario,
        senha,
        tipo,
        status,
    }
    await Usuario.update(dados, {where:{id:id}});
        console.log(dados);
    res.redirect('/listar');
    
})
// EXCLUIR CADASTRO
app.get('/excluir/:id', async function(req, res){
    const id = req.params.id;

    await Usuario.destroy({where:{id:id}});
    res.redirect('/listar');

})

//CLIENTES
app.get('/cadcliente', function(req, res){
    
        res.render('cadcliente')
   
});

app.post('/cadcliente', async function(req, res){
    const clientes = req.body;
    const nome = clientes.nome;
    const email = clientes.email;
    const senha = clientes.senha;
    const status = clientes.status;

    await Cliente.create({nome, email, senha, status})
    res.redirect('/listarclientes');

});

app.get('/listarclientes', async function(req, res){

    const dados = await Cliente.findAll({raw:true})

    res.render('listarclientes', {clientes:dados});

});

app.get('/excluircliente/:id', async function(req, res){
    const id = req.params.id;

    await Cliente.destroy({where:{id:id}});
    res.redirect('/listarclientes');

});

app.post('/atualizarcliente', async function(req, res){
    
    const clientes = req.body;
    const id = clientes.id;
    const nome = clientes.nome;
    const email = clientes.email;
    const senha = clientes.senha;
    const status = clientes.status;


    const dados ={
        id,
        nome,
        email,
        senha,
        status,
    }
    await Cliente.update(dados, {where:{id:id}});

    res.redirect('/listarclientes');
    
})

app.get('/cliente/:id', async function(req, res){
    const id = req.params.id;
    const dados = await Cliente.findOne({raw:true, where:{id:id}});

    res.render('cliente', {dados});

});

//PRODUTOS
app.get('/cadprodutos', function(req, res){
    res.render('cadprodutos');

});



//Criar produto
app.post('/cadprodutos', async function(req, res){
    
    const produtos = req.body;
    const nome = produtos.nome;
    const preco = produtos.preco;
    const cor = produtos.cor;
    const status = produtos.status;
    const qtde = produtos.qtde;

    await Produto.create({nome, preco, cor, status, qtde})
    
    res.redirect('/listarprodutos');

});

//Listar produtos
app.get('/listarprodutos', async function(req, res){
    
    const dados = await Produto.findAll({raw:true})

    res.render('listarprodutos', {produtos:dados});

});

//Excluir produto
app.get('/excluirproduto/:id', async function(req, res){
    const id  = req.params.id;

    await Produto.destroy({where:{id:id}})
    res.redirect('/listarprodutos')
});

//Atualizar Produto
app.post('/atualizarproduto', async function(req, res){
    
    const produtos = req.body;
    const id = produtos.id;
    const nome = produtos.nome;
    const preco = produtos.preco;
    const cor = produtos.cor;
    const qtde = produtos.qtde;
    const status = produtos.status;
    

    const dados = {
        id, 
        nome,
        preco,
        cor,
        qtde,
        status
    }
    await Produto.update(dados, {where:{id:id}});
    
    res.redirect('/listarprodutos');
});


app.get('/produto/:id', async function(req, res){
    const id = req.params.id;
    const dados = await Produto.findOne({raw:true, where:{id:id}});

    res.render('produto', {dados});
});


app.get('/sair', function(req, res){
    req.session.destroy();
    res.redirect('/');

});

conn.sync().then(()=>{app.listen(3000)}).catch((err)=>console.log(err));