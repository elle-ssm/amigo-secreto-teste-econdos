import {Router} from 'express';
import PessoasController from './controllers/PessoasController';
import {SorteioController} from './controllers/SorteioController';

const routes = Router();
const pessoasController = new PessoasController();
const sorteioController = new SorteioController();
routes.post('/pessoas', pessoasController.create);
routes.post('/sorteio', sorteioController.index);
routes.get('/pessoas', pessoasController.index);
routes.patch('/pessoas', pessoasController.update);
routes.delete('/pessoas', pessoasController.delete);

export default routes;


