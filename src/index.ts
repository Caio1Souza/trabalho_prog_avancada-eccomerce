/**
 * ==============================================================================
 * PRINCÍPIO D: DIP (Dependency Inversion Principle - Inversão de Dependência)
 * ==============================================================================
 * Criamos interfaces para que as classes de alto nível não dependam de classes
 * concretas de baixo nível.
 */
interface IPedidoRepository {
    salvar(pedido: PedidoBase): void;
}

interface INotificacaoService {
    enviar(mensagem: string): void;
}

/**
 * ==============================================================================
 * PRINCÍPIO O: OCP (Open/Closed Principle - Aberto/Fechado)
 * ==============================================================================
 * Usamos o padrão Strategy para descontos. Podemos adicionar novos descontos 
 * criando novas classes sem alterar a classe PedidoBase.
 */
interface IDesconto {
    calcular(valor: number): number;
}

class DescontoVIP implements IDesconto {
    calcular(valor: number): number { return valor * 0.20; }
}

class DescontoEstudante implements IDesconto {
    calcular(valor: number): number { return valor * 0.10; }
}

/**
 * ==============================================================================
 * PRINCÍPIO I: ISP (Interface Segregation Principle - Segregação de Interface)
 * ==============================================================================
 * Interfaces pequenas e específicas. O Pedido Digital não será forçado a 
 * implementar métodos de logística física.
 */
interface IPagamento { processarPagamento(): void; }
interface INotaFiscal { gerarNotaFiscal(): void; }
interface ILogistica { imprimirEtiquetaFisica(): void; }

/**
 * ==============================================================================
 * PRINCÍPIO S: SRP (Single Responsibility Principle - Responsabilidade Única)
 * ==============================================================================
 * Classes especialistas: uma para banco de dados e outra para comunicação.
 */
class MySQLPedidoRepository implements IPedidoRepository {
    salvar(pedido: PedidoBase): void {
        console.log("Salvando dados no MySQL...");
    }
}

class EmailService implements INotificacaoService {
    enviar(mensagem: string): void {
        console.log(`Notificação enviada: ${mensagem}`);
    }
}

/**
 * ==============================================================================
 * PRINCÍPIO L: LSP (Liskov Substitution Principle - Substituição de Liskov)
 * ==============================================================================
 * A hierarquia foi corrigida. PedidoBase contém o que é comum a todos.
 * PedidoDigital pode substituir PedidoBase sem causar erros inesperados de frete.
 */
abstract class PedidoBase {
    constructor(
        public valorTotal: number, 
        protected estrategiaDesconto: IDesconto,
        // DIP: Injeção de dependência via interfaces
        protected repository: IPedidoRepository, 
        protected notificacao: INotificacaoService 
    ) {}

    calcularDesconto(): number {
        return this.estrategiaDesconto.calcular(this.valorTotal);
    }

    // SRP: A classe Pedido delega a persistência e notificação para os serviços
    concluirPedido(): void {
        this.repository.salvar(this);
        this.notificacao.enviar("Seu pedido foi processado!");
    }
}

// Implementação que cumpre ISP e LSP
class PedidoFisico extends PedidoBase implements IPagamento, INotaFiscal, ILogistica {
    calcularFrete(): number { return 15.0; }
    processarPagamento(): void { console.log("Pagamento físico processado."); }
    gerarNotaFiscal(): void { console.log("NF emitida."); }
    imprimirEtiquetaFisica(): void { console.log("Etiqueta impressa."); }
}

// Implementação que cumpre ISP e LSP (Sem métodos inúteis)
class PedidoDigital extends PedidoBase implements IPagamento, INotaFiscal {
    processarPagamento(): void { console.log("Pagamento online processado."); }
    gerarNotaFiscal(): void { console.log("NF digital enviada por e-mail."); }
}/**
 * ==============================================================================
 * PRINCÍPIO D: DIP (Dependency Inversion Principle - Inversão de Dependência)
 * ==============================================================================
 * Criamos interfaces para que as classes de alto nível não dependam de classes
 * concretas de baixo nível.
 */
interface IPedidoRepository {
    salvar(pedido: PedidoBase): void;
}

interface INotificacaoService {
    enviar(mensagem: string): void;
}

/**
 * ==============================================================================
 * PRINCÍPIO O: OCP (Open/Closed Principle - Aberto/Fechado)
 * ==============================================================================
 * Usamos o padrão Strategy para descontos. Podemos adicionar novos descontos 
 * criando novas classes sem alterar a classe PedidoBase.
 */
interface IDesconto {
    calcular(valor: number): number;
}

class DescontoVIP implements IDesconto {
    calcular(valor: number): number { return valor * 0.20; }
}

class DescontoEstudante implements IDesconto {
    calcular(valor: number): number { return valor * 0.10; }
}

/**
 * ==============================================================================
 * PRINCÍPIO I: ISP (Interface Segregation Principle - Segregação de Interface)
 * ==============================================================================
 * Interfaces pequenas e específicas. O Pedido Digital não será forçado a 
 * implementar métodos de logística física.
 */
interface IPagamento { processarPagamento(): void; }
interface INotaFiscal { gerarNotaFiscal(): void; }
interface ILogistica { imprimirEtiquetaFisica(): void; }

/**
 * ==============================================================================
 * PRINCÍPIO S: SRP (Single Responsibility Principle - Responsabilidade Única)
 * ==============================================================================
 * Classes especialistas: uma para banco de dados e outra para comunicação.
 */
class MySQLPedidoRepository implements IPedidoRepository {
    salvar(pedido: PedidoBase): void {
        console.log("Salvando dados no MySQL...");
    }
}

class EmailService implements INotificacaoService {
    enviar(mensagem: string): void {
        console.log(`Notificação enviada: ${mensagem}`);
    }
}

/**
 * ==============================================================================
 * PRINCÍPIO L: LSP (Liskov Substitution Principle - Substituição de Liskov)
 * ==============================================================================
 * A hierarquia foi corrigida. PedidoBase contém o que é comum a todos.
 * PedidoDigital pode substituir PedidoBase sem causar erros inesperados de frete.
 */
abstract class PedidoBase {
    constructor(
        public valorTotal: number, 
        protected estrategiaDesconto: IDesconto,
        // DIP: Injeção de dependência via interfaces
        protected repository: IPedidoRepository, 
        protected notificacao: INotificacaoService 
    ) {}

    calcularDesconto(): number {
        return this.estrategiaDesconto.calcular(this.valorTotal);
    }

    // SRP: A classe Pedido delega a persistência e notificação para os serviços
    concluirPedido(): void {
        this.repository.salvar(this);
        this.notificacao.enviar("Seu pedido foi processado!");
    }
}

// Implementação que cumpre ISP e LSP
class PedidoFisico extends PedidoBase implements IPagamento, INotaFiscal, ILogistica {
    calcularFrete(): number { return 15.0; }
    processarPagamento(): void { console.log("Pagamento físico processado."); }
    gerarNotaFiscal(): void { console.log("NF emitida."); }
    imprimirEtiquetaFisica(): void { console.log("Etiqueta impressa."); }
}

// Implementação que cumpre ISP e LSP (Sem métodos inúteis)
class PedidoDigital extends PedidoBase implements IPagamento, INotaFiscal {
    processarPagamento(): void { console.log("Pagamento online processado."); }
    gerarNotaFiscal(): void { console.log("NF digital enviada por e-mail."); }
}