# Repository Pattern

## Overview

> "Se refere a um local de armazenamento, geralmente considerado um local de
> segurança ou preservação dos itens armazenados."
---
> "São semelhantes as coleções de dados, embora as regras de negócio e o
> comportamento dos usuários sejam diferentes."
---
> "De modo geral existe uma relação de *um-para-um* entre um **Aggregate** e um
> **Repository**."

## Características

1. Abstração: permite abstrair a forma como os dados são armazenados e recuperados, fornecendo uma interface consistente para a aplicação.

2. Isolamento: isola a lógica de acesso a dados, permitindo que a aplicação não dependa diretamente de detalhes de implementação, como o tipo de banco de dados utilizado.

3. Centralização: centraliza as operações de acesso a dados em um único lugar, facilitando a manutenção e evolução do código.

4. Testabilidade: facilita a criação de testes, pois é possível criar implementações mock ou stub para simular o acesso a dados durante os testes.

5. Flexibilidade: permite trocar facilmente a implementação de acesso a dados, sem afetar o restante da aplicação.

6. Organização: ajuda a organizar o código relacionado ao acesso a dados, separando-o do restante da aplicação.

Em resumo, o padrão Repository é uma abstração que isola a lógica de acesso a dados, facilitando a manutenção, testabilidade e flexibilidade da aplicação.

---
⏭️ **Proxima Página:** [Domain Events](./02-domain-events.md)
