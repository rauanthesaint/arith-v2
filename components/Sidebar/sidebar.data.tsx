import { ReactNode } from 'react'
import {
    Atom,
    Cube,
    Inclination,
    InfoCircle,
    RubikCube,
    Ruler,
    Settings,
    Square,
    TemperatureLow,
    Timer,
    Weight,
    WhiteFlag,
} from 'iconoir-react'

type item = {
    icon: ReactNode
    title: string
    link: string
}

export const calculators: item[] = [
    {
        icon: <Atom />,
        title: 'Engineering',
        link: '/engineering',
    },
    {
        icon: <Inclination />,
        title: 'Graphing',
        link: '/graphing',
    },
    {
        icon: <RubikCube />,
        title: 'Matrix',
        link: '/matrix',
    },
    {
        icon: <Ruler />,
        title: 'Converter',
        link: '/converter',
    },
]

export const converters: item[] = [
    {
        icon: <Weight />,
        title: 'Mass',
        link: '#',
    },
    {
        icon: <Timer />,
        title: 'Time',
        link: '#',
    },
    {
        icon: <Ruler />,
        title: 'Length',
        link: '#',
    },
    {
        icon: <Cube />,
        title: 'Volume',
        link: '#',
    },
    {
        icon: <Square />,
        title: 'Area',
        link: '#',
    },
    {
        icon: <TemperatureLow />,
        title: 'Tempearture',
        link: '#',
    },
]

export const general: item[] = [
    {
        icon: <Settings />,
        title: 'Settings',
        link: '/settings',
    },
    {
        icon: <WhiteFlag />,
        title: 'Reports',
        link: '#',
    },
    {
        icon: <InfoCircle />,
        title: 'Info',
        link: '#',
    },
]
