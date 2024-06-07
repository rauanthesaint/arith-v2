/**
 * TODO:
 * 1. History
 * 2. Memory
 * 3. Refactor code
 */
'use client'
import styles from './ArithmeticCalculator.module.scss'
import clsx from 'clsx'
import { Label, Paragraph } from 'tracey-ui'
import Draggable from 'react-draggable'
import { FC, useState, useCallback } from 'react'
import { majorKeyboard, minorKeyboard, solveExpression } from './data'
import {
    CheckCircle,
    ClockRotateRight,
    Collapse,
    Expand,
    Xmark,
} from 'iconoir-react'
import { copy as clipboardCopy } from 'clipboard'
import Drawer from '@/dev/Drawer'

import Button from '@/dev/Button'

interface props {
    onClose: (value: boolean) => void
    visible: boolean
}

const useClipboard = () => {
    const [isCopied, setIsCopied] = useState(false)

    const copyToClipboard = useCallback((text: string) => {
        clipboardCopy(text)
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000) // Reset the copied state after 2 seconds
    }, [])

    return { isCopied, copyToClipboard }
}

const ArithmeticCalculator: FC<props> = ({ onClose, visible }) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false)
    const [history, setHistory] = useState<
        { expression: string; answer: string }[]
    >([])
    const [isHistoryActive, setIsHistoryActive] = useState<boolean>(false)

    const handleHistory = () => {
        setIsHistoryActive(!isHistoryActive)
    }
    const handleVisibility = () => {
        onClose(!visible)
    }
    const handleSolveButton = () => {
        const result = solveExpression(value)

        if (result.error && value !== '') {
            setError(result.error)
        } else {
            setHistory([
                ...history,
                { expression: value, answer: result.result },
            ])
            setError('')
        }
        setValue(result.result)
    }

    const clearHistory = () => {
        setHistory([])
    }

    const handleResizeButton = () => {
        setIsCollapsed(!isCollapsed)
    }

    const { isCopied, copyToClipboard } = useClipboard()

    return (
        <Draggable handle=".handle" cancel={'button'}>
            <section
                tabIndex={0}
                className={clsx(
                    styles.calculator,
                    isCollapsed && styles.collapsed,
                    visible && styles.visible
                )}
            >
                {/* HEADER */}
                <header className="handle">
                    <Label className={styles.modal__title} size="sm">
                        Calculator
                    </Label>
                    {/**
                     * Modal control buttons: expand/collapse, close
                     */}
                    <div className={styles.modal__control__section}>
                        <button
                            title="Resize Button"
                            type="button"
                            onClick={handleResizeButton}
                        >
                            {isCollapsed ? <Expand /> : <Collapse />}
                        </button>
                        <button
                            title="Close Button"
                            type="button"
                            className={styles.primary}
                            onClick={handleVisibility}
                        >
                            <Xmark />
                        </button>
                    </div>
                </header>
                {/* DISPLAY */}
                <section className={styles.display}>
                    {/**
                     * Container for error output
                     * */}
                    <Paragraph size="xs" className={styles.error__logger}>
                        {error}
                    </Paragraph>
                    {/**
                     * If the current calculator value is null/undefined the display shows 0,
                     * otherwise the current value is displayed.
                     * */}
                    <span>{value !== '' ? value : '0'}</span>
                </section>
                {/* KEYBOARD */}
                <section className={styles.container}>
                    {/* KEYBOARD Memory */}
                    <div className={styles.keyboard__memory}>
                        {minorKeyboard.map((elem, index) => {
                            return (
                                <button
                                    title={elem.title}
                                    key={index}
                                    type="button"
                                >
                                    {elem.content}
                                </button>
                            )
                        })}
                        <button
                            title="History"
                            type="button"
                            onClick={handleHistory}
                        >
                            <ClockRotateRight />
                        </button>
                    </div>
                    {/* KEYBOARD */}
                    <div className={styles.keyboard}>
                        {majorKeyboard.map((elem, index) => {
                            return (
                                <button
                                    title={elem.title}
                                    key={index}
                                    type="button"
                                    onClick={() => {
                                        setValue(elem.action(value))
                                    }}
                                    className={clsx(
                                        elem.priority && styles.secondary
                                    )}
                                >
                                    {elem.content}
                                </button>
                            )
                        })}
                        <button
                            title="Solve"
                            type="button"
                            className={clsx(styles.button, styles.primary)}
                            onClick={handleSolveButton}
                        >
                            =
                        </button>
                    </div>
                </section>
                {/* History */}
                <Drawer
                    align="bottom"
                    open={isHistoryActive}
                    onClose={handleHistory}
                >
                    <section className={styles.drawer}>
                        <div
                            className={clsx(
                                styles.copied,
                                isCopied && styles.active
                            )}
                        >
                            <CheckCircle />
                            <Label size="sm">Copied</Label>
                        </div>
                        <header>
                            <Label size="lg" className={styles.label}>
                                History
                            </Label>
                            <div>
                                <Button
                                    tabIndex={-1}
                                    onClick={clearHistory}
                                    size="sm"
                                    variant="secondary"
                                >
                                    Clear history
                                </Button>
                                <Button
                                    tabIndex={-1}
                                    size="sm"
                                    variant="secondary"
                                    isIconOnly
                                    onClick={handleHistory}
                                >
                                    <Xmark />
                                </Button>
                            </div>
                        </header>
                        {history.length === 0 && (
                            <Paragraph
                                style={{ textAlign: 'center', marginTop: 16 }}
                                size="sm"
                                type="secondary"
                            >
                                Calculation history is empty
                            </Paragraph>
                        )}
                        <ul>
                            {history.toReversed().map((elem, index) => {
                                return (
                                    <li
                                        key={index}
                                        onClick={() =>
                                            copyToClipboard(elem.answer)
                                        }
                                    >
                                        <Label type="secondary">
                                            {elem.expression}
                                            {' = '}
                                        </Label>
                                        <Label
                                            size="lg"
                                            className={styles.label}
                                        >
                                            {elem.answer}
                                        </Label>
                                    </li>
                                )
                            })}
                        </ul>
                    </section>
                </Drawer>
            </section>
        </Draggable>
    )
}

export default ArithmeticCalculator
