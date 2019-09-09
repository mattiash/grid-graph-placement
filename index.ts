import { GGNode, GGConnector, Matrix } from './src/types'

export function gridGraphPlacement(nodes: GGNode[], connectors: GGConnector[]) {
    return [[{ id: 'A' }, { id: 'B' }, { id: 'C' }]]
}

export function buildGraph(nodes: GGNode[], connectors: GGConnector[]) {
    const matrix: Matrix = []
    // All direct upstream nodes from one node
    const upstream = new Map<string, string[]>()

    // All direct downstream nodes from one node
    const downstream = new Map<string, string[]>()

    // These nodeIds have already been placed on the matrix
    const placed = new Set<string>()

    const nodeMap = new Map<string, GGNode>()

    function placeNodeAndDownstreams(
        node: GGNode,
        row: number,
        column: number,
    ) {
        if (!placed.has(node.id)) {
            let freeRow = findFreeCell(matrix, row, column)
            setCell(matrix, freeRow, column, node)
            placed.add(node.id)
            const downstreamNodes = (downstream.get(node.id) || [])
                .filter(ds => !(downstream.get(ds) || []).includes(node.id))
                .sort((a, b) => a.localeCompare(b))
            for (let ds of downstreamNodes) {
                const n = nodeMap.get(ds)
                if (n) {
                    placeNodeAndDownstreams(n, freeRow, column + 1)
                }
            }
            const bidirDownstreamNodes = (downstream.get(node.id) || [])
                .filter(ds => (downstream.get(ds) || []).includes(node.id))
                .sort((a, b) => a.localeCompare(b))

            for (let ds of bidirDownstreamNodes) {
                const n = nodeMap.get(ds)
                if (n) {
                    placeNodeAndDownstreams(n, freeRow, column)
                }
            }
        }
    }

    nodes.forEach(node => {
        upstream.set(node.id, [])
        downstream.set(node.id, [])
        nodeMap.set(node.id, node)
    })

    connectors.forEach(conn => {
        const up = upstream.get(conn.to)
        if (!up) {
            throw new Error('No such node ' + conn.to)
        }
        up.push(conn.from)
        const down = downstream.get(conn.from)
        if (!down) {
            throw new Error('No such node ' + conn.from)
        }
        down.push(conn.to)
    })

    // Find nodes without any upstream node
    const startNodeIds = [...upstream.keys()].filter(
        node => (upstream.get(node) || []).length === 0,
    )

    if (startNodeIds.length === 0) {
        throw new Error('No start-nodes found')
    }

    startNodeIds
        .sort((a, b) => a.localeCompare(b))
        .forEach(nodeId => {
            // Place node in column 1
            // Place downstream nodes
            const node = nodeMap.get(nodeId)
            if (!node) {
                throw new Error('Internal error')
            }
            placeNodeAndDownstreams(node, 0, 0)
        })

    return matrix
}

export function setCell(
    matrix: Matrix,
    row: number,
    column: number,
    content: GGNode,
) {
    const rowA = matrix[row] || []
    rowA[column] = content
    matrix[row] = rowA
}

// Find first free cell in column that is on row x or higher,
// has no nodes to the right and no nodes below
export function findFreeCell(
    matrix: (GGNode | undefined)[][],
    row: number,
    column: number,
): number {
    // Start search from last row
    let bestyet = matrix.length
    while (
        bestyet > row &&
        matrix[bestyet - 1]
            .slice(column)
            .reduce((acc, node) => acc && !node, true)
    ) {
        bestyet--
    }
    return bestyet
}
