
import React, { ChangeEvent, FormEvent, useState } from 'react';
import api from './api'; //dois pontos nivel anterior - e um ponto é no mesmo nivel


interface Pessoa {
  nome: string;
  email: string;
}

const App: React.FC = () => {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  const [dadosForm, setDadosForm] = useState({
    nome: '',
    email: '',
  });

  function mudancaInputs(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setDadosForm({ ...dadosForm, [name]: value });
    //console.log(dadosForm);
  }
  function adicionarPessoa(event: FormEvent) {
    event.preventDefault(); //prevenir o efeito de recarregar a pagina ao clicar em adicionar o nome e e mail cadastrados

    setPessoas([...pessoas, dadosForm]);

  }

  return (
    <>

      <h1>Inimigo ou Amigo Secreto?</h1>

      <p>Chega de confusão, vamos sortear o amigo secreto por aqui!</p>
      <p>Informe os nomes dos participantes e e-mails abaixo:</p>

      <form onSubmit={adicionarPessoa}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nome" placeholder="Digite o nome da pessoa aqui" onChange={mudancaInputs} />
        </div>

        <div>
          <label>e-mail:</label>
          <input type="email" name="email" placeholder="Digite o e-mail da pessoa aqui" onChange={mudancaInputs} />
        </div>

        <button type="submit">Adicionar</button>

      </form>

      <hr />

      <h3>Participantes Adicionados</h3>
      <ol>
        {pessoas.map((pessoa, indice) => (
          <li key={indice}>{pessoa.nome}</li>
        ))}
      </ol>
    </>
  );
};

export default App;

//tsx usado no front por conta de ser typescript e poder conter html