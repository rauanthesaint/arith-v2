'use client'

import { Textarea } from '@nextui-org/react'
import { useState } from 'react'

import {
    formatEquationToFunction,
    isEquation,
    convertTextareaToArray,
    parseLinearEquations,
} from '@/utils/math/engineering/index'
import { simplify } from 'mathjs'

function solve(value: string): string {
    try {
        return simplify(value).toString()
    } catch (error) {
        return (error as Error).message
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
            <pre className="text-default-500 text-small">
                Value:{solve(value)}
            </pre>
        </main>
    )
}
