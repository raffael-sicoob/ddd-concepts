import { describe, expect, it, jest, spyOn } from "bun:test";
import { ProductCreatedEvent } from "@/domain/product/product-created.event";
import { SendEmailWhenProductIsCreatedHandler } from "@/domain/product/send-email.event";
import { EventDispatcher } from "./event-dispatcher";

describe("Domain events tests", () => {
	it("should register an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();

		expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(1);

		expect(
			eventDispatcher.getEventHandlers.ProductCreatedEvent[0],
		).toMatchObject(eventHandler);
	});

	it("should unregister an event handler", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toMatchObject([
			eventHandler,
		]);

		eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

		expect(eventDispatcher.getEventHandlers.ProductCreatedEvent).toBeDefined();

		expect(eventDispatcher.getEventHandlers.ProductCreatedEvent.length).toBe(0);
	});

	it("should unregister all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		expect(
			eventDispatcher.getEventHandlers.ProductCreatedEvent[0],
		).toMatchObject(eventHandler);

		eventDispatcher.unregisterAll();
		console.log("Verificando", eventDispatcher.getEventHandlers);
		expect(
			eventDispatcher.getEventHandlers.ProductCreatedEvent,
		).toBeUndefined();
	});

	it("should notify all event handlers", () => {
		const eventDispatcher = new EventDispatcher();
		const eventHandler = new SendEmailWhenProductIsCreatedHandler();
		const spyEventHandler = spyOn(eventHandler, "handle");

		eventDispatcher.register("ProductCreatedEvent", eventHandler);

		expect(
			eventDispatcher.getEventHandlers.ProductCreatedEvent[0],
		).toMatchObject(eventHandler);

		const productCreatedEvent = new ProductCreatedEvent({
			name: "Product 1",
			description: "Product 1 description",
			price: 10,
		});

		eventDispatcher.notify(productCreatedEvent);

		expect(spyEventHandler).toHaveBeenCalled();
	});
});
