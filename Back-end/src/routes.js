const express = require('express');
const routes = express.Router();

const usuarioController = require('./controllers/usuarioController');
const perguntaController = require('./controllers/perguntaController');
const respostaController = require('./controllers/respostaController');
const chatController = require('./controllers/chatController');
const mensagemController = require('./controllers/mensagemController');


routes.get("/usuarios/:login/:senha", usuarioController.confirmUsuario);
routes.get("/usuarios", usuarioController.indexUsuario);
routes.get("/usuarios/:id", usuarioController.showUsuario);
routes.post("/usuarios", usuarioController.storeUsuario);
routes.put("/usuarios/:id", usuarioController.updateUsuario);
routes.delete("/usuarios/:id", usuarioController.removeUsuario);

routes.get("/perguntas", perguntaController.indexPergunta);
routes.get('/perguntas/:id', perguntaController.showPergunta);
routes.post("/perguntas", perguntaController.storePergunta);
routes.put("/perguntas/:id", perguntaController.updatePergunta);
routes.delete("/perguntas/:id", perguntaController.removePergunta);

routes.get("/respostas/:id", respostaController.PerguntaResposta);
routes.get("/respostas", respostaController.indexResposta);
routes.post("/respostas", respostaController.storeResposta);
routes.put("/respostas/:id", respostaController.updateResposta);
routes.delete("/respostas/:id", respostaController.removeResposta);

routes.get("/chats", chatController.indexChat);
routes.get("/chats/:id", chatController.showChat);
routes.post("/chats", chatController.storeChat);
routes.put("/chats/:id", chatController.updateChat);
routes.delete("/chats/:id", chatController.removeChat);

routes.get("/mensagens", mensagemController.indexMensagem);
routes.get("/mensagens/:id", mensagemController.showMensagem);
routes.post("/mensagens", mensagemController.storeMensagem);
routes.put("/mensagens/:id", mensagemController.updateMensagem);
routes.delete("/mensagens/:id", mensagemController.removeMensagem);


module.exports = routes;