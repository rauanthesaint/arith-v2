'use client'
import { FC, ReactElement, cloneElement, useState } from 'react'
import { IDrawerProps } from './Drawer.types'

import styles from './Drawer.module.scss'
import clsx from 'clsx'

const Drawer: FC<IDrawerProps> = ({
    zIndex = 1000,
    children,
    align = 'left',
    className,
    id,
    onClose,
    open,
}) => {
    return (
        <>
            <section
                id={id}
                style={{ zIndex: zIndex }}
                className={clsx(
                    className,
                    styles.content,
                    styles[align],
                    open && styles.active
                )}
            >
                {children}
            </section>
            <div
                style={{ zIndex: zIndex - 1 }}
                className={clsx(styles.blur, open && styles.active)}
                onClick={onClose}
            />
        </>
    )
}

export default Drawer
