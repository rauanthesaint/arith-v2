import React, { FC } from 'react'
import { IButtonProps } from './Button.types'
import clsx from 'clsx'
import styles from './Button.module.scss'

// indev
import { Label } from 'tracey-ui'

const Button: FC<IButtonProps> = ({
    children,
    className,
    id,
    variant = 'primary',
    size = 'md',
    isIconOnly,
    isLoading,
    isFullWidth,
    type = 'button',
    title = 'Tracey UI Button',
    disabled,
    tabIndex,

    onClick,
}) => {
    return (
        <button
            id={id}
            type={type}
            title={title}
            onClick={onClick}
            disabled={disabled}
            tabIndex={tabIndex}
            className={clsx(
                className,
                styles.button,
                styles[variant],
                styles[size],
                isIconOnly && styles.iconOnly,
                isLoading && styles.loading,
                isFullWidth && styles.fullWidth
            )}
        >
            <Label className={styles.label} size={size}>
                {children}
            </Label>
        </button>
    )
}

export default Button
