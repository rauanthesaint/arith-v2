import { simplify } from 'mathjs'

export function isEquation(expression: string): boolean {
    // Trim any leading or trailing spaces
    expression = expression.trim()

    // Split the expression into left and right sides based on the '=' sign
    const sides = expression.split('=')

    // An equation must have exactly one '=' sign
    if (sides.length !== 2) {
        return false
    }

    // Check if both sides of the equation are not empty after trimming
    const leftSide = sides[0].trim()
    const rightSide = sides[1].trim()

    if (leftSide === '' || rightSide === '') {
        return false
    }

    return true
}

export function formatEquationToFunction(equation: string): string {
    try {
        if (!isEquation(equation)) {
            return ''
        }
        equation = equation.trim()
        const sides = equation.split('=')
        const leftSide = simplify(`${sides[0]} - (${sides[1]})`).toString()
        return leftSide
    } catch (error) {
        return (error as Error).message
    }
}

export function convertTextareaToArray(input: string): string[] {
    // Split the input by newline character '\n'
    const rows = input.split('\n')

    // Remove any leading or trailing spaces from each row and filter out empty rows
    const cleanedRows = rows
        .map((row) => row.trim())
        .filter((row) => row !== '')

    return cleanedRows
}

export function parseLinearEquations(equations: string[]): {
    coeffs: number[][]
    bVector: number[]
} {
    const variableSet = new Set<string>()
    const coeffs: number[][] = []
    const bVector: number[] = []

    // Extract variables from the equations
    equations.forEach((equation) => {
        const variables = equation.match(/[a-z]/g)
        if (variables) {
            variables.forEach((variable) => variableSet.add(variable))
        }
    })

    const variables = Array.from(variableSet)
    variables.sort() // Optional: to ensure a consistent order

    // Build regex pattern dynamically
    const variablePattern = variables
        .map((varName) => `([+-]?\\d*)${varName}`)
        .join('')
    const equationPattern = new RegExp(`${variablePattern}=([+-]?\\d+)`)

    // Parse each equation
    equations.forEach((equation) => {
        const match = equation.match(equationPattern)

        if (match) {
            const coeffRow = []
            for (let i = 1; i < match.length - 1; i++) {
                const coeff = match[i]
                const value =
                    coeff === '' || coeff === '+'
                        ? 1
                        : coeff === '-'
                        ? -1
                        : parseInt(coeff)
                coeffRow.push(value)
            }
            const bValue = parseInt(match[match.length - 1])

            coeffs.push(coeffRow)
            bVector.push(bValue)
        }
    })

    return { coeffs, bVector }
}
