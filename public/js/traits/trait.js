export const Sides = {
    TOP: Symbol('top'),
    BOTTOM: Symbol('bottom')
}

export default class Trait {
    constructor (name) {
        this.NAME = name;
    }

    update(entity, delteTime) {
        console.warn("Not handled update")
    }

    obstruct(entity, side) {
        // console.warn("Not handled obstruct")
    }
}