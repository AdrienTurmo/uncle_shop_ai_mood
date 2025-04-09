import * as React from 'react';
import styles from './MoodDisplay.module.scss'
import { useTraitsContext } from '@/context/TraitsContext.tsx';

export const MoodDisplay: React.FC = () => {
    const { getMood, getMoodWithXp } = useTraitsContext()

    return (
        <div className={styles.MoodDisplay}>
            <div>Mood : {getMood()}</div>
            <div className={styles.NewMood}>New Mood : {getMoodWithXp()}</div>
        </div>
    )
}
