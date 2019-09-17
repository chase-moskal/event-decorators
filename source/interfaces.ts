
export type EventDetails<T extends CustomEvent>
= T extends CustomEvent<infer D> ? D : never

export type Dispatcher<E extends CustomEvent> = (
options?: CustomEventInit<EventDetails<E>>
) => void

export interface EventListener {
	name: string
	target: EventTarget
	handler: (event: Event) => void
	options?: boolean | AddEventListenerOptions
}

export interface EventDecoratorOptions extends CustomEventInit {
	name?: string
}

export interface ListenerDecoratorOptions extends AddEventListenerOptions {
	name?: string
	target?: EventTarget
}

export type EventClass = new(...args: any[]) => Event | CustomEvent
