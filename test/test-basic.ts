import * as test from 'purple-tape'
import { gridGraphPlacement, setCell } from '../index'
import {
    parseConnectors,
    nodesFromConnectors,
    matrixStrings,
    stringsMatrix,
} from '../src/util'
import { Matrix } from '../src/types'

test('gridGraphPlacement', t => {
    const connectors = parseConnectors('A => B => C')
    const nodes = nodesFromConnectors(connectors)
    const gg = gridGraphPlacement(nodes, connectors)
    t.equal(matrixStrings(gg), 'ABC')
})

test('setCell empty', t => {
    const matrix: Matrix = []
    setCell(matrix, 1, 1, { id: 'a' })
    t.equal(matrixStrings(matrix), '__\n_a')
})

test('setCell add one', t => {
    const matrix = stringsMatrix('AB\nC_')
    setCell(matrix, 1, 1, { id: 'D' })
    t.equal(matrixStrings(matrix), 'AB\nCD')
})
