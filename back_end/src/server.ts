import express, {Request, Response} from 'express';
import 'express-async-errors';
import routes from './routes';
import cors from 'cors'; //extensao para monitorar requisicoes feitas para o backend
//import knex from './database/connection'; //importando variavel do mesmo nivel usando ponto

const app = express();

app.use(cors());

app.use(express.json()); //faz com que seja possivel receber os dados em json

app.use(routes);

app.listen(4242, () =>{
  console.log('Servidor iniciado na porta 4242 ★ω★');
});


// app.get('/rotaderequisicao', async (request: Request, response: Response) => {
//   // console.log('Alguem entrou na Rota de Requisição');
//   // response.send('Alguém entrou no trem só que vai no navegador');
//   // response.json({
//   //   message:'Alguém entrou na rota',
//   //   local: 'Highway to Hell, 666',
//   //   status: 42, //pode deixar virgula mesmo sendo o ultimo atributo
//   // });
//   const pessoas = await knex('pessoas').select('*');
//   return response.json(pessoas);
// });