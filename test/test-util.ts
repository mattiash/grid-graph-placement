import * as test from 'purple-tape'
import { parseConnectors, nodesFromConnectors } from '../src/util'

test('parseConnectors', t => {
    t.deepEqual(parseConnectors('A => B'), [{ from: 'A', to: 'B' }], 'A => B')
    t.deepEqual(
        parseConnectors('A => B C => D'),
        [{ from: 'A', to: 'B' }, { from: 'C', to: 'D' }],
        'A => B C => D',
    )
    t.deepEqual(
        parseConnectors('A => B => C'),
        [{ from: 'A', to: 'B' }, { from: 'B', to: 'C' }],
        'A => B => C',
    )
})

test('nodesFromConnectors', t => {
    const connectors = parseConnectors('A => B => C C => D')
    t.deepEqual(
        nodesFromConnectors(connectors)
            .map(node => node.id)
            .sort(),
        ['A', 'B', 'C', 'D'],
    )
})
