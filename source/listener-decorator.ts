
import {dashifyEventName} from "./event-decorator.js"
import {
	EventClass,
	EventListener,
	ListenerDecoratorOptions,
} from "./interfaces.js"

function connectedCallback() {
	for (const {target, name, handler, options} of this.__listeners)
		target.addEventListener(name, handler, options)
}

function disconnectedCallback() {
	for (const {target, name, handler} of this.__listeners)
		target.removeEventListener(name, handler)
}

export function prepareListenerDecorator(settings = {}) {
	return function listener(
		Event: EventClass,
		config: ListenerDecoratorOptions = {}
	): PropertyDecorator {
		return (prototype, key) => {
			Object.defineProperty(prototype, key, {
				set(handler) {
					const {
						name = dashifyEventName(Event),
						target = this,
						...options
					} = config
					const listener: EventListener = {
						name,
						target,
						handler,
						options,
					}
					if (!this.__listeners) this.__listeners = []
					this.__listeners.push(listener)
					if (!this["__private-sneaky"]) this["__private-sneaky"] = {}
					this["__private-sneaky"][key] = {
						handler,
						add: () => {
							target.addEventListener(name, handler, options)
						},
						remove: () => {
							target.removeEventListener(name, handler)
						}
					}
				},
				get() {
					return this["__private-sneaky"]
						? this["__private-sneaky"][key]
						: null
				},
				enumerable: false,
				configurable: false
			})

			if (!prototype["__listener-decorator-hitched"]) {
				const existingConnectedCallback = prototype["connectedCallback"]
				prototype["connectedCallback"] = function() {
					connectedCallback.apply(this, arguments)
					existingConnectedCallback.apply(this, arguments)
				}

				const existingDisconnectedCallback = prototype["disconnectedCallback"]
				prototype["disconnectedCallback"] = function() {
					disconnectedCallback.apply(this, arguments)
					existingDisconnectedCallback.apply(this, arguments)
				}

				prototype["__listener-decorator-hitched"] = true
			}
		}
	}
}

export const listener = prepareListenerDecorator()
