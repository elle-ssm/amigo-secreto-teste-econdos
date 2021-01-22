
import React, { ChangeEvent, FormEvent, useState, useEffect } from 'react';
import api from './api'; //dois pontos nivel anterior - e um ponto é no mesmo nivel
import './App.css'; //nao é arquivo ts entao precisa da extensao

interface Pessoa {
  nome: string;
  email: string;
  id: number;
}

interface Sorteador {
  pessoa: Pessoa;
  pessoa_sorteada: Pessoa;
}

const App: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [dadosForm, setDadosForm] = useState({
    nome: '',
    email: '',
  });

  const [sorteadores, setSorteadores] = useState<Sorteador[]>([]);

  useEffect(() => {
    async function carregarDados() {
      const resposta = await api.get('/pessoas');
      setPessoas(resposta.data);
    };

    carregarDados();

  }, []);

  function mudancaInputs(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDadosForm({ ...dadosForm, [name]: value });
    //console.log(dadosForm);
  }
  async function adicionarPessoa(event: FormEvent) {
    event.preventDefault(); //prevenir o efeito de recarregar a pagina ao clicar em adicionar o nome e e mail cadastrados

    //abaixo que é melhor no backend so que vai ser no frontend o tratamento de se o e mail ja existe ou nao
    // tres iguais é identico
    const emailExiste = pessoas.some(pessoa => pessoa.email === dadosForm.email);

    if (emailExiste) {
      alert('Já estão usando este e-mail =(');

      return;
    }

    try {
      const resposta = await api.post('/pessoas', dadosForm);

      setPessoas([...pessoas, ...resposta.data]);

    } catch (erro) {

      alert(erro.response.data.mensagem);
    }


    const formulario = event.target as HTMLFormElement;

    formulario.reset();

  }

  async function deletarPessoa(id: number) {
    try {
      await api.delete(`/pessoas/${id}`);

      //para remover do front end tambem
      //inverso do triplo igual é o exclamacao igual igual
      setPessoas(pessoas.filter(pessoa => pessoa.id !== id));

    } catch (erro) {
      alert(erro.response.data.mensagem);
    }
  }

  async function editarPessoa(pessoa: Pessoa) {

    const nome = prompt('Digite o novo nome', pessoa.nome);

    if (!nome || nome === '') {
      return;
    }

    const email = prompt('Digite o novo e-mail', pessoa.email);

    if (!email || email === '') {
      return;
    }

    try {
      await api.patch(`/pessoas/${pessoa.id}`, { nome, email });

      setPessoas(pessoas.map(pessoaAtual => {
        if (pessoaAtual.id === pessoa.id) {
          return Object.assign(pessoaAtual, { nome, email });

        }

        return pessoaAtual;
      }));

    } catch (erro) {
      alert(erro.response.data.mensagem);

    }

  }

  async function fazerSorteio() {
    try {
      const resposta = await api.post('/sorteio');
      setSorteadores(resposta.data);
    } catch (erro) {
      alert(erro.response.data.mensagem);
    }
  }

  return (
    <div id="container">

      <h1 className="text-center">Inimigo ou Amigo Secreto?</h1>

      <p className="lead text-center">Chega de confusão (ou não), vamos sortear por aqui!</p>
      <p className="lead text-center">Informe os nomes dos participantes e e-mails abaixo:</p>

      <form className="m-5" onSubmit={adicionarPessoa}>
        <div className="form-group">
          <label>Nome:</label>
          <input className="form-control" type="text" name="nome" placeholder="Digite o nome da pessoa aqui" onChange={mudancaInputs} />
        </div>

        <div className="form-group">
          <label>e-mail:</label>
          <input className="form-control" type="email" name="email" placeholder="Digite o e-mail da pessoa aqui" onChange={mudancaInputs} />
        </div>
        <div className="d-flex justify-content-center">


          <button className="btn btn-outline-primary" type="submit">Adicionar</button>

        </div>
      </form>

      <hr />

      <h3 className="text-center">Participantes Adicionados</h3>
      <ol className="m-5">
        {pessoas.map((pessoa, indice) => (
          <li className="row mb-1" key={indice}>
            <span className="col-6 text-uppercase text-truncate">{pessoa.nome}</span>
            <button className="col btn btn-danger" type="button" onClick={() => deletarPessoa(pessoa.id)}>
              Excluir
            </button>

            <button className="col btn btn-success ml-1" type="button" onClick={() => editarPessoa(pessoa)}>
              Editar
            </button>


          </li>
        ))}
      </ol>
      <div className="d-flex justify-content-center">
        <button className="btn btn-outline-info" type="button" onClick={fazerSorteio}>
          Sortear
          </button>
      </div>
      <hr />
      <h3 className="text-center">Resultado do Sorteio</h3>
      <ul className="m-5 list-group">
        {
          sorteadores.map((sorteador, indice) => (
            <li className="list-group-item" key={`${indice} ${new Date().getTime()}`}> {/* para pegar a quantidade de milissegundos desde 01011970 ate o momento atual por isso nunca tera um igual */}
              <p>{sorteador.pessoa.nome} tirou {sorteador.pessoa_sorteada.nome}</p>
            </li>
          ))
        }
      </ul>

    </div>
  );
};

export default App;

//tsx usado no front por conta de ser typescript e poder conter html