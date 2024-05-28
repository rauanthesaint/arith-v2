import { math } from '@/utils/math/math.config'

export default class Matrix {
    private readonly __cols: number
    private readonly __rows: number
    private __elements: string[][]

    constructor(elements: string[][]) {
        if (!elements || !Array.isArray(elements) || elements.length === 0) {
            throw new Error('Invalid Elements Array')
        }
        this.__rows = elements.length
        this.__cols = elements[0].length
        for (const row of elements) {
            if (row.length !== this.__cols) {
                throw new Error('All rows must have the same length')
            }
        }
        this.__elements = elements
    }

    static getIdentityMatrix(size: number): Matrix {
        const result: string[][] = []
        for (let i: number = 0; i < size; i++) {
            result[i] = new Array(size).fill('0')
            result[i][i] = '1'
        }
        return new Matrix(result)
    }

    transpose(): Matrix {
        const result: string[][] = []
        for (let i: number = 0; i < this.__rows; i++) {
            result[i] = []
            for (let j: number = 0; j < this.__cols; j++) {
                result[i][j] = this.__elements[j][i]
            }
        }
        return new Matrix(result)
    }

    getMinor(rowIndex: number, colIndex: number): Matrix {
        if (rowIndex < 0 || rowIndex >= this.__rows) {
            throw new Error('Invalid row index')
        }
        if (colIndex < 0 || colIndex >= this.__cols) {
            throw new Error('Invalid column index')
        }
        const result: string[][] = this.__elements
            .filter((_, rIndex) => rIndex !== rowIndex)
            .map((row) => row.filter((_, cIndex) => cIndex !== colIndex))
        return new Matrix(result)
    }

    multiply(argument: string | Matrix): Matrix {
        const result: string[][] = []
        if (typeof argument === 'string') {
            for (let i: number = 0; i < this.__rows; i++) {
                result[i] = []
                for (let j: number = 0; j < this.__cols; j++) {
                    result[i][j] = math
                        .simplify(`${this.__elements[i][j]} * (${argument})`)
                        .toString()
                }
            }
            return new Matrix(result)
        }
        if (this.__cols !== argument.__rows) {
            throw new Error('Incompatible matrices for multiplication')
        }
        for (let i: number = 0; i < this.__rows; i++) {
            result[i] = []
            for (let j: number = 0; j < this.__cols; j++) {
                let sum = ''
                for (let k: number = 0; k < this.__cols; k++) {
                    const expression = `${sum} + (${this.__elements[i][k]}) * (${argument.__elements[k][j]})`
                    sum = math.simplify(expression).toString()
                }
                result[i][j] = sum
            }
        }
        return new Matrix(result)
    }

    getCofactorMatrix(): Matrix {
        const result: string[][] = []
        for (let i = 0; i < this.__rows; i++) {
            result[i] = []
            for (let j = 0; j < this.__cols; j++) {
                const minor = this.getMinor(i, j)
                const cofactorExpression = `(-1)^${
                    i + j
                } * (${minor.getDeterminant()})`
                const cofactor = math.simplify(cofactorExpression).toString()
                result[i][j] = cofactor
            }
        }
        return new Matrix(result)
    }

    add(matrix: Matrix): Matrix {
        const result: string[][] = []

        if (this.__rows !== matrix.__rows || this.__cols !== matrix.__cols) {
            throw new Error(
                'Matrices must have the same dimensions for addition'
            )
        }

        for (let i: number = 0; i < this.__rows; i++) {
            result[i] = []
            for (let j: number = 0; j < this.__cols; j++) {
                const expression = `(${this.__elements[i][j]}) + (${matrix.__elements[i][j]})`
                result[i][j] = math.simplify(expression).toString()
            }
        }
        return new Matrix(result)
    }
    subtract(matrix: Matrix): Matrix {
        const result: string[][] = []

        if (this.__rows !== matrix.__rows || this.__cols !== matrix.__cols) {
            throw new Error(
                'Matrices must have the same dimensions for addition'
            )
        }

        for (let i: number = 0; i < this.__rows; i++) {
            result[i] = []
            for (let j: number = 0; j < this.__cols; j++) {
                const expression = `(${this.__elements[i][j]}) - (${matrix.__elements[i][j]})`
                result[i][j] = math.simplify(expression).toString()
            }
        }
        return new Matrix(result)
    }

    inverse(): Matrix {
        if (this.__cols !== this.__rows) {
            throw new Error('Matrix must be square')
        }
        const determinant = this.getDeterminant()
        if (0 === parseInt(determinant)) {
            throw new Error('Matrix is not invertible')
        }
        return this.getCofactorMatrix()
            .transpose()
            .multiply(`(1/${determinant})`)
    }

    power(exp: number): Matrix {
        if (exp < 0) {
            throw new Error('Exponent should be a non-negative integer')
        }

        if (exp === 0) {
            if (this.__rows !== this.__cols) {
                throw new Error(
                    'Identity matrix is not defined for non-square matrices'
                )
            }
            return Matrix.getIdentityMatrix(this.__rows)
        }
        let result = new Matrix(this.__elements)
        for (let i: number = 1; i < exp; i++) {
            result = result.multiply(this)
        }
        return result
    }

    getDeterminant(): string {
        if (this.__rows !== this.__cols) {
            throw new Error('Non-square matrices do not have determinants')
        }

        if (this.__rows === 1) {
            return this.__elements[0][0]
        }

        if (this.__rows === 2) {
            return math
                .simplify(
                    `(${this.__elements[0][0]}) * (${this.__elements[1][1]}) - (${this.__elements[0][1]}) * (${this.__elements[1][0]})`
                )
                .toString()
        }
        let determinant = ''
        for (let i: number = 0; i < this.__rows; i++) {
            const expression = `${determinant} + (-1)^${i} * ${
                this.__elements[0][i]
            } * (${this.getMinor(0, i).getDeterminant()})`
            determinant = math.simplify(expression).toString()
        }
        return determinant
    }

    getSize(): { rows: number; cols: number } {
        return { rows: this.__rows, cols: this.__cols }
    }
    getElements(): string[][] {
        return this.__elements
    }
}
