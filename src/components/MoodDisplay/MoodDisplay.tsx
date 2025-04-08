import * as React from 'react';
import styles from './MoodDisplay.module.scss'
import { useTraitsContext } from '@/context/TraitsContext.tsx';

export const MoodDisplay: React.FC = () => {
    const { getMood } = useTraitsContext()

    return (
        <div className={styles.MoodDisplay}>
            Mood : {getMood()}
        </div>
    )
}
