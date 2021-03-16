//importa os módulos http e express
const http = require('http');
const express = require('express');
//constrói um objeto express
const app = express();
//importa o body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.json());
//configura a porta do servidor e o coloca em execução.
const porta = 3000;
let id = 2;
let livros = [ 
    {
        id: 1,
        titulo: 'Harry Potter e a Pedra Filosofal',
        descricao: 'Literatura infanto-juvenil',
        edicao: '3',
        autor: 'J. K. Rowling',
        isbn: 9780545069670
    },
    {
        id: 2,
        titulo: 'Harry Potter e a Câmara Secreta',
        descricao: 'Literatura infanto-juvenil',
        edicao: '5',
        autor: 'J. K. Rowling',
        isbn: 9781408876831
    }    

];
app.set('port', porta);
app.get('/livros', (req, res, next) => {
    res.json(livros);
    })
app.post('/livros', (req, res, next) => {
    const livro = req.body;
    livros.push({id: id += 1, titulo: livro.titulo, descricao:
    livro.descricao, edicao: livro.edicao, autor: livro.autor, isbn: livro.isbn}); console.log(livros);
    res.status(201).json(livros);
    })
app.put('/livros',(req, res, next) => {
    livros.forEach((livro) =>{
        if(livro.id === req.body.id) {
            livro.titulo = req.body.titulo;
            livro.descricao = req.body.descricao;
            livro.edicao = req.body.edicao;
            livro.autor = req.body.autor;
            livro.isbn = req.body.isbn;
        }
    })
    res.status(200).json(livros);
})
// meu codigo
app.delete('/livros',(req, res, next) =>{
    livros.forEach(livro => {
        if(livro.id === req.body.id){
            const index = livros.indexOf(livro,0);
            livros.splice(index,1)
        }
        
    })
    res.status(200).json(livros);
}); 
// cod professor
/*app.delete('/livros:id', (req, res, next) => {
    const idLivroDeletado = req.params.id;
    livros.forEach((livro, index) => {
        if(livro.id == idLivroDeletado) livros.splice(index, 1)
    })
    res.status(200).json(livros);

}) */
const server = http.createServer(app);
server.listen(3000);