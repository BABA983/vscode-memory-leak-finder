import * as Assert from '../Assert/Assert.js'
import * as EvaluateInUtilityContext from '../EvaluateInUtilityContext/EvaluateInUtilityContext.js'

export const clear = async (locator) => {
  Assert.object(locator)
  await EvaluateInUtilityContext.evaluateInUtilityContext(
    {
      functionDeclaration: '(locator, fnName, options) => test.performAction(locator, fnName, options)',
      arguments: [
        {
          value: locator,
        },
        {
          value: 'clear',
        },
        {
          value: {
            bubbles: true,
          },
        },
      ],
      awaitPromise: true,
    },
    locator.sessionId,
  )
}
