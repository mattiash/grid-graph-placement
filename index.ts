import { connect } from 'net'

export interface GGConnector {
    from: string
    to: string
}

export interface GGNode {
    id: string
}

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

export function nodesFromConnectors(connectors: GGConnector[]) {
    const nodes = new Set<string>()
    connectors.forEach(c => {
        nodes.add(c.from)
        nodes.add(c.to)
    })

    return [...nodes.keys()].map(node => ({ id: node }))
}

export function gridGraphPlacement(nodes: GGNode[], connectors: GGConnector[]) {
    return [[{ id: 'A' }, { id: 'B' }, { id: 'C' }]]
}
