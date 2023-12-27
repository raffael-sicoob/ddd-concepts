import { EventDispatcher } from "@/domain/@shared/events/event-dispatcher";
import { describe, expect, it, spyOn } from "bun:test";
import { SendConsoleLogWhenCustomerIsUpdatedHandler } from "./handler/send-console-log.handler";
import { UpdateAddressEvent } from "./update-address.event";

describe("Event: Update Address Event", () => {
	it("should be able update address when customer is updated", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendConsoleLogWhenCustomerIsUpdatedHandler();
		const spyEventHandler = spyOn(eventHandler, "handle");

		eventDispatcher.register("UpdateAddressEvent", eventHandler);

		expect(eventDispatcher.getEventHandlers.UpdateAddressEvent.length).toBe(1);

		const updateAddressEvent = new UpdateAddressEvent({
			id: "1",
			name: "John Doe",
			address: "123 Main Street",
		});

		eventDispatcher.notify(updateAddressEvent);

		expect(spyEventHandler).toHaveBeenCalledWith(updateAddressEvent);
	});
});
