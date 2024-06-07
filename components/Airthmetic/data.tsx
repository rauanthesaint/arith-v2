import { Minus, NavArrowLeft, Plus, Xmark } from 'iconoir-react/regular'
import { ReactNode } from 'react'

import { create, all } from 'mathjs'

const config = {}
const math = create(all, config)

interface majorKey {
    content: ReactNode | string
    priority?: boolean
    title: string
    action: (value: string) => string
}

interface minorKey {
    content: string | ReactNode
    title: string
}

export const majorKeyboard: majorKey[] = [
    // row 1
    {
        content: '(',
        title: 'Left Bracket',
        action: (value: string) => {
            return value.concat('(')
        },
    },
    {
        content: ')',
        title: 'Right Bracket',
        action: (value: string) => {
            return value.concat(')')
        },
    },
    {
        content: 'C',
        title: 'Erase All',
        action: (value: string) => {
            return ''
        },
    },
    {
        content: <NavArrowLeft />,
        title: 'Erase',
        action: (value: string) => {
            return value.slice(0, -1)
        },
    },
    // row 2
    {
        content: (
            <span>
                x<sup>y</sup>
            </span>
        ),
        title: 'Y Power of X',
        action: (value: string) => {
            return value.concat('^')
        },
    },
    {
        content: (
            <span>
                x<sup>2</sup>
            </span>
        ),
        title: '2 Power of X',
        action: (value: string) => {
            return value.concat('^2')
        },
    },
    {
        content: (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M5 13.8668L5.72756 12.6779L8.41732 17L9.60787 7.86697C9.66388 7.61633 9.80433 7.393 10.0053 7.23499C10.2063 7.07698 10.4554 6.99405 10.7102 7.00033H19"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                />
            </svg>
        ),
        title: 'Square Root of X',
        action: (value: string) => {
            return value.concat('^(0.5)')
        },
    },
    {
        content: '/',
        title: 'Divide',
        action: (value: string) => {
            return value.concat('/')
        },
    },
    // row 3
    {
        content: '7',
        title: 'Seven',
        priority: true,
        action: (value: string) => {
            return value.concat('7')
        },
    },
    {
        content: '8',
        title: 'Eight',
        priority: true,
        action: (value: string) => {
            return value.concat('8')
        },
    },
    {
        content: '9',
        title: 'Nine',
        priority: true,
        action: (value: string) => {
            return value.concat('9')
        },
    },
    {
        content: <Xmark />,
        title: 'Multiply',
        action: (value: string) => {
            return value.concat('*')
        },
    },
    // row 4
    {
        content: '4',
        title: 'Four',
        priority: true,
        action: (value: string) => {
            return value.concat('4')
        },
    },
    {
        content: '5',
        title: 'Five',
        priority: true,
        action: (value: string) => {
            return value.concat('5')
        },
    },
    {
        content: '6',
        title: 'Six',
        priority: true,
        action: (value: string) => {
            return value.concat('6')
        },
    },
    {
        content: <Minus />,
        title: 'Minus',
        action: (value: string) => {
            return value.concat('-')
        },
    },
    // row 5
    {
        content: '1',
        title: 'One',
        priority: true,
        action: (value: string) => {
            return value.concat('1')
        },
    },
    {
        content: '2',
        title: 'Two',
        priority: true,
        action: (value: string) => {
            return value.concat('2')
        },
    },
    {
        content: '3',
        title: 'Three',
        priority: true,
        action: (value: string) => {
            return value.concat('3')
        },
    },
    {
        content: <Plus />,
        title: 'Plus',
        action: (value: string) => {
            return value.concat('+')
        },
    },
    // row 6
    {
        content: '-/+',
        title: 'Change Sign',
        priority: true,
        action: (value: string) => {
            return value
        },
    },
    {
        content: '0',
        title: 'Zero',
        priority: true,
        action: (value: string) => {
            return value.concat('0')
        },
    },
    {
        content: '.',
        title: 'Dot',
        priority: true,
        action: (value: string) => {
            return value.concat('.')
        },
    },
]

export const minorKeyboard: minorKey[] = [
    {
        content: 'MC',
        title: 'Memory Clear',
    },
    {
        content: 'MR',
        title: 'Memory Recall',
    },
    {
        content: 'MS',
        title: 'Memory Store',
    },
    {
        content: 'M+',
        title: 'Memory Add',
    },
]

export const solveExpression = (
    expression: string
): { result: string; error?: string } => {
    try {
        const result = math.round(math.evaluate(expression), 3).toString()
        return { result: result }
    } catch (error) {
        return { result: expression, error: (error as Error).name }
    }
}
