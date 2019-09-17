
import {LitElement, property, html, css} from "lit-element"

import {listener} from "../../decorators.js"
import {RobotDestroyHumanityEvent, RobotSelfAwareEvent} from "../events.js"

export class RobotVisualizer extends LitElement {

	@listener(RobotSelfAwareEvent, {target: window})
	private _handleRobotSelfAware = (event: RobotSelfAwareEvent) => {
		console.log("HANDLE ROBOT SELF AWARE")
	}

	@listener(RobotDestroyHumanityEvent, {target: window})
	private _handleRobotDestroyHumanity = (event: RobotDestroyHumanityEvent) => {
		console.log("HANDLE ROBOT DESTROY HUMANITY")
	}

	@listener(CustomEvent, {name: "save-humanity", target: window})
	private _handleRobotSaveHumanity = (event: CustomEvent) => {
		console.log("HANDLE ROBOT SAVE HUMANITY")
	}

	connectedCallback() {
		super.connectedCallback()
		console.log("ROBOT VISUALIZER CONNECTED")
	}

	disconnectedCallback() {
		super.disconnectedCallback()
		console.log("ROBOT VISUALIZER DISCONNECTED")
	}

	render() {
		html`
			<p>robot visualizer</p>
		`
	}
}
