
import {EventListener} from "./interfaces.js"

export function prepareBindListeners() {
	return function bindListeners() {
		return function classDecorator<T extends {new(...args:any[]): any}>(Class: T) {
			console.log("CLASS DECORATOR")
			return class extends Class {
				__listeners: EventListener[] = []
				connectedCallback() {
					super.connectedCallback()
					for (const {target, name, handler, options} of this.__listeners) {
						target.addEventListener(name, handler, options)
					}
				}
				disconnectedCallback() {
					super.disconnectedCallback()
					for (const {target, name, handler, options} of this.__listeners) {
						target.removeEventListener(name, handler)
					}
				}
			}
		}
	}
}

export const bindListeners = prepareBindListeners()
