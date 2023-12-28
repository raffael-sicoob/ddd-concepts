import { describe, expect, it, spyOn } from "bun:test";
import { EventDispatcher } from "@/domain/@shared/events/event-dispatcher";
import { CustomerCreatedEvent } from "./customer-created.event";
import { SendMessagesWhenCustomerIsCreatedHandler } from "./handler/send-message.handler";
import { SendMessagesWhenCustomerIsCreatedHandler2 } from "./handler/send-message2.handler";

describe("Event: Customer Created Event", () => {
	it("should be able send message when customer is created", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler1 = new SendMessagesWhenCustomerIsCreatedHandler();
		const eventHandler2 = new SendMessagesWhenCustomerIsCreatedHandler2();

		const spyEventHandler = spyOn(eventHandler1, "handle");

		eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
		eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

		expect(eventDispatcher.getEventHandlers.CustomerCreatedEvent.length).toBe(
			2,
		);

		const customerCreatedEvent = new CustomerCreatedEvent({
			name: "John Doe",
			email: "pDwX7@example.com",
		});

		eventDispatcher.notify(customerCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalledWith(customerCreatedEvent);
	});
});
