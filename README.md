1. Single Responsibility Principle (SRP) - Princípio da Responsabilidade Única
   
Alteração: A responsabilidade de se comunicar com o banco de dados e enviar e-mails foi retirada da classe principal de pedidos. Foram criadas classes especialistas: MySQLPedidoRepository e EmailService.

Solução: Anteriormente, se a forma de enviar e-mail mudasse, a classe de Pedido precisaria ser alterada. Agora, cada classe tem apenas um motivo para mudar. A persistência de dados é tratada exclusivamente pelo repositório, e as notificações pelo serviço de e-mail.

2. Open/Closed Principle (OCP) - Princípio Aberto/Fechado
   
Alteração: A lógica de cálculo de descontos foi extraída para a interface IDesconto, que é implementada por classes como DescontoVIP e DescontoEstudante (padrão Strategy).

Solução: O código agora está "aberto para extensão e fechado para modificação". Se precisar criar um desconto de "Black Friday", basta criar uma nova classe que implemente IDesconto. Não é mais necessário alterar ou adicionar if/else dentro da classe PedidoBase.

3. Liskov Substitution Principle (LSP) - Princípio da Substituição de Liskov
   
Alteração: A herança falha, onde um PedidoDigital era forçado a ter um método calcularFrete() foi corrigida. Criado a classe abstrata PedidoBase com os atributos comuns a todos os pedidos. Apenas o PedidoFisico possui o método de frete.

Solução: O princípio determina que uma classe filha deve poder substituir sua classe pai sem quebrar o sistema. Como o PedidoDigital não herda mais o comportamento inútil de frete, foi eliminado o risco de exceções e quebras de contrato em tempo de execução.

4. Interface Segregation Principle (ISP) - Princípio da Segregação de Interface
   
Alteração: A interface genérica ITarefasPedido foi dividida em três interfaces menores, coesas e independentes: IPagamento, INotaFiscal e ILogistica.

Solução: O PedidoDigital era obrigado a implementar o método imprimirEtiquetaFisica(), o que não fazia sentido para a sua natureza. Com a segregação, o pedido físico assina os três contratos, enquanto o pedido digital assina apenas pagamento e nota fiscal. Nenhuma classe é forçada a depender de métodos que não utiliza.

5. Dependency Inversion Principle (DIP) - Princípio da Inversão de Dependência
   
Alteração: A classe PedidoBase deixou de depender diretamente das classes concretas MySQLPedidoRepository e EmailService. Foram introduzidas as interfaces IPedidoRepository e INotificacaoService, e essas dependências agora são injetadas através do construtor da classe base.

Solução: As regras de negócio agora dependem exclusivamente de abstrações (interfaces), e não de detalhes de infraestrutura (baixo nível). Isso desacopla o sistema: é possível trocar o MySQL por um banco MongoDB ou o serviço de E-mail por um serviço de SMS sem alterar uma única linha da lógica de PedidoBase.
