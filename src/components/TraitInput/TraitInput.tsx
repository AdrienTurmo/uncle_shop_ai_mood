import * as React from 'react';
import styles from './TraitInput.module.scss'
import { Trait } from '@/type';
import { NumberInput } from '@/components';

interface TraitInputParams {
    trait: Trait
    value: number
    onChange: (newValue: number) => void
}

const traitDisplayName = new Map<Trait, string>([
    ['JOY', 'Joy'],
    ['MISERY', 'Misery'],
    ['PASSION', 'Passion'],
    ['DOUBT', 'Doubt'],
])

export const TraitInput: React.FC<TraitInputParams> = ({ trait, value, onChange }) => {
    return (
        <div className={styles.TraitInput}>
            <div>{traitDisplayName.get(trait)}</div>
            <NumberInput value={value} onChange={onChange} min={0} max={4} />
        </div>
    )
}
