
import {LitElement, html, css} from "lit-element"

import {bubblingEvent, Dispatcher, listener} from "../../decorators.js"
import {RobotDestroyHumanityEvent, RobotSelfAwareEvent} from "../events.js"

export class MegaRobot extends LitElement {

	@bubblingEvent(RobotSelfAwareEvent)
	private _dispatchRobotSelfAware: Dispatcher<RobotSelfAwareEvent>

	@bubblingEvent(RobotDestroyHumanityEvent)
	private _dispatchDestroyHumanity: Dispatcher<RobotDestroyHumanityEvent>

	@bubblingEvent(CustomEvent, {name: "save-humanity"})
	private _dispatchSaveHumanity: Dispatcher<CustomEvent>

	private _handleRobotButtonClick = () => {
		this._dispatchRobotSelfAware({detail: {
			level: Math.floor(Math.random() * 11)
		}})
	}

	private _handleDestroyButtonClick = () => {
		this._dispatchDestroyHumanity({detail: {
			timestamp: Date.now()
		}})
	}

	private _handleSaveHumanity = () => {
		this._dispatchSaveHumanity()
	}

	static get styles() {return css``}

	render() {
		return html`
			<p>mega robot</p>
			<button @click=${this._handleRobotButtonClick}>Robot awareness check</button>
			<button @click=${this._handleDestroyButtonClick}>Destroy humanity</button>
			<button @click=${this._handleSaveHumanity}>Save humanity</button>
		`
	}
}
