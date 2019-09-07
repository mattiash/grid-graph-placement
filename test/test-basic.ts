import * as test from 'purple-tape'
import { parseConnectors } from '../index'

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
