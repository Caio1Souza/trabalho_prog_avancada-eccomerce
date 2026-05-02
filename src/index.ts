class PedidoRepository {
    salvar(pedido: PedidoBase): void {
        console.log("Salvando dados no banco de dados...");
    }
}

class EmailService {
    enviarConfirmacao(cliente: string): void {
        console.log(`Enviando e-mail para o cliente...`);
    }
}

interface IDesconto {
    calcular(valor: number): number;
}

class DescontoVIP implements IDesconto {
    calcular(valor: number): number { return valor * 0.20; }
}

class DescontoEstudante implements IDesconto {
    calcular(valor: number): number { return valor * 0.10; }
}

class SemDesconto implements IDesconto {
    calcular(valor: number): number { return 0; }
}

abstract class PedidoBase {
    constructor(
        public valorTotal: number, 
        protected estrategiaDesconto: IDesconto
    ) {}

    calcularDesconto(): number {
        return this.estrategiaDesconto.calcular(this.valorTotal);
    }
}


interface IPagamento {
    processarPagamento(): void;
}

interface INotaFiscal {
    gerarNotaFiscal(): void;
}

interface ILogistica {
    imprimirEtiquetaFisica(): void;
}


class PedidoFisico extends PedidoBase implements IPagamento, INotaFiscal, ILogistica {
    calcularFrete(): number {
        return 15.0; 
    }

    processarPagamento(): void {
        console.log("Pagamento processado (Físico).");
    }

    gerarNotaFiscal(): void {
        console.log("Nota fiscal emitida.");
    }

    imprimirEtiquetaFisica(): void {
        console.log("Etiqueta impressa para despacho.");
    }
}

class PedidoDigital extends PedidoBase implements IPagamento, INotaFiscal {
    processarPagamento(): void {
        console.log("Pagamento online processado.");
    }

    gerarNotaFiscal(): void {
        console.log("NF-e enviada por e-mail.");
    }
}