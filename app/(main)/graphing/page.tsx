'use client'

import { Label } from 'tracey-ui'
import styles from './page.module.scss'
import { Xmark } from 'iconoir-react'
import { useState } from 'react'
import { useRef, useEffect } from 'react'
import functionPlot from 'function-plot'
import { parse } from 'mathjs'
import validateExpression from '@/utils/math/validator'

import { getRandomColor } from '@/utils/math/Graphing/utils'

export default function Page() {
    const [elements, setElements] = useState<{ color: string; fn: string }[]>(
        []
    )
    const addElement = () => {
        setElements([...elements, { color: getRandomColor(), fn: '' }])
    }
    const handleInputChange = (index: number, value: string) => {
        const newElements = [...elements]
        newElements[index].fn = value
        setElements(newElements)
    }
    const removeElement = (index: number) => {
        setElements(elements.filter((_, i) => i !== index))
    }
    const plotRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        const handleResize = () => {
            if (plotRef.current) {
                const width = plotRef.current.clientWidth
                const height = plotRef.current.clientHeight
                plotRef.current.innerHTML = ''
                functionPlot({
                    target: plotRef.current,
                    width: width,
                    height: height,
                    grid: true,

                    disableZoom: false,
                    data: elements.filter((elem) => {
                        try {
                            elem.fn = elem.fn.trim().replace(/\s+/g, '')
                            parse(elem.fn)
                            return elem.fn !== '' && validateExpression(elem.fn)
                        } catch (error) {
                            return false
                        }
                    }),
                })
            }
        }

        handleResize()

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [elements])
    return (
        <main className={styles.page}>
            <aside className={styles.explorer}>
                <header>
                    <Label size="sm" className="unselectable" type="secondary">
                        Explorer
                    </Label>
                </header>
                <ul className={styles.list}>
                    {elements.map((elem, index) => {
                        return (
                            <li key={index} className={styles.item}>
                                <div
                                    style={{
                                        backgroundColor: elem.color,
                                    }}
                                    className={styles.indicator}
                                />
                                <input
                                    autoFocus
                                    placeholder="x + 1"
                                    type="text"
                                    value={elem.fn}
                                    onChange={(e) =>
                                        handleInputChange(index, e.target.value)
                                    }
                                />
                                <button
                                    title="Delete Function"
                                    type="button"
                                    onClick={() => removeElement(index)}
                                    className={styles.removeFunction__button}
                                >
                                    <Xmark />
                                </button>
                            </li>
                        )
                    })}
                    <li>
                        <button
                            onClick={addElement}
                            title="Create New Function"
                            type="button"
                            className={styles.item}
                            style={{ width: '100%' }}
                        >
                            <div
                                className={styles.indicator}
                                style={{
                                    backgroundColor:
                                        'var(--secondary-color-600)',
                                }}
                            />
                            <Label size="sm" type="secondary">
                                New function
                            </Label>
                        </button>
                    </li>
                </ul>
                <footer>
                    <Label size="sm" className="unselectable" type="secondary">
                        Total functions: {elements.length}
                    </Label>
                </footer>
            </aside>
            <section className={styles.workspace}>
                <section ref={plotRef} className={styles.plotContainer} />
            </section>
        </main>
    )
}
