import * as React from 'react';
import styles from './TraitInput.module.scss'
import { Trait } from '@/type';
import { NumberInput } from '@/components';
import { useTraitsContext } from '@/context/TraitsContext.tsx';

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

    return (
        <div className={styles.TraitInput}>
            <div>{traitDisplayName.get(trait)}</div>
            <NumberInput value={getValueOf(trait)} onChange={(newValue) => changeValueOf(trait, newValue)} min={0} max={4} />
        </div>
    )
}
