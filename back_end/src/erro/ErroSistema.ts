class ErroSistema {
  public readonly mensagem: string;

  public readonly statusCodigo: number;

  constructor(mensagem: string, statusCodigo = 400) {
    this.mensagem = mensagem;
    this.statusCodigo = statusCodigo;
  }
}

export default ErroSistema;