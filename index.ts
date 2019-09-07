interface Connector {
    from: string
    to: string
}

interface Node {
    id: string
}

/**
 * Parses a string in the format 'A => B => C B => D'
 * and returns an array of Connectors
 */
export function parseConnectors(def: string): Connector[] {
    const result = new Array<Connector>()
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
