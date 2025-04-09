import * as React from 'react';
import styles from './TraitInput.module.scss'
import { Trait } from '@/type';
import { NumberInput } from '@/components';
import { useTraitsContext } from '@/context/TraitsContext.tsx';
import clsx from 'clsx';

interface TraitInputParams {
    trait: Trait
}

const traitDisplayName = new Map<Trait, string>([
    ['JOY', 'Joy'],
    ['MISERY', 'Misery'],
    ['PASSION', 'Passion'],
    ['DOUBT', 'Doubt'],
])

export const TraitInput: React.FC<TraitInputParams> = ({ trait }) => {
    const { getValueOf, increaseValueOf, decreaseValueOf, getXpOf } = useTraitsContext()
    const value = getValueOf(trait)
    const xpValue = getXpOf(trait)

    return (
        <div className={styles.TraitInput}>
            <div className={styles.SquareGroup}>
                <div className={clsx(styles.Square, value + xpValue >= 4 && styles.VisibleRed, value >= 4 && styles.VisibleWhite)} />
                <div className={clsx(styles.Square, value + xpValue >= 3 && styles.VisibleRed, value >= 3 && styles.VisibleWhite)} />
                <div className={clsx(styles.Square, value + xpValue >= 2 && styles.VisibleRed, value >= 2 && styles.VisibleWhite)} />
                <div className={clsx(styles.Square, value + xpValue >= 1 && styles.VisibleRed, value >= 1 && styles.VisibleWhite)} />
                <div className={styles.HalfSquare} />
            </div>
            <div>{traitDisplayName.get(trait)}</div>
            <NumberInput
                value={value}
                onPlus={() => increaseValueOf(trait)}
                onMinus={() => decreaseValueOf(trait)}
            />
        </div>
    )
}
