import * as Assert from '../Assert/Assert.js'
import * as DebuggerCreateIpcConnection from '../DebuggerCreateIpcConnection/DebuggerCreateIpcConnection.js'
import * as DebuggerCreateRpcConnection from '../DebuggerCreateRpcConnection/DebuggerCreateRpcConnection.js'
import * as DevtoolsEventType from '../DevtoolsEventType/DevtoolsEventType.js'
import { DevtoolsProtocolTarget } from '../DevtoolsProtocol/DevtoolsProtocol.js'
import * as ObjectType from '../ObjectType/ObjectType.js'
import * as ScenarioFunctions from '../ScenarioFunctions/ScenarioFunctions.js'
import * as SessionState from '../SessionState/SessionState.js'

export const connectDevtools = async (devtoolsWebSocketUrl) => {
  Assert.string(devtoolsWebSocketUrl)
  const browserIpc = await DebuggerCreateIpcConnection.createConnection(devtoolsWebSocketUrl)
  const browserRpc = DebuggerCreateRpcConnection.createRpc(browserIpc)

  SessionState.addSession('browser', {
    type: ObjectType.Browser,
    objectType: ObjectType.Browser,
    url: '',
    sessionId: '',
    rpc: browserRpc,
  })

  browserRpc.on(DevtoolsEventType.DebuggerPaused, ScenarioFunctions.handlePaused)
  browserRpc.on(DevtoolsEventType.DebuggerResumed, ScenarioFunctions.handleResumed)
  browserRpc.on(DevtoolsEventType.PageFrameNavigated, ScenarioFunctions.handlePageFrameNavigated)
  browserRpc.on(DevtoolsEventType.PageLifeCycleEvent, ScenarioFunctions.handlePageLifeCycleEvent)
  browserRpc.on(DevtoolsEventType.PageLoadEventFired, ScenarioFunctions.handlePageLoadEventFired)
  browserRpc.on(DevtoolsEventType.RuntimeExecutionContextCreated, ScenarioFunctions.handleRuntimeExecutionContextCreated)
  browserRpc.on(DevtoolsEventType.RuntimeExecutionContextDestroyed, ScenarioFunctions.handleRuntimeExecutionContextDestroyed)
  browserRpc.on(DevtoolsEventType.RuntimeExecutionContextsCleared, ScenarioFunctions.handleRuntimeExecutionContextsCleared)
  browserRpc.on(DevtoolsEventType.TargetAttachedToTarget, ScenarioFunctions.handleAttachedToTarget)
  browserRpc.on(DevtoolsEventType.TargetDetachedFromTarget, ScenarioFunctions.handleDetachedFromTarget)
  browserRpc.on(DevtoolsEventType.TargetTargetCrashed, ScenarioFunctions.handleTargetCrashed)
  browserRpc.on(DevtoolsEventType.TargetTargetCreated, ScenarioFunctions.handleTargetCreated)
  browserRpc.on(DevtoolsEventType.TargetTargetDestroyed, ScenarioFunctions.handleTargetDestroyed)
  browserRpc.on(DevtoolsEventType.TargetTargetInfoChanged, ScenarioFunctions.handleTargetInfoChanged)

  await Promise.all([
    // DevtoolsProtocolTarget.setAutoAttach(browserRpc, {
    //   autoAttach: true,
    //   waitForDebuggerOnStart: true,
    //   flatten: true,
    // }),
    // DevtoolsProtocolTarget.setDiscoverTargets(browserRpc, {
    //   discover: true,
    // }),
  ])
  // console.log('attached to devtools')
}