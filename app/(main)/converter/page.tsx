'use client'

import { useState } from 'react'
import styles from './page.module.scss'
import { converter, ConverterItem } from './converter.data'
import clsx from 'clsx'
import { Converter } from '@/components'

type ConversionType =
    | 'distance'
    | 'weight'
    | 'temperature'
    | 'time'
    | 'currency'

const unitsMap: Record<ConversionType, string[]> = {
    distance: [
        'KILOMETERS(km)',
        'METERS(m)',
        'CENTIMETERS(cm)',
        'MILLIMETERS(mm)',
        'MILES(mi)',
        'INCHES(in)',
        'Feet(ft)',
        'Yard(yd)',
    ],
    weight: [
        'KILOGRAMS(kg)',
        'GRAMS(g)',
        'MILLIGRAMS(mg)',
        'POUND(lb)',
        'OUNCE(oz)',
    ],
    temperature: ['Celsius', 'Kelvin', 'Fahrenheit'],
    time: ['SECONDS(s)', 'MINUTES(min)', 'HOURS(h)', 'DAY', 'WEEK'],
    currency: [
        'USD(American Dollar)',
        'KZT(Kazakhstani Tenge)',
        'EUR(Euro)',
        'RUB(Russian Rubles)',
        'YEN(Japanese Yens)',
        'CNY(Chinese Yuans)',
        'TRY(Turkish Liras)',
    ],
}

export default function Page() {
    const [conversionType, setConversionType] =
        useState<ConversionType>('distance')

    return (
        <main className={styles.container}>
            <h1 className={styles.title}>ARITMEASURE</h1>

            <div className={styles.selector}>
                {converter.map((elem: ConverterItem, index) => (
                    <div
                        key={index}
                        className={clsx(styles.selector_item, {
                            [styles.active]: conversionType === elem.type,
                        })}
                        onClick={() => setConversionType(elem.type)}
                        title={elem.title}
                    >
                        <h3>{elem.title}</h3>
                        {elem.icon}
                    </div>
                ))}
            </div>

            {unitsMap[conversionType] && (
                <Converter
                    conversionType={
                        conversionType === 'distance'
                            ? 'length'
                            : conversionType === 'weight'
                            ? 'weight'
                            : conversionType === 'time'
                            ? 'time'
                            : conversionType === 'temperature'
                            ? 'temperature'
                            : 'currency'
                    }
                    units={unitsMap[conversionType]}
                />
            )}
        </main>
    )
}
