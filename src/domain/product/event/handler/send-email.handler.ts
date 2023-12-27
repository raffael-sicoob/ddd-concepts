import { EventHandlerInterface } from "@/domain/@shared/events/event-handler.interface";
import { ProductCreatedEvent } from "../product-created.event";

export class SendEmailWhenProductIsCreatedHandler
	implements EventHandlerInterface<ProductCreatedEvent>
{
	handle(event: ProductCreatedEvent): void {
		console.log(
			`Sending email to ... ${event.eventData.name} - ${event.eventData.description}`,
		);
	}
}
