import { SourceMapConsumer } from 'source-map'
import * as Assert from '../Assert/Assert.js'
import * as GetOriginalClassName from '../GetOriginalClassName/GetOriginalClassName.js'

export const getOriginalPosition = async (sourceMap, line, column) => {
  Assert.object(sourceMap)
  Assert.number(line)
  Assert.number(column)
  const originalPosition = await SourceMapConsumer.with(sourceMap, null, (consumer) => {
    return consumer.originalPositionFor({
      line: line + 1,
      column: column + 1,
    })
  })
  return {
    source: originalPosition.source,
    line: originalPosition.line,
    column: originalPosition.column,
    name: originalPosition.name,
  }
}

export const getOriginalPositions = async (sourceMap, positions, classNames) => {
  Assert.object(sourceMap)
  Assert.array(positions)
  const originalPositions = await SourceMapConsumer.with(sourceMap, null, (consumer) => {
    const originalPositions = []
    for (const position of positions) {
      const originalPosition = consumer.originalPositionFor({
        line: position.line + 1,
        column: position.column + 1,
      })
      if (classNames && originalPosition.source) {
        const index = sourceMap.sources.indexOf(originalPosition.source)
        const originalCode = sourceMap.sourcesContent[index]
        const originalClassName = GetOriginalClassName.getOriginalClassName(originalCode, originalPosition.line, originalPosition.column)
        originalPosition.name = originalClassName
      }
      originalPositions.push(originalPosition)
    }
    return originalPositions
  })
  return originalPositions
}
