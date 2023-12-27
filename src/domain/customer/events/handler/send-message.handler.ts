import { EventHandlerInterface } from "@/domain/@shared/events/event-handler.interface";
import { CustomerCreatedEvent } from "../customer-created.event";

export class SendMessagesWhenCustomerIsCreatedHandler
	implements EventHandlerInterface<CustomerCreatedEvent>
{
	handle(event: CustomerCreatedEvent): void {
		console.log(
			`Sending message to ... ${event.eventData.name} - ${event.eventData.email}`,
		);
	}
}
