import ErroSistema from 'erro/ErroSistema';
import { Request, Response } from 'express';
import EnviarEmail from 'services/EnviarEmail';
import connection from '../database/connection'; //dois para sair da controllers e entrar na database

interface IPessoa {
  nome: string;
  email: string;
}
interface IPessoaSorteada { //interface utilizada para o typescript identificar quais sao os atributos de uma variavel
  pessoa: IPessoa;
  pessoa_sorteada: IPessoa;
}

class SorteioController {
  async index(request: Request, response: Response) {

    try {
      const todasPessoas = await connection('pessoas').select('*');
      if (!todasPessoas) {
        throw new ErroSistema('Não foram encontradas pessoas cadastradas para o sorteio 〒﹏〒');
      }

      if (todasPessoas.length < 3) {
        throw new ErroSistema('Não há pessoas suficientes para o sorteio ｡•́︿•̀｡');
      }

      //for para embaralhar as pessoas

      for (let i = todasPessoas.length - 1; i >= 0; i--) {
        var autoIndice = Math.floor(Math.random() * (i + 1));
        var itemPosicao = todasPessoas[autoIndice];

        todasPessoas[autoIndice] = todasPessoas[i];
        todasPessoas[i] = itemPosicao;

      }

      let pessoasSorteadas: IPessoaSorteada[] = []; //usamos let para criar uma variavel que sera somente visivel dentro do escopo atual
      todasPessoas.map((pessoa, indice) => {
        if (todasPessoas.indexOf(pessoa) === todasPessoas.length - 1) { //tres iguais verifica a tipagem tambem da variavel
          pessoasSorteadas.push({
            pessoa,
            pessoa_sorteada: todasPessoas[0],
          });
        } else {
          pessoasSorteadas.push({
            pessoa,
            pessoa_sorteada: todasPessoas[indice + 1],
          });
        }
      });

      const enviarEmail = new EnviarEmail();

      enviarEmail.execute(pessoasSorteadas);

      return response.status(200).send();

    } catch(erro){

      return response.status(erro.statusCodigo).json({
        status:'erro',
        mensagem: erro.mensagem,
      });

    }



  }
}

//export default SorteioController; //serve para quando so tem um metodo para ser exportado dentro do arquivo

export { SorteioController, IPessoaSorteada };