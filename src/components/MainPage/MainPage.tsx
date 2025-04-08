import * as React from 'react';
import styles from './MainPage.module.scss'
import { TraitsList } from '@/components/TraitsList/TraitsList.tsx';
import { TraitsContextProvider } from '@/context/TraitsContext.tsx';


export const MainPage: React.FC = () => {
    return (
        <TraitsContextProvider>
            <div className={styles.MainPage}>
                <h1>Oncle Shop's Rocket Shop AI Mood Calculator</h1>
                <TraitsList />
            </div>
        </TraitsContextProvider>
    )
}
