# Concepts of Domain Driven Design

## Entities

> "É algo único que é capaz de ser alterado de forma contínua durante um longo período de tempo."
---
> "É algo que possui uma continuidade em seu ciclo de vida e pode ser distinguida independente de seu atributo."

- Uma entidade por padrão sempre vai se alto validar

## Value Objects

> "Quando você se preocupa apenas com os atributos de um elemento de um model, classifique isso como um Value Object."
---
> "Trate os Value Objects como imutáveis."

Value Objects são objetos imutáveis que representam um conceito do domínio.
Eles são usados para encapsular um conjunto de atributos relacionados e fornecer comportamento específico.
Value Objects são identificados pelo seu valor e não pela sua identidade.

Principais características dos Value Objects:

- São imutáveis: uma vez criados, não podem ser alterados.
- Igualdade baseada em valor: dois Value Objects são considerados iguais se possuem o mesmo valor.
- São substituíveis: podem ser substituídos por outro Value Object com o mesmo valor.
- Não têm identidade: eles são identificados pelo valor dos seus atributos.
- São normalmente usados como atributos de Entidades.

Exemplos de Value Objects:

- Money: um objeto que representa uma quantia de dinheiro, com atributos como valor e moeda.
- Address: um objeto que representa um endereço, com atributos como rua, número, cidade, etc.
- DateRange: um objeto que representa um intervalo de datas, com atributos como data inicial e data final.
- PhoneNumber: um objeto que representa um número de telefone, com atributos como código de área e número.

## Aggregates

> "É um conjunto de objetos associados que tratamos como uma unidade para o propósito de mudança de dados."
---

Principais características dos Aggregates:

- Consistência transacional: Todas as alterações em objetos dentro de um aggregate devem ser tratadas como uma única transação.
- Raiz do Aggregate: Cada aggregate possui uma raiz, que é uma entidade que atua como ponto de acesso para o aggregate.
- Invariante do Aggregate: Os objetos dentro de um aggregate devem ser consistentes entre si e respeitar as regras de negócio definidas.
- Controle de Acesso: Acesso a objetos dentro de um aggregate deve ser feito através da raiz do aggregate, garantindo a consistência dos dados.

Exemplos de Aggregates:

1. OrderAggregate:
   - Descrição: Agregado que representa um pedido de compra.
   - Componentes: OrderEntity (raiz do aggregate), OrderItemEntity, CustomerEntity, AddressValueObject, PaymentMethodValueObject, etc.

2. ShoppingCartAggregate:
   - Descrição: Agregado que representa o carrinho de compras de um cliente.
   - Componentes: ShoppingCartEntity (raiz do aggregate), CartItemEntity, ProductEntity, etc.

3. BlogPostAggregate:
   - Descrição: Agregado que representa um post de um blog.
   - Componentes: BlogPostEntity (raiz do aggregate), CommentEntity, AuthorEntity, etc.

4. UserAccountAggregate:
   - Descrição: Agregado que representa a conta de um usuário.

   - Componentes: UserAccountEntity (raiz do aggregate), ProfileEntity, AddressValueObject, CreditCardEntity, etc.

## Domain Services

> "Um Domain Service é uma operação sem estado que cumpre uma tarefa específica do domínio."
---

Principais serviços dos Domain Services:

- Pode ser usado quando uma operação que precisa ser executada não se encaixa em um aggregate ou value object.
- Uma pode realizar uma ação que pode afetar todas as entidades?
- Como pode ser possível realizar uma operação em lote?
- Como calcular algo cuja as informações constam em mais de uma entidade?

Cuidados com o Domain Service:

- Quando estiver muitos Domain Services no projeto, pode ser que os Aggregates estão anêmicos.
- Domain Services são stateless, ou seja, não armazenam estado.

## 🔖 Referências

- [Domain-Driven Design - Com Flutter](https://medium.com/@jasonsantiagobutler/domain-driven-design-com-flutter-eba075dbf285)

---

⏭️ **Proxima Página:** [Repositories](./01-repositories.md)
