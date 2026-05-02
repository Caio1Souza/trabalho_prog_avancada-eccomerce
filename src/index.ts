
class PedidoRepository {
    salvar(pedido: Pedido): void {
        console.log("Salvando dados no MySQL...");
    }
}

class EmailService {
    enviarConfirmacao(cliente: string): void {
        console.log(`Enviando e-mail de confirmação para o cliente...`);
    }
}


interface IDesconto {
    calcular(valor: number): number;
}

class DescontoVIP implements IDesconto {
    calcular(valor: number): number {
        return valor * 0.20;
    }
}

class DescontoEstudante implements IDesconto {
    calcular(valor: number): number {
        return valor * 0.10;
    }
}

class SemDesconto implements IDesconto {
    calcular(valor: number): number {
        return 0;
    }
}


class Pedido {
    public valorTotal: number;
   
    private estrategiaDesconto: IDesconto;

    constructor(valorTotal: number, estrategiaDesconto: IDesconto) {
        this.valorTotal = valorTotal;
        this.estrategiaDesconto = estrategiaDesconto;
    }

    // OCP: O método calcularDesconto ficou genérico. Não precisa de IF/ELSE.
    calcularDesconto(): number {
        return this.estrategiaDesconto.calcular(this.valorTotal);
    }

    calcularFrete(): number {
        return 15.0;
    }
}


interface ITarefasPedido {
    processarPagamento(): void;
    gerarNotaFiscal(): void;
    imprimirEtiquetaFisica(): void;
}

class PedidoProdutoDigital extends Pedido implements ITarefasPedido {
    calcularFrete(): number {
        throw new Error("Erro: Produtos digitais não possuem frete.");
    }

    processarPagamento(): void {
        console.log("Pagamento processado online.");
    }

    gerarNotaFiscal(): void {
        console.log("Nota fiscal digital gerada.");
    }

    imprimirEtiquetaFisica(): void {
        throw new Error("Erro: Não é possível imprimir etiqueta para produto digital.");
    }
}