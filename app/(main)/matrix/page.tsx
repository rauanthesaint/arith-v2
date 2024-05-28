'use client'
import {
    ChangeEvent,
    FormEvent,
    KeyboardEvent,
    RefObject,
    useEffect,
    useRef,
    useState,
} from 'react'
import styles from './page.module.scss'
import { Label } from 'tracey-ui'
import Button from '@/dev/Button'
import { Trash } from 'iconoir-react/regular'
import { NavArrowDown, NavArrowUp, Xmark } from 'iconoir-react'
import { Matrix } from '@/components'
import { math } from '@/utils/math/math.config'
import clsx from 'clsx'
import { parse } from '@/utils/terminal/command-parser'
import { Command } from '@/utils/terminal/command.type'
import { Matrix as MATRIX } from '@/utils/math/Matrix'

export default function Page() {
    const [matrices, setMatrices] = useState<{ id: string; data: MATRIX }[]>([])

    const removeMatrix = (id: string) => {
        setMatrices(matrices.filter((element) => element.id !== id))
    }

    const [isActiveTerminal, setIsActiveTerminal] = useState<boolean>(true)
    const handleToggleTerminalActivity = () => {
        setIsActiveTerminal(!isActiveTerminal)
    }

    const [output, setOutput] = useState<string[]>([])
    const [input, setInput] = useState<string>('')

    const inputRef: RefObject<HTMLInputElement> = useRef(null)
    const handleTerminalClick = () => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }
    const handleCommandSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        processCommand(parse(input.split(/\s+/g)))
        setInput('')
    }
    const processCommand = (parsedCommand: Command) => {
        switch (parsedCommand.name) {
            case 'matrix':
                createMatrix(parsedCommand.args[0], parsedCommand.args[1])
                break
            case 'cls':
                setOutput([])
                break
            case 'del':
                deleteMatrix(parsedCommand.args[0])
                break
            case 'add':
                break
            default:
                print(`Undefinde command: ${parsedCommand.name}`)
                break
        }
    }

    const add = (args: string[]) => {
        const result = matrices.find((_) => _.id === args[0])
        if (!result) {
            // print()
        }
    }

    const deleteMatrix = (name: string) => {
        setMatrices(matrices.filter((element) => element.id !== name))
        print(`Matrix ${name} deleted`)
    }

    const print = (message: string) => {
        setOutput([...output, message])
    }

    const createMatrix = (name: string, elements: string) => {
        const existing = matrices.find((_) => _.id === name)
        if (existing) {
            existing.data = new MATRIX(parseMatrix(elements))
            print(`Matrix ${name} changed`)
            return
        }
        const nameRegEx = /^[a-zA-Z][a-zA-Z0-9_-]*$/
        const elementsRegEx =
            /^\[(?:[^,\[\]]+(?:,[^,\[\]]+)*)\];(?:\[(?:[^,\[\]]+(?:,[^,\[\]]+)*)\];)*$/
        if (!nameRegEx.test(name)) {
            setOutput([...output, `Syntax Error: invalid name: ${name}`])
            return
        }
        if (!elementsRegEx.test(elements)) {
            setOutput([...output, `Syntax Error: invalid data: ${elements}`])
            return
        }
        setMatrices([
            ...matrices,
            { id: name, data: new MATRIX(parseMatrix(elements)) },
        ])
        print(`Matrix ${name} created`)
    }

    const parseMatrix = (argument: string): string[][] => {
        const rows = argument.split(';').filter((_) => _ !== '')
        const result: string[][] = []
        for (let i: number = 0; i < rows.length; i++) {
            const elems: string[] = rows[i].slice(0, -1).slice(1).split(',')
            result[i] = []
            for (let j: number = 0; j < elems.length; j++) {
                result[i][j] = math
                    .simplify(elems[j])
                    .toString()
                    .replace(/\s+/g, '')
            }
        }
        return result
    }

    return (
        <main className={styles.page}>
            <aside className={styles.explorer}>
                <header>
                    <Label size="sm" type="secondary">
                        Explorer
                    </Label>
                </header>
                <ul className={styles.list}>
                    {matrices.map((elem, index) => {
                        return (
                            <li key={index} className={styles.item}>
                                <div className={styles.index}>
                                    <Label size="sm" type="secondary">
                                        {index + 1}
                                    </Label>
                                </div>
                                <div className={styles.details}>
                                    <Label size="sm">{elem.id}</Label>
                                    <Label size="sm" type="secondary">
                                        {elem.data.getElements().toString()}
                                    </Label>
                                </div>
                                <Button
                                    className={styles.deleteButton}
                                    size="sm"
                                    isIconOnly
                                    variant="tertiary"
                                    onClick={() => removeMatrix(elem.id)}
                                >
                                    <Xmark />
                                </Button>
                            </li>
                        )
                    })}
                </ul>
                <footer>
                    <Label size="sm" type="secondary">
                        Total matrices: {matrices.length}
                    </Label>
                </footer>
            </aside>
            <section className={styles.content}>
                <section className={styles.workspace}>
                    {matrices.map((elem, index) => {
                        return (
                            <Matrix
                                key={index}
                                id={elem.id}
                                data={elem.data.getElements()}
                                index={index * 50}
                                onRemove={removeMatrix}
                            />
                        )
                    })}
                </section>
                <section
                    className={clsx(
                        styles.terminal,
                        isActiveTerminal && styles.active
                    )}
                    onClick={handleTerminalClick}
                >
                    <header>
                        <Label
                            type="secondary"
                            className="unselectable"
                            size="sm"
                        >
                            Terminal
                        </Label>
                        <button
                            title="Show/hide terminal"
                            type="button"
                            className={clsx(
                                styles.terminalToggle__button,
                                isActiveTerminal && styles.active
                            )}
                            onClick={handleToggleTerminalActivity}
                        >
                            <NavArrowUp />
                        </button>
                    </header>
                    <section className={styles.commandLine}>
                        <form
                            className={styles.line}
                            onSubmit={handleCommandSubmit}
                        >
                            {'>>> '}
                            <label
                                htmlFor="command-line-input"
                                style={{ display: 'none' }}
                            >
                                label
                            </label>
                            <input
                                value={input}
                                onChange={(
                                    event: ChangeEvent<HTMLInputElement>
                                ) => setInput(event.target.value)}
                                id="command-line-input"
                                ref={inputRef}
                                autoFocus
                                type="text"
                            />
                        </form>
                        {output.toReversed().map((line, index) => {
                            return (
                                <div className={styles.line} key={index}>
                                    {'> '}
                                    {line}
                                </div>
                            )
                        })}
                    </section>
                </section>
            </section>
        </main>
    )
}
