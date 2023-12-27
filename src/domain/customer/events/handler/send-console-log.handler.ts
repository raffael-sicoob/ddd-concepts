import { EventHandlerInterface } from "@/@shared/events/event-handler.interface";
import { UpdateAddressEvent } from "../update-address.event";

export class SendConsoleLogWhenCustomerIsUpdatedHandler
	implements EventHandlerInterface<UpdateAddressEvent>
{
	handle(event: UpdateAddressEvent): void {
		console.log(
			`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`,
		);
	}
}
