
import {ActionPayload, RobotAwareness} from "./interfaces.js"

export class RobotSelfAwareEvent extends CustomEvent<RobotAwareness> {}
export class RobotDestroyHumanityEvent extends CustomEvent<ActionPayload> {}
