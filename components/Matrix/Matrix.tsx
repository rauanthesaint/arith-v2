'use client'
import Draggable from 'react-draggable'
import styles from './Matrix.module.scss'
import { FC } from 'react'
import { IMatrixProps } from './Matrix.types'
import { Label } from 'tracey-ui'
import Button from '@/dev/Button'
import { Edit, Xmark } from 'iconoir-react'
import { Matrix as MATRIX } from '@/utils/math/Matrix'
const Matrix: FC<IMatrixProps> = ({ id, data, index = 0, onRemove }) => {
    const matrix: MATRIX = new MATRIX(data)

    const determinant = () => {
        try {
            return matrix.getDeterminant()
        } catch (error) {
            console.log((error as Error).message)
            return 'Determinant is not defined'
        }
    }

    return (
        <Draggable
            handle=".handle"
            bounds="parent"
            cancel="button"
            grid={[25, 25]}
            defaultPosition={{ x: index, y: index }}
        >
            <article id={id} className={styles.matrix}>
                <header className="handle">
                    <Label type="secondary">name: {id}</Label>
                    <div>
                        <Button size="sm" isIconOnly variant="secondary">
                            <Edit />
                        </Button>
                        <Button
                            onClick={() => {
                                if (id) {
                                    onRemove(id)
                                }
                            }}
                            size="sm"
                            isIconOnly
                            variant="secondary"
                        >
                            <Xmark />
                        </Button>
                    </div>
                </header>
                <section
                    className={styles.table}
                    style={{
                        gridTemplate: `repeat(${data.length}, 1fr) / repeat(${data[0].length}, 1fr)`,
                    }}
                >
                    {data.map((row) => {
                        return (
                            <>
                                {row.map((elem, index) => {
                                    return (
                                        <div
                                            className={styles.cell}
                                            key={index}
                                        >
                                            <span>{elem}</span>
                                        </div>
                                    )
                                })}
                            </>
                        )
                    })}
                </section>
                <footer>
                    <Label size="sm" type="secondary">
                        size: {matrix.getSize().rows}x{matrix.getSize().cols}
                    </Label>
                    <Label size="sm" type="secondary">
                        |{id}|: {determinant()}
                    </Label>
                </footer>
            </article>
        </Draggable>
    )
}
export default Matrix
