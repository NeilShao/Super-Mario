export class Matrix {
    constructor() {
        this.grid = [];
    }

    forEach(callback) {
        this.grid.forEach((row, x) => {
            row.forEach((value, y) => {
                callback(value, x, y)
            })
        })
    }

    get(x, y) {
        if (this.grid[x]) {
            return this.grid[x][y];
        }

        return undefined;
    }


    set(x, y, value) {
        if (!this.grid[x]) {
            this.grid[x] = [];
        }

        this.grid[x][y] = value;
    }
}

export class Vec2 {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }

    set(x, y) {
        this.x = x;
        this.y = y;
    }
}