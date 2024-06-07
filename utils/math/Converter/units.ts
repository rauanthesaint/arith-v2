const lengthUnits: Map<string, number> = new Map<string, number>([
    ['KILOMETERS(km)', 1000],
    ['METERS(m)', 1],
    ['CENTIMETERS(cm)', 0.01],
    ['MILLIMETERS(mm)', 0.001],
    ['MILES(mi)', 1609.34],
    ['INCHES(in)', 0.0254],
    ['Feet(ft)', 0.3048],
    ['Yard(yd)', 0.9144],
])

const massUnits: Map<string, number> = new Map<string, number>([
    ['KILOGRAMS(kg)', 1000],
    ['GRAMS(g)', 1],
    ['MILLIGRAMS(mg)', 0.001],
    ['POUND(lb)', 453.592],
    ['OUNCE(oz)', 28.3495],
])

const timeUnits: Map<string, number> = new Map<string, number>([
    ['SECONDS(s)', 1],
    ['MINUTES(min)', 60],
    ['HOURS(h)', 3600],
    ['DAY', 86400],
    ['WEEK', 604800],
])

const currencyUnits: Map<string, number> = new Map<string, number>([
    ['USD(American Dollar)', 1],
    ['KZT(Kazakhstani Tenge)', 449.15],
    ['EUR(Euro)', 0.92],
    ['RUB(Russian Rubles)', 89.05],
    ['YEN(Japanese Yens)', 156.11],
    ['CNY(Chinese Yuans)', 7.25],
    ['TRY(Turkish Liras)', 32.3],
])

const convertTemperature = (
    value: number,
    fromUnit: string,
    toUnit: string
): number => {
    // Temperature conversion functions
    const celsiusToFahrenheit = (celsius: number): number =>
        (celsius * 9) / 5 + 32
    const fahrenheitToCelsius = (fahrenheit: number): number =>
        ((fahrenheit - 32) * 5) / 9
    const celsiusToKelvin = (celsius: number): number => celsius + 273.15
    const kelvinToCelsius = (kelvin: number): number => kelvin - 273.15
    const fahrenheitToKelvin = (fahrenheit: number): number =>
        celsiusToKelvin(fahrenheitToCelsius(fahrenheit))
    const kelvinToFahrenheit = (kelvin: number): number =>
        celsiusToFahrenheit(kelvinToCelsius(kelvin))

    let result = value
    if (fromUnit === toUnit) return value

    switch (fromUnit) {
        case 'Celsius':
            if (toUnit === 'Fahrenheit') result = celsiusToFahrenheit(value)
            if (toUnit === 'Kelvin') result = celsiusToKelvin(value)
            break
        case 'Fahrenheit':
            if (toUnit === 'Celsius') result = fahrenheitToCelsius(value)
            if (toUnit === 'Kelvin') result = fahrenheitToKelvin(value)
            break
        case 'Kelvin':
            if (toUnit === 'Celsius') result = kelvinToCelsius(value)
            if (toUnit === 'Fahrenheit') result = kelvinToFahrenheit(value)
            break
        default:
            throw new Error(
                `Unknown temperature conversion: ${fromUnit} to ${toUnit}`
            )
    }

    return parseFloat(result.toFixed(2))
}

const convertCurrency = (
    value: number,
    fromUnit: string,
    toUnit: string
): number => {
    const fromRate = currencyUnits.get(fromUnit)
    const toRate = currencyUnits.get(toUnit)

    if (fromRate === undefined || toRate === undefined) {
        throw new Error(`Unknown currency units: ${fromUnit} or ${toUnit}`)
    }

    const result = (value / fromRate) * toRate
    return parseFloat(result.toFixed(2))
}

const convertUnits = (
    value: number,
    fromUnit: string,
    toUnit: string,
    unitType: 'length' | 'weight' | 'temperature' | 'time' | 'currency'
): number => {
    if (unitType === 'temperature') {
        return convertTemperature(value, fromUnit, toUnit)
    }

    if (unitType === 'currency') {
        return convertCurrency(value, fromUnit, toUnit)
    }

    let unitMap: Map<string, number>

    switch (unitType) {
        case 'length':
            unitMap = lengthUnits
            break
        case 'weight':
            unitMap = massUnits
            break
        case 'time':
            unitMap = timeUnits
            break
        default:
            throw new Error(`Unknown unit type: ${unitType}`)
    }

    const fromFactor = unitMap.get(fromUnit)
    const toFactor = unitMap.get(toUnit)

    if (fromFactor === undefined || toFactor === undefined) {
        throw new Error(`Unknown units: ${fromUnit} or ${toUnit}`)
    }

    const result = (value * fromFactor) / toFactor
    return parseFloat(result.toFixed(2))
}

export default convertUnits
