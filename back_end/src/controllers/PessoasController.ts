import { Request, Response } from 'express';
import connection from '../database/connection'; //dois para sair da controllers e entrar na database

//CRUD - CREAT - READ (select / index) - UPDATE - DELETE

class PessoasController {

  public async index(request: Request, response: Response): Promise<Response> {
    const pessoas = await connection('pessoas').select('*');
    return response.json(pessoas);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { nome, email } = request.body;
    
    const { id } = request.params;

    const pessoa = await connection('pessoas').update({
      nome,
      email,
    }).where('id', id);

    return response.json(pessoa);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await connection('pessoas').where('id', id).delete();

    return response.status(200).send(); //200 status code http que significa ok
  }

  public async create(request: Request, response: Response) {
    const { nome, email } = request.body;

   const pessoas = await connection('pessoas').returning('*').insert({
      nome,
      email, //short syntax quando variavel tem mesmo nome de um atributo nao é necessario fazer nome: nome, por exemplo
    });

    return response.json(pessoas);
  }
}

export default PessoasController;
