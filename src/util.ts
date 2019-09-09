import { GGConnector, GGNode, Matrix } from './types'

/**
 * Parses a string in the format 'A => B => C B => D'
 * and returns an array of Connectors
 */
export function parseConnectors(def: string): GGConnector[] {
    const result = new Array<GGConnector>()
    const defs = def.split(/(?<!\>)\s+(?!=)/)
    defs.forEach(part => {
        const chain = part.split(/\s*=>\s*/)
        chain.forEach((_, i) => {
            if (i > 0) {
                result.push({ from: chain[i - 1], to: chain[i] })
            }
        })
    })
    return result
}

/** Extract all nodes  */
export function nodesFromConnectors(connectors: GGConnector[]): GGNode[] {
    const nodes = new Set<string>()
    connectors.forEach(c => {
        nodes.add(c.from)
        nodes.add(c.to)
    })

    return [...nodes.keys()].map(node => ({ id: node }))
}

function columns(matrix: Matrix) {
    return matrix.reduce((acc, row) => Math.max(row.length, acc), 0)
}

export function matrixStrings(matrix: Matrix): string {
    const cols = columns(matrix)
    const result = new Array<string>()
    for (let row of matrix) {
        row = row || []
        let r = ''
        for (let i = 0; i < cols; i++) {
            const node = row[i]
            r += node ? node.id : '_'
        }
        result.push(r)
    }
    return result.join('\n')
}

export function stringsMatrix(strings: string): Matrix {
    return strings
        .split('\n')
        .map(row => row.split('').map(s => (s === '_' ? undefined : { id: s })))
}
