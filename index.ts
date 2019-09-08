import { GGNode, GGConnector, Matrix } from './src/types'

export function gridGraphPlacement(nodes: GGNode[], connectors: GGConnector[]) {
    return [[{ id: 'A' }, { id: 'B' }, { id: 'C' }]]
}

function buildGraph(nodes: GGNode[], connectors: GGConnector[]) {
    // All direct upstream nodes from one node
    const upstream = new Map<string, string[]>()

    // All direct downstream nodes from one node
    const downstream = new Map<string, string[]>()

    const nodeMap = new Map<string, GGNode>()

    const result: Matrix = []

    function placeNodeAndDownstreams(node: GGNode, column: number) {
        // setCell(result, column, findFreeCell(matrix, column), node)
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
            placeNodeAndDownstreams(node, 1)
        })
}

// function placeDownstreamGroups(upstreamId, column) {
//     nodesSorted.forEach(pg => {
//         var upstreamGroups = (pg.upstreamGroups || '').split(',')
//         if (upstreamGroups && upstreamGroups.indexOf(upstreamId) > -1) {
//             if (!pitcherGroupPlaced[pg.id]) {
//                 placeGroupInColumn(pg.id, column)
//                 pitcherGroupPlaced[pg.id] = true
//                 placeDownstreamGroups(pg.id, column + 1)
//             } else if (nodesSorted[pg.id].x > column) {
//                 freeUpRow(
//                     indexes,
//                     nodesSorted[pg.id].x,
//                     nodesSorted[pg.id].y,
//                 )
//                 delete nodesSorted[pg.id]
//                 placeGroupInColumn(pg.id, column)
//                 pitcherGroupPlaced[pg.id] = true
//                 placeDownstreamGroups(pg.id, column + 1)
//             }
//             connectors.push({ from: upstreamId, to: pg.id })
//         }
//     })
// }

// function placeGroupInColumn(pgid, column) {
//     if (!nodesSorted[pgid]) {
//         nodesSorted[pgid] = {
//             x: column,
//             y: firstFreeRow(indexes, column),
//             purpose: pitcherCountString(pgid),
//             name: pgid,
//             class: 'downdown',
//         }
//     }
// }

// function pitcherCountString(pgid) {
//     var c = pitcherCount[pgid]

//     if (!c) {
//         return ''
//     } else if (c === 1) {
//         return '1 pitcher'
//     } else {
//     function placeDownstreamGroups(upstreamId, column) {
//         nodesSorted.forEach(pg => {
//             var upstreamGroups = (pg.upstreamGroups || '').split(',')
//             if (upstreamGroups && upstreamGroups.indexOf(upstreamId) > -1) {
//                 if (!pitcherGroupPlaced[pg.id]) {
//                     placeGroupInColumn(pg.id, column)
//                     pitcherGroupPlaced[pg.id] = true
//                     placeDownstreamGroups(pg.id, column + 1)
//                 } else if (nodesSorted[pg.id].x > column) {
//                     freeUpRow(
//                         indexes,
//                         nodesSorted[pg.id].x,
//                         nodesSorted[pg.id].y,
//                     )
//                     delete nodesSorted[pg.id]
//                     placeGroupInColumn(pg.id, column)
//                     pitcherGroupPlaced[pg.id] = true
//                     placeDownstreamGroups(pg.id, column + 1)
//                 }
//                 connectors.push({ from: upstreamId, to: pg.id })
//             }
//         })
//     }

//     function placeGroupInColumn(pgid, column) {
//         if (!nodesSorted[pgid]) {
//             nodesSorted[pgid] = {
//                 x: column,
//                 y: firstFreeRow(indexes, column),
//                 purpose: pitcherCountString(pgid),
//                 name: pgid,
//                 class: 'downdown',
//             }
//         }
//     }

//     function pitcherCountString(pgid) {
//         var c = pitcherCount[pgid]

//         if (!c) {
//             return ''
//         } else if (c === 1) {
//             return '1 pitcher'
//         } else {
//             return c + ' pitchers'
//         }
//     }

//     // Return true if the pitcher-group has at least
//     // one upstream group that exists.
//     function hasValidUpstream(pg) {
//         let valid = false
//         const upstream = (pg.upstreamGroups || '').split(',')
//         upstream.forEach(upstream => {
//             if (pitcherGroup[upstream]) {
//                 valid = true
//             }
//         })
//         return valid
//     }

//     var pitcherCount = {}
//     pitchers.forEach(p => {
//         if (!pitcherCount[p.pitcherGroup]) {
//             pitcherCount[p.pitcherGroup] = 1
//         } else {
//             pitcherCount[p.pitcherGroup]++
//         }
//     })

//     nodesSorted.forEach(pgi => {
//         if (pgi.ingress === 'yes' || pgi.coreIngress === 'yes') {
//             placeGroupInColumn(pgi.id, 0)
//             placeDownstreamGroups(pgi.id, 1)
//         } else if (!hasValidUpstream(pgi)) {
//             placeGroupInColumn(pgi.id, 1)
//             placeDownstreamGroups(pgi.id, 2)
//         }
//     })
//     return { nodes: nodesArray(nodesSorted), connectors: connectors }
// }

// function firstFreeRow(indexes, column) {
//     if (indexes[column]) {
//         indexes[column]++
//     } else {
//         indexes[column] = 1
//     }
//     return indexes[column]
// }

// function freeUpRow(indexes, column, row) {
//     if (indexes[column] === row) {
//         indexes[column]--
//     }
// }

// function nodesArray(nodes) {
//     let result = []
//     for (let nodeId of Object.keys(nodes)) {
//         const node = nodes[nodeId]
//         const row = result[node.y] || []
//         row[node.x] = { id: nodeId }
//         result[node.y] = row
//     }
//     return result.filter(row => !!row)
// }

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
    return 1
}
