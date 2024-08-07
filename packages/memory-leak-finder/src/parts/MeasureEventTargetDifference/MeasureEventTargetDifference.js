import * as CompareEventTargetDifference from '../CompareEventTargetDifference/CompareEventTargetDifference.js'
import * as GetEventTargets from '../GetEventTargets/GetEventTargets.js'
import * as MeasureId from '../MeasureId/MeasureId.js'
import * as ObjectGroupId from '../ObjectGroupId/ObjectGroupId.js'

export const id = MeasureId.EventTargetDifference

export const create = (session) => {
  const objectGroup = ObjectGroupId.create()
  return [session, objectGroup]
}

export const start = (session, objectGroup) => {
  return GetEventTargets.getEventTargets(session, objectGroup)
}

export const stop = (session, objectGroup) => {
  return GetEventTargets.getEventTargets(session, objectGroup)
}

export const compare = CompareEventTargetDifference.compareEventTargets

export const isLeak = (leaked) => {
  return leaked.length > 0
}
