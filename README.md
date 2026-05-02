1. Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única
O que foi alterado: A responsabilidade de se comunicar com o banco de dados e enviar e-mails foi retirada da classe principal de pedidos. Foram criadas classes especialistas: MySQLPedidoRepository e EmailService.

Por que resolve o problema: Anteriormente, se a forma de enviar e-mail mudasse, a classe de Pedido precisaria ser alterada. Agora, cada classe tem apenas um motivo para mudar. A persistência de dados é tratada exclusivamente pelo repositório, e as notificações pelo serviço de e-mail.

2. Open/Closed Principle (OCP) - Princípio Aberto/Fechado
O que foi alterado: A lógica de cálculo de descontos foi extraída para a interface IDesconto, que é implementada por classes como DescontoVIP e DescontoEstudante (padrão Strategy).

Por que resolve o problema: O código agora está "aberto para extensão e fechado para modificação". Se precisarmos criar um desconto de "Black Friday", basta criar uma nova classe que implemente IDesconto. Não é mais necessário alterar ou adicionar if/else dentro da classe PedidoBase.

3. Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov
O que foi alterado: A herança falha, onde um PedidoDigital era forçado a ter um método calcularFrete() (lançando um erro para anular o comportamento), foi corrigida. Criamos a classe abstrata PedidoBase com os atributos comuns a todos os pedidos. Apenas o PedidoFisico possui o método de frete.

Por que resolve o problema: O princípio determina que uma classe filha deve poder substituir sua classe pai sem quebrar o sistema. Como o PedidoDigital não herda mais o comportamento inútil de frete, eliminamos o risco de exceções e quebras de contrato em tempo de execução.

4. Interface Segregation Principle (ISP) - Princípio da Segregação de Interface
O que foi alterado: A interface genérica ITarefasPedido foi fatiada em três interfaces menores, coesas e independentes: IPagamento, INotaFiscal e ILogistica.

Por que resolve o problema: O PedidoDigital era obrigado a implementar o método imprimirEtiquetaFisica(), o que não fazia sentido para a sua natureza. Com a segregação, o pedido físico assina os três contratos, enquanto o pedido digital assina apenas pagamento e nota fiscal. Nenhuma classe é forçada a depender de métodos que não utiliza.

5. Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência
O que foi alterado: A classe PedidoBase deixou de depender diretamente das classes concretas MySQLPedidoRepository e EmailService. Foram introduzidas as interfaces IPedidoRepository e INotificacaoService, e essas dependências agora são injetadas através do construtor da classe base.

Por que resolve o problema: As regras de negócio (alto nível) agora dependem exclusivamente de abstrações (interfaces), e não de detalhes de infraestrutura (baixo nível). Isso desacopla totalmente o sistema: é possível trocar o MySQL por um banco MongoDB ou o serviço de E-mail por um serviço de SMS sem alterar uma única linha da lógica de PedidoBase.
