// @/components/Sidebar/Sidebar.tsx
'use client'
// imports
import { Fragment } from 'react'
import styles from './Sidebar.module.scss'
import { calculators } from './sidebar.data'
import Link from 'next/link'
import { Calculator, MenuScale } from 'iconoir-react/regular'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

const Sidebar = () => {
    const path = usePathname()
    return (
        <Fragment>
            <aside className={styles.sidebar}>
                {/* SIDEBAR HEADER */}
                <header>
                    <button
                        title="Toggle Menu Button"
                        type="button"
                        className={styles.sidebar__toggleButton}
                    >
                        <MenuScale />
                    </button>
                </header>
                {/* SIDEBAR CONTENT */}
                <section className={styles.content}>
                    {calculators.map((elem, index) => {
                        return (
                            <Link
                                key={index}
                                href={elem.link}
                                title={`${elem.title} Calculator`}
                                className={clsx(
                                    styles.item,
                                    path === elem.link && styles.active
                                )}
                            >
                                {elem.icon}
                                <span>{elem.title}</span>
                            </Link>
                        )
                    })}
                    <button
                        type="button"
                        title="Arithmetic Calcucaltor"
                        className={styles.item}
                    >
                        <Calculator />
                        <span>Arithmetic</span>
                    </button>
                </section>
            </aside>
        </Fragment>
    )
}

export default Sidebar
