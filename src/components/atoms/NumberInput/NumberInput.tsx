import * as React from 'react';
import styles from './NumberInput.module.scss'

interface NumberInputParams {
    value: number
    onPlus: () => void
    onMinus: () => void
}

export const NumberInput: React.FC<NumberInputParams> = ({ value, onPlus, onMinus, }) => {
    return (
        <div className={styles.NumberInput}>
            <div onClick={onMinus} className={styles.ButtonMinus}>-</div>
            <div className={styles.Input}>{value}</div>
            <div onClick={onPlus} className={styles.ButtonPlus}>+</div>
        </div>
    )
}
