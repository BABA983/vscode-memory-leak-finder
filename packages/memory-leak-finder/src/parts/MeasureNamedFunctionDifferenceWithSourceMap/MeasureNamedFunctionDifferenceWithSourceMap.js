import * as CompareNamedFunctionDifferenceWithSourceMap from '../CompareNamedFunctionDifferenceWithSourceMap/CompareNamedFunctionDifferenceWithSourceMap.js'
import * as GetNamedFunctionCount from '../GetNamedFunctionCount/GetNamedFunctionCount.js'
import * as MeasureId from '../MeasureId/MeasureId.js'
import * as ObjectGroupId from '../ObjectGroupId/ObjectGroupId.js'
import * as ReleaseObjectGroup from '../ReleaseObjectGroup/ReleaseObjectGroup.js'
import * as ScriptHandler from '../ScriptHandler/ScriptHandler.js'

export const id = MeasureId.NamedFunctionDifferenceWithSourceMap

export const create = (session) => {
  const objectGroup = ObjectGroupId.create()
  const scriptHandler = ScriptHandler.create()
  return [session, objectGroup, scriptHandler]
}

const includeSourceMap = true

export const start = async (session, objectGroup, scriptHandler) => {
  await scriptHandler.start(session)
  return GetNamedFunctionCount.getNamedFunctionCount(session, objectGroup, scriptHandler.scriptMap, includeSourceMap)
}

export const stop = async (session, objectGroup, scriptHandler) => {
  await scriptHandler.stop(session)
  const result = await GetNamedFunctionCount.getNamedFunctionCount(session, objectGroup, scriptHandler.scriptMap, includeSourceMap)
  // @ts-ignore
  result.scriptMap = scriptHandler.scriptMap
  return result
}

export const releaseResources = async (session, objectGroup) => {
  await ReleaseObjectGroup.releaseObjectGroup(session, objectGroup)
}

export const compare = CompareNamedFunctionDifferenceWithSourceMap.compareFunctionDifference

export const isLeak = (difference) => {
  return difference.length > 0
}
