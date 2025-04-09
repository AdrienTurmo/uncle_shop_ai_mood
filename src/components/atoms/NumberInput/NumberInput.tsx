import * as React from 'react';
import styles from './NumberInput.module.scss'

interface NumberInputParams {
    value: number
    onChange: (newValue: number) => void
    min?: number
    max?: number
}

export const NumberInput: React.FC<NumberInputParams> = (
    {
        value,
        onChange,
        min = -Number.MAX_VALUE,
        max = Number.MAX_VALUE
    }) => {
    const onClick = (mode: 'PLUS' | 'MINUS') => () => {
        let newValue = value + (mode === 'PLUS' ? 1 : -1)
        newValue = Math.max(min, newValue)
        newValue = Math.min(max, newValue)
        onChange(newValue)
    }

    return (
        <div className={styles.NumberInput}>
            <div onClick={onClick('MINUS')} className={styles.ButtonMinus}>-</div>
            <div className={styles.Input}>{value}</div>
            <div onClick={onClick('PLUS')} className={styles.ButtonPlus}>+</div>
        </div>
    )
}
