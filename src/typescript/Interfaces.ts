export interface IElement {
    tagName: string,
    className: string,
    attributes?: object
}

export interface IfightersPick {
    attack: number,
    defense: number,
    health: number,
    name: string,
    source: string,
    _id: string
}

export interface IFighter {
    _id: number,
    name: string,
    source: string
}

export interface IFighterString {
    _id: string,
    name: string,
    source: string
}