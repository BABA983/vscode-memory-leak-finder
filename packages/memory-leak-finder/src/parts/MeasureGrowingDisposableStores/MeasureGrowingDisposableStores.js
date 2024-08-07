import * as CompareDisposableStores from '../CompareDisposableStores/CompareDisposableStores.js'
import * as GetDisposableStoresWithStackTraces from '../GetDisposableStoresWithStackTraces/GetDisposableStoresWithStackTraces.js'
import * as MeasureId from '../MeasureId/MeasureId.js'
import * as ObjectGroupId from '../ObjectGroupId/ObjectGroupId.js'
import * as ReleaseObjectGroup from '../ReleaseObjectGroup/ReleaseObjectGroup.js'
import * as StartTrackingDisposableStores from '../StartTrackingDisposableStores/StartTrackingDisposableStores.js'
import * as StopTrackingDisposableStores from '../StopTrackingDisposableStores/StopTrackingDisposableStores.js'

// TODO
// 1. find the DisposableStore constructor
// 2. Modify the disposableStore add function to track the stacktrace of the calling function and store it as an array of strings on the disposableStore instance
// 3. query all objects
// 4. filter all objects to find all disposableStore instances
// 5. store all disposableStoreInstances in a weak map: <ref> -> <size>
// 6. run the test
// 7. query all disposableStore instances again
// 8. check which disposableStores have increase in size using the weak map
// 9. return the leaked disposable store size and stack traces

export const id = MeasureId.GrowingDisposableStores

export const create = (session) => {
  const objectGroup = ObjectGroupId.create()
  return [session, objectGroup]
}

export const start = async (session, objectGroup) => {
  await StartTrackingDisposableStores.startTrackingDisposableStores(session, objectGroup)
  return []
}

export const stop = async (session, objectGroup) => {
  const stackTraces = await GetDisposableStoresWithStackTraces.getDisposableStoresWithStackTraces(session, objectGroup)
  await StopTrackingDisposableStores.stopTrackingDisposableStores(session, objectGroup)
  return stackTraces
}

export const releaseResources = async (session, objectGroup) => {
  await ReleaseObjectGroup.releaseObjectGroup(session, objectGroup)
}

export const compare = CompareDisposableStores.compareDisposableStores

export const isLeak = ({ before, after }) => {
  return after.length > 0
}
