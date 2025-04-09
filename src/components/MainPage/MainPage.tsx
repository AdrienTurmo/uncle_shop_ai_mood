import * as React from 'react';
import styles from './MainPage.module.scss'
import { MoodDisplay, TraitsList, XpSelectorDisplay } from '@/components';
import { TraitsContextProvider } from '@/context/TraitsContext.tsx';
import { TargetMood } from '@/components/TargetMood/TargetMood.tsx';

export const MainPage: React.FC = () => {


    return (
        <TraitsContextProvider>
            <div className={styles.MainPage}>
                <h1>Uncle Chop's Rocket Shop AI Mood Calculator</h1>
                <div className={styles.TraitsAndMood}>
                    <TraitsList />
                    <MoodDisplay />
                </div>
                <XpSelectorDisplay />
                <TargetMood />
            </div>
        </TraitsContextProvider>
    )
}


