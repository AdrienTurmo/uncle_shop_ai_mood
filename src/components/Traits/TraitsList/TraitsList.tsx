import * as React from 'react';
import styles from './TraitsList.module.scss'
import { TraitInput } from '@/components';
import { useTraitsContext } from '@/context/TraitsContext.tsx';

export const TraitsList: React.FC = () => {
    const { reset, isValid } = useTraitsContext()
    return (
        <div className={styles.TraitsList}>
            <button type="button" onClick={() => reset()}>Reset</button>
            <div>Traits:</div>
            {!isValid() && <div>OVERLOAD</div>}
            {isValid() && <div>----</div>}
            <div className={styles.List}>
                <TraitInput trait={'JOY'} />
                <TraitInput trait={'MISERY'} />
                <TraitInput trait={'PASSION'} />
                <TraitInput trait={'DOUBT'} />
            </div>
        </div>
    )
}
