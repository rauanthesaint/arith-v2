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
import { MoneySquare } from 'iconoir-react/regular'

type item = {
    icon: ReactNode
    title: string
    link: string
    type?: any 
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
        type: 'weight'

    },
    {
        icon: <Timer />,
        title: 'Time',
        link: '#',
        type: 'time'

    },
    {
        icon: <Ruler />,
        title: 'Length',
        link: '#',
        type: 'distance'

    },
    // {
    //     icon: <Cube />,
    //     title: 'Volume',
    //     link: '#',
    //     type: 'weight'

    // },
    // {
    //     icon: <Square />,
    //     title: 'Area',
    //     link: '#',
    // },
    {
        icon: <TemperatureLow />,
        title: 'Tempearture',
        link: '#',
        type: 'temperature'
    },
    {
        icon: <MoneySquare/>, 
        title: 'Currency',
        link: '', 
        type: 'currency'
    }
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
