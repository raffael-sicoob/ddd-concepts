# ddd-concepts

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
