const express = require('express');
const app = express();
const port = 8085; // Porta onde o servidor será executado

// Objeto inicial
const data = {
    tag: "nenhuma"
};

// Middleware para processar JSON no corpo das requisições
app.use(express.json());

// Rota principal (teste inicial)
app.get('/', (req, res) => {
    res.send(data); // Envia o objeto atualizado
});

// Rota para receber informações e alterar o valor de "tag"
app.post('/dados', (req, res) => {
    const { tag } = req.body; // Obtém o campo "tag" do corpo da requisição
    
    // Atualiza o valor de "tag" apenas se ele for fornecido
    if (tag) {
        data.tag = tag;
        console.log(`Valor de "tag" atualizado para: ${tag}`);
        res.status(200).send({ message: 'Valor de "tag" atualizado com sucesso!', dados: data });
    } else {
        res.status(400).send({ error: 'Campo "tag" não encontrado no corpo da requisição.' });
    }
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
