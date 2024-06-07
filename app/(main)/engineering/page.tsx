'use client'

import { Spacer, Textarea } from '@nextui-org/react'
import { useState } from 'react'

import {
    formatEquationToFunction,
    isEquation,
    convertTextareaToArray,
    parseLinearEquations,
} from '@/utils/math/engineering/index'
import {
    derivative,
    evaluate,
    parse,
    rationalize,
    simplify,
    string,
} from 'mathjs'

function solve(value: string): string {
    try {
        return rationalize(simplify(value)).toString()
    } catch (error) {
        return (error as Error).message
    }
}
interface ParsedResult {
    expression: string
    variable: string
    derivative: string
}
function parseAndDeriveExpressions(expression: string): string {
    try {
        // Regex pattern to match 'der(expression, variable)'
        const derPattern = /der\(([^,]+),\s*([^)]+)\)/g

        // Array to hold the extracted objects with derivatives
        const parsedResults: ParsedResult[] = []

        // Function to replace 'der(expression, variable)' and calculate the derivative
        const replaceDer = (match: string, expr: string, variable: string) => {
            // Trim spaces from expression and variable
            const trimmedExpr = expr.trim()
            const trimmedVariable = variable.trim()

            // Calculate the derivative using math.js
            const exprNode = parse(trimmedExpr)
            const derivedExpr = derivative(exprNode, trimmedVariable).toString()

            // Add the extracted expression, variable, and derivative to the array
            parsedResults.push({
                expression: trimmedExpr,
                variable: trimmedVariable,
                derivative: derivedExpr,
            })

            // Replace the match with the derived expression
            return derivedExpr
        }

        // Replace 'der(expression, variable)' in the expression using the replaceDer function
        const updatedExpression = expression.replace(derPattern, replaceDer)

        return updatedExpression
    } catch (error) {
        return ''
    }
}

interface EvalObject {
    expression: string
    scope: Record<string, number>
}

function evaluateExpression(evalObject: EvalObject): number {
    return evaluate(evalObject.expression, evalObject.scope)
}

function dumbo(expresstioN: string) {
    const array = expresstioN.split('\n')
    if (array.length >= 2) {
        const expression = array[0]
        const scopeString = array[1]
        let scope: Record<string, number>

        try {
            scope = JSON.parse(scopeString)
            const result: EvalObject = { expression, scope }
            return evaluateExpression(result)
        } catch (error) {
            // throw new Error(
            //     'Invalid scope format. It should be a valid JSON object.'
            // )
            return ''
        }
    } else {
        return solve(parseAndDeriveExpressions(expresstioN))
    }
}

export default function Page() {
    const [value, setValue] = useState<string>('')

    return (
        <main className="p-4 h-full">
            <Textarea
                size="lg"
                placeholder="x + 1"
                minRows={1}
                maxRows={20}
                value={value}
                onValueChange={setValue}
            />
            <Spacer y={16} />
            <pre className="text-default-500 text-3xl text-small">
                Result: {dumbo(value)}
            </pre>
        </main>
    )
}
