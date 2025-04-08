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
    const { getValueOf, changeValueOf } = useTraitsContext()
    const value = getValueOf(trait)

    return (
        <div className={styles.TraitInput}>
            <div className={styles.SquareGroup}>
                <div className={clsx(styles.Square, value >= 4 && styles.Visible)} />
                <div className={clsx(styles.Square, value >= 3 && styles.Visible)} />
                <div className={clsx(styles.Square, value >= 2 && styles.Visible)} />
                <div className={clsx(styles.Square, value >= 1 && styles.Visible)} />
                <div className={styles.HalfSquare} />
            </div>
            <div>{traitDisplayName.get(trait)}</div>
            <NumberInput
                value={value}
                onChange={(newValue) => changeValueOf(trait, newValue)}
                min={0}
                max={4}
            />
        </div>
    )
}
