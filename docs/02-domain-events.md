# Eventos de Domínio (Domain Events)

## O que são Eventos de Domínio?

Eventos de Domínio são uma parte fundamental dos conceitos de Domain-Driven Design (DDD), que foca na modelagem de software baseada no domínio do negócio. Eventos de Domínio são instâncias que representam algo importante que aconteceu no domínio. Eles são uma maneira de comunicar mudanças dentro do sistema de uma maneira que não dependa dos detalhes da implementação, mas que reflita mudanças significativas do ponto de vista do negócio.

## Por que usar Eventos de Domínio?

- **Desacoplamento**: Permite que diferentes partes do sistema reajam a mudanças sem depender uma da outra.
- **Rastreabilidade**: Fornece um registro de ações importantes que ocorreram no sistema.
- **Integração**: Facilita a integração com outros sistemas ou componentes, internos ou externos.

## Exemplo de Evento de Domínio em TypeScript

Vamos considerar um exemplo de um sistema bancário onde uma transferência é realizada. O evento de domínio pode ser algo como `TransferenciaRealizada`.

```typescript
// Definição do evento de domínio
class TransferenciaRealizada {
  constructor(
    public readonly contaOrigemId: string,
    public readonly contaDestinoId: string,
    public readonly valor: number,
    public readonly data: Date
  ) {}
}

// Publicação do evento
class ContaBancaria {
  // ...outras propriedades e métodos...

  realizarTransferencia(contaDestinoId: string, valor: number) {
    // ...lógica de transferência...

    // Publica o evento que a transferência foi realizada
    const evento = new TransferenciaRealizada(this.id, contaDestinoId, valor, new Date());
    dominioEventos.publicar(evento);
  }
}

// Manipulação do evento
class HistoricoTransacoes {
  // ...outras propriedades e métodos...

  manipularEvento(evento: TransferenciaRealizada) {
    // Atualiza o histórico de transações com base no evento
    // ...lógica para adicionar a transação ao histórico...
  }
}

// Sistema de publicação de eventos (pode ser uma implementação de um message broker, por exemplo)
const dominioEventos = {
  // ...implementação de publicação de eventos...
};
```

## Domain Events - Components

- Event - Eventos de Domínio que são instâncias que representam algo importante que aconteceu no domínio.
- Handler - Executa um processo quando um evento é chamado.
- Event Dispatcher - Responsável por armazenar e executar os handlers de um evento quando ele for disparado.
