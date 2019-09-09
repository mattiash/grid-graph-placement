import * as test from 'purple-tape'
import { setCell, findFreeCell, buildGraph } from '../index'
import {
    parseConnectors,
    nodesFromConnectors,
    matrixStrings,
    stringsMatrix,
} from '../src/util'
import { Matrix } from '../src/types'

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

test('findFreeCell', t => {
    const matrix = stringsMatrix('AB')
    t.equal(findFreeCell(matrix, 0, 2), 0)
    t.equal(findFreeCell(matrix, 0, 1), 1)
})

test('A => B => C', t => {
    const connectors = parseConnectors('A => B => C')
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, connectors)
    t.equal(matrixStrings(matrix), 'ABC')
})

test('A => B => C B => D', t => {
    const connectors = parseConnectors('A => B => C B => D')
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, connectors)
    t.equal(matrixStrings(matrix), 'ABC\n__D')
})

test('A => B => C B => D E => F', t => {
    const connectors = parseConnectors('A => B => C B => D E => F')
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, connectors)
    t.equal(matrixStrings(matrix), 'ABC\n__D\nEF_')
})

// B and E connected in both directions.
// Place E directly below E
test('A => B => C B => D B => E E => B E => F', t => {
    const connectors = parseConnectors(
        'A => B => C B => D B => E E => B E => F',
    )
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, connectors)
    t.equal(matrixStrings(matrix), 'ABC\n__D\n_EF')
})

test('A => B => C B => D E => F => C F => D', t => {
    const connectors = parseConnectors('A => B => C B => D E => F => C F => D')
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, connectors)
    t.equal(matrixStrings(matrix), 'ABC\n__D\nEF_')
})

test('throw on no startNodes', t => {
    const connectors = parseConnectors('A => B => C => A')
    const nodes = nodesFromConnectors(connectors)
    t.throws(() => buildGraph(nodes, connectors))
})

test('throw on missing nodes', t => {
    const connectors = parseConnectors('A => B => C')
    const nodes = nodesFromConnectors(connectors)
    nodes.pop()
    t.throws(() => buildGraph(nodes, connectors))
})

test('throw on missing nodes start-nodes', t => {
    const connectors = parseConnectors('A => B C => D => E')
    const nodes = nodesFromConnectors(connectors)
    nodes.shift()
    t.throws(() => buildGraph(nodes, connectors))
})

test('Place unconnected nodes', t => {
    const connectors = parseConnectors('A => B')
    const nodes = nodesFromConnectors(connectors)
    const matrix = buildGraph(nodes, [])
    t.equal(matrixStrings(matrix), 'A\nB')
})
