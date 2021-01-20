import { IPessoaSorteada } from "controllers/SorteioController";
import { TestAccount, SentMessageInfo } from "nodemailer";

export default class EnviarEmail {
  async execute(pessoasSorteadas: IPessoaSorteada[]): Promise<void> {
    const nodemailer = require("nodemailer");

    nodemailer.createTestAccount((err: Error, account: TestAccount) => {
      if (err) {
        console.error('Falha ao criar uma conta de teste ｡･ﾟﾟ*(>д<)*ﾟﾟ･｡' + err.message);
        return process.exit(1);
      }

      console.log('Dados recebidos, preparando o envio (ノ*°▽°*)');

      let transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });

      pessoasSorteadas.map(pessoaSorteada => {
        let message = {
          from: 'Inimigo ou Amigo Secreto, inimigoouamigosorteio@provaecondos.com',
          to: pessoaSorteada.pessoa.email,
          subject: 'E agora? Inimigo ou Amigo Secreto? Boa sorte!',
          text: `Roi, ${pessoaSorteada.pessoa.nome}, o sorteio foi realizado e quem saiu para ti foi: ${pessoaSorteada.pessoa_sorteada.nome}! E agora? Inimigo ou Amigo Secreto? ┐(︶▽︶)┌`,
        } //usar crase para montar string e no meio poder inserir variaveis dinamicas (template string)

        transporter.sendMail(message, (err: Error, info: SentMessageInfo) => {
          if (err) {
            console.log('Erro! ヽ(`⌒´メ)ノ' + err.message);
            return process.exit(1);
          }

          console.log('Mensagem enviada ٩(◕‿◕｡)۶: %s', info.messageId);
          console.log('URL Gerada: %s', nodemailer.getTestMessageUrl(info));
          console.log('---------------------------------------------------');
        });
      });
    });

  }
}