import * as React from 'react';
import styles from './TraitInput.module.scss'
import { MAX_TRAIT_VALUE, Trait } from '@/type';
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

const POSSIBLE_TRAITS_VALUES = (() => {
    const result = []
    for (let i = MAX_TRAIT_VALUE; i > 0; i--) {
        result.push(i)
    }
    return result
})()

export const TraitInput: React.FC<TraitInputParams> = ({ trait }) => {
    const { getValueOf, increaseValueOf, decreaseValueOf, getXpOf } = useTraitsContext()
    const value = getValueOf(trait)
    const xpValue = getXpOf(trait)

    return (
        <div className={styles.TraitInput}>
            <div className={styles.SquareGroup}>
                {POSSIBLE_TRAITS_VALUES.map(possibleValue => (
                    <div className={clsx(styles.Square, value + xpValue >= possibleValue && styles.VisibleRed, value >= possibleValue && styles.VisibleWhite)} />
                ))}
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
