import * as React from 'react';
import styles from './TraitsList.module.scss'
import { TraitInput } from '@/components';

export const TraitsList: React.FC = () => {
    return (
        <div className={styles.TraitsList}>
            <div>Traits:</div>
            <div className={styles.List}>
                <TraitInput trait={'JOY'} />
                <TraitInput trait={'MISERY'} />
                <TraitInput trait={'PASSION'} />
                <TraitInput trait={'DOUBT'} />
            </div>
        </div>
    )
}
