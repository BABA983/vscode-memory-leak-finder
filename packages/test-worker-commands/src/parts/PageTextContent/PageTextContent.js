import * as Assert from '../Assert/Assert.js'
import * as DevtoolsProtocolRuntime from '../DevtoolsProtocolRuntime/DevtoolsProtocolRuntime.js'
import * as ExecutionContextState from '../ExecutionContextState/ExecutionContextState.js'
import * as SessionState from '../SessionState/SessionState.js'

export const getTextContent = async (locator) => {
  Assert.object(locator)
  const pageSession = SessionState.getPageSession()
  if (!pageSession) {
    throw new Error('no page found')
  }
  const utilityExecutionContext = await ExecutionContextState.waitForUtilityExecutionContext(pageSession.sessionId)
  if (!utilityExecutionContext) {
    throw new Error(`no utility execution context found`)
  }
  const text = await DevtoolsProtocolRuntime.callFunctionOn(pageSession.rpc, {
    functionDeclaration: '(locator) => test.getTextContent(locator)',
    arguments: [
      {
        value: locator,
      },
      {
        value: 'dblclick',
      },
      {
        value: {
          bubbles: true,
        },
      },
    ],
    executionContextId: utilityExecutionContext.id, // TODO move to uniqueid once supported
    // uniqueContextId: utilityExecutionContext.uniqueId,
    awaitPromise: true,
  })
  console.log({ text })
  return text
}