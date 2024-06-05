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
        icon: <Ruler/>,
        title: 'Converter',
        link: '/converter',
    },
]
