import { EventInterface } from "@/@shared/events/event.interface";

export class ProductCreatedEvent implements EventInterface {
	dataTimeOccurred: Date;
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	eventData: any;

	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(eventData: any) {
		this.dataTimeOccurred = new Date();
		this.eventData = eventData;
	}
}
