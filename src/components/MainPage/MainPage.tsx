import * as React from 'react';
import styles from './MainPage.module.scss'
import { MoodDisplay, TraitsList, XpSelectorDisplay } from '@/components';
import { TraitsContextProvider } from '@/context/TraitsContext.tsx';


export const MainPage: React.FC = () => {
    return (
        <TraitsContextProvider>
            <div className={styles.MainPage}>
                <h1>Uncle Chop's Rocket Shop AI Mood Calculator</h1>
                <TraitsList />
                <MoodDisplay />
                <XpSelectorDisplay />
            </div>
        </TraitsContextProvider>
    )
}

