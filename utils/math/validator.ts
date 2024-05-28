type Token = string | number

const operators = new Set(['+', '-', '*', '/', '^'])
const functions = new Set(['sin', 'cos', 'tan', 'sqrt', 'log', 'exp'])
const variables = new Set(['x']) // Extendable for more variables if needed

function isDigit(char: string): boolean {
    return /\d/.test(char)
}

function isLetter(char: string): boolean {
    return /[a-zA-Z]/.test(char)
}

function isOperator(char: string): boolean {
    return operators.has(char)
}

function isFunction(name: string): boolean {
    return functions.has(name)
}

function isVariable(name: string): boolean {
    return variables.has(name)
}

function tokenize(expression: string): Token[] {
    const tokens: Token[] = []
    let i = 0

    while (i < expression.length) {
        const char = expression[i]

        if (char === ' ') {
            i++
            continue
        }

        if (isDigit(char) || char === '.') {
            let numStr = char
            while (
                i + 1 < expression.length &&
                (isDigit(expression[i + 1]) || expression[i + 1] === '.')
            ) {
                numStr += expression[++i]
            }
            tokens.push(parseFloat(numStr))
        } else if (isLetter(char)) {
            let nameStr = char
            while (i + 1 < expression.length && isLetter(expression[i + 1])) {
                nameStr += expression[++i]
            }
            if (isFunction(nameStr)) {
                tokens.push(nameStr)
            } else if (isVariable(nameStr)) {
                tokens.push(nameStr)
            } else {
                throw new Error(
                    `Invalid function or variable '${nameStr}' in expression`
                )
            }
        } else if (isOperator(char) || char === '(' || char === ')') {
            tokens.push(char)
        } else {
            throw new Error(`Invalid character '${char}' in expression`)
        }

        i++
    }

    return tokens
}

function validateTokens(tokens: Token[]): boolean {
    const stack: string[] = []
    let expectOperand = true

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i]

        if (typeof token === 'number' || isVariable(token as string)) {
            if (!expectOperand) {
                return false
            }
            expectOperand = false
        } else if (typeof token === 'string') {
            if (isOperator(token)) {
                if (expectOperand) {
                    return false
                }
                expectOperand = true
            } else if (isFunction(token)) {
                if (!expectOperand) {
                    return false
                }
                stack.push(token)
            } else if (token === '(') {
                stack.push(token)
                expectOperand = true
            } else if (token === ')') {
                while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                    stack.pop()
                }
                if (stack.length === 0 || stack.pop() !== '(') {
                    return false
                }
                if (stack.length > 0 && isFunction(stack[stack.length - 1])) {
                    stack.pop()
                }
                expectOperand = false
            } else {
                return false
            }
        }
    }

    return stack.length === 0 && !expectOperand
}

export default function validateExpression(expression: string): boolean {
    try {
        const tokens = tokenize(expression)
        return validateTokens(tokens)
    } catch (error) {
        console.error((error as Error).message)
        return false
    }
}
