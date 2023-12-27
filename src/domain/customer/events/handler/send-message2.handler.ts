import { EventHandlerInterface } from "@/@shared/events/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendMessagesWhenCustomerIsCreatedHandler2
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(event: CustomerCreatedEvent): void {
		console.log(
			`Second sending message to ... ${event.eventData.name} - ${event.eventData.email}`,
		);
	}
}
