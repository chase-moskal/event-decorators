
import {dashify} from "./toolbox/dashify.js"

export function dashifyEventName(EventClass: Function) {
	const dashed = dashify(EventClass.name)
	const result = /^(.*)-event$/i.exec(dashed)
	return result ? result[1] : dashed
}

import {EventDecoratorOptions, EventClass} from "./interfaces.js"

export function prepareEventDecorator(
	settings: CustomEventInit = {}
) {
	return function event(
		EventClass: EventClass,
		config: EventDecoratorOptions = {}
	): PropertyDecorator {
		const {name = dashifyEventName(EventClass), ...config2} = config
		return (target, key) => {
			target[key] = <any>function(this, options: CustomEventInit = {}) {
				this.dispatchEvent(new EventClass(
					name,
					{...settings, ...config2, ...options}
				))
			}
		}
	}
}

export const event = prepareEventDecorator()

export const bubblingEvent = prepareEventDecorator({
	bubbles: true,
	composed: true
})
