// @/components/Sidebar/Sidebar.tsx
'use client'
// imports
import { Fragment } from 'react'
import styles from './Sidebar.module.scss'
import { calculators, converters, general } from './sidebar.data'
import Link from 'next/link'
import { Calculator, MenuScale } from 'iconoir-react/regular'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'

import { useState } from 'react'
import { Menu, NavArrowDown } from 'iconoir-react'
import { Label, Paragraph } from 'tracey-ui'
import ArithmeticCalculator from '../Airthmetic/Arithmetic'

import Logo from '@/public/static/img/logo.svg'
import Image from 'next/image'
import Drawer from '@/dev/Drawer'

const Sidebar = () => {
    const [isActive, setIsActive] = useState<boolean>(false)
    const handleToggle = () => {
        setIsActive(!isActive)
    }
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const handleVisibility = (value: boolean) => {
        setIsVisible(value)
    }
    const [isExpanded, setIsExpanded] = useState<boolean>(false)
    const handleClick = () => {
        setIsExpanded(!isExpanded)
    }
    const path = usePathname()
    return (
        <Fragment>
            <ArithmeticCalculator
                visible={isVisible}
                onClose={handleVisibility}
            />
            <aside className={styles.sidebar}>
                {/* SIDEBAR HEADER */}
                <header>
                    <button
                        title="Toggle Menu Button"
                        type="button"
                        onClick={handleToggle}
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
                        onClick={() => handleVisibility(!isVisible)}
                        className={styles.item}
                    >
                        <Calculator />
                        <span>Arithmetic</span>
                    </button>
                </section>
            </aside>

            <Drawer align="left" open={isActive} onClose={handleToggle}>
                <section
                    className={clsx(styles.drawer, isActive && styles.active)}
                >
                    <header>
                        <button
                            title="Menu Toggle Button"
                            type="button"
                            className={styles.sidebar__toggleButton}
                            onClick={handleToggle}
                        >
                            <Menu />
                        </button>
                    </header>
                    <section className={styles.content}>
                        <Label size="sm" type="secondary">
                            Calculators
                        </Label>
                        <div>
                            {calculators.map((elem, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={elem.link}
                                        className={clsx(
                                            styles.item,
                                            path === elem.link && styles.active
                                        )}
                                        onClick={handleToggle}
                                    >
                                        {elem.icon}
                                        <Label>{elem.title}</Label>
                                    </Link>
                                )
                            })}
                        </div>
                        <hr />
                        <Label size="sm" type="secondary">
                            Converters
                        </Label>
                        <div
                            className={clsx(
                                styles.expandable,
                                isExpanded && styles.active
                            )}
                        >
                            {converters.map((elem, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={elem.link}
                                        className={styles.item}
                                    >
                                        {elem.icon}
                                        <Label>{elem.title}</Label>
                                    </Link>
                                )
                            })}
                            <button
                                className={clsx(
                                    styles.item,
                                    styles.expandButton
                                )}
                                title="Expand"
                                type="button"
                                onClick={handleClick}
                            >
                                <NavArrowDown />
                                <Label>
                                    {isExpanded ? 'Collapse' : 'Expand'}
                                </Label>
                            </button>
                        </div>
                        <hr />
                        <div className={styles.secondary}>
                            {general.map((elem, index) => {
                                return (
                                    <Link
                                        key={index}
                                        href={elem.link}
                                        className={styles.item}
                                    >
                                        {elem.icon}
                                        <Label type="secondary">
                                            {elem.title}
                                        </Label>
                                    </Link>
                                )
                            })}
                        </div>
                        <hr />
                        <Paragraph size="xs" type="secondary">
                            &copy; 2024 TraceyDevLab
                        </Paragraph>
                    </section>
                </section>
            </Drawer>
        </Fragment>
    )
}

export default Sidebar
