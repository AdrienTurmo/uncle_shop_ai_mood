import * as React from 'react';
import styles from './XpSelectorDisplay.module.scss';
import { useTraitsContext } from '@/context/TraitsContext.tsx';

export const XpSelectorDisplay: React.FC = () => {
    const { addXp } = useTraitsContext();

    return (
        <div className={styles.XpSelectorDisplay}>
            <div>Xp Selector:</div>
            <div className={styles.List}>
                <div onClick={() => addXp('Bath')}>
                    <div>Bath</div>
                    <div>2-0-0-0</div>
                </div>
                <div onClick={() => addXp('Food')}>
                    <div>Food</div>
                    <div>2-0-0-1</div>
                </div>
                <div onClick={() => addXp('Cake')}>
                    <div>Cake</div>
                    <div>1-0-1-0</div>
                </div>
                <div onClick={() => addXp('Nature')}>
                    <div>Nature</div>
                    <div>0-0-2-0</div>
                </div>
                <div onClick={() => addXp('Hangover Poo')}>
                    <div>Hangover Poo</div>
                    <div>0-1-0-2</div>
                </div>
                <div onClick={() => addXp('Rain')}>
                    <div>Rain</div>
                    <div>0-1-0-0</div>
                </div>
                <div onClick={() => addXp('Death')}>
                    <div>Death</div>
                    <div>0-3-0-0</div>
                </div>
                <div onClick={() => addXp('Stress')}>
                    <div>Stress</div>
                    <div>0-0-0-3</div>
                </div>
            </div>
        </div>
    )
}
