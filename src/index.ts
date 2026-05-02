// 
// PRINCÍPIO D: DIP (Inversão de Dependência)
// Criados abstrações (interfaces) para a infraestrutura. As regras de negócio
// não vão depender do banco de dados ou do serviço de e-mail diretamente.
// 
interface IPedidoRepository {
    salvar(pedido: PedidoBase): void;
}

interface INotificacaoService {
    enviar(mensagem: string): void;
}

// 
// PRINCÍPIO O: OCP (Aberto/Fechado)
// A interface de desconto permite criar novas regras de desconto (ex: BlackFriday)
// no futuro sem precisar alterar a classe PedidoBase.
// 
interface IDesconto {
    calcular(valor: number): number;
}

// ==============================================================================
// PRINCÍPIO I: ISP (Segregação de Interface)
// Dividido uma interface gigante em três interfaces menores e específicas.
// Assim, ninguém é obrigado a implementar métodos que não faz sentido usar.
// ==============================================================================
interface IPagamento { processarPagamento(): void; }
interface INotaFiscal { gerarNotaFiscal(): void; }
interface ILogistica { imprimirEtiquetaFisica(): void; }

// ==============================================================================
// PRINCÍPIO S: SRP (Responsabilidade Única)
// Cada classe abaixo tem apenas um motivo para mudar. Uma cuida só do banco
// de dados, a outra cuida só do envio de e-mails.
// ==============================================================================
class MySQLPedidoRepository implements IPedidoRepository {
    salvar(pedido: PedidoBase): void {
        console.log("Salvando dados no MySQL via DIP...");
    }
}

class EmailService implements INotificacaoService {
    enviar(mensagem: string): void {
        console.log(`Notificação enviada: ${mensagem}`);
    }
}

// Implementações do OCP (Aberto para extensão, fechado para modificação)
class DescontoVIP implements IDesconto { calcular(v: number) { return v * 0.2; } }
class DescontoEstudante implements IDesconto { calcular(v: number) { return v * 0.1; } }
class SemDesconto implements IDesconto { calcular(v: number) { return 0; } }

// ==============================================================================
// PRINCÍPIO L: LSP (Substituição de Liskov)
// PedidoBase contém apenas os comportamentos universais de um pedido. 
// Qualquer classe filha poderá substituí-la sem causar erros no sistema.
// ==============================================================================
abstract class PedidoBase {
    
    constructor(
        public valorTotal: number, 
        protected estrategiaDesconto: IDesconto, // Recebe via OCP
        protected repository: IPedidoRepository, // Recebe via DIP (Injeção de dependência)
        protected notificacao: INotificacaoService // Recebe via DIP (Injeção de dependência)
    ) {}

    calcularDesconto(): number {
        return this.estrategiaDesconto.calcular(this.valorTotal);
    }

    // A classe não sabe QUAL banco ou e-mail está usando, apenas usa os contratos.
    concluirPedido(): void {
        this.repository.salvar(this);
        this.notificacao.enviar("O pedido foi processado com sucesso!");
    }
}

// O Pedido Físico assina os contratos do ISP que fazem sentido para ele (inclui Logística)
class PedidoFisico extends PedidoBase implements IPagamento, INotaFiscal, ILogistica {
    calcularFrete(): number { return 15.0; }
    processarPagamento(): void { console.log("Pago via Terminal Físico."); }
    gerarNotaFiscal(): void { console.log("Nota Fiscal impressa."); }
    imprimirEtiquetaFisica(): void { console.log("Etiqueta de envio gerada."); }
}

// O Pedido Digital é protegido pelo ISP: não implementa ILogistica e não lança erros falsos (LSP).
class PedidoDigital extends PedidoBase implements IPagamento, INotaFiscal {
    processarPagamento(): void { console.log("Pago via Gateway Online."); }
    gerarNotaFiscal(): void { console.log("Nota Fiscal enviada por e-mail."); }
}