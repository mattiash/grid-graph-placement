export interface GGConnector {
    from: string
    to: string
}

export interface GGNode {
    id: string
}

export type Matrix = (GGNode | undefined)[][]
