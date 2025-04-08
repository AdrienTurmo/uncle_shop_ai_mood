import * as React from 'react';
import styles from './MainPage.module.scss'
import { TraitInput } from '@/components';
import { useState } from 'react';


export const MainPage: React.FC = () => {
    const [joyValue, setJoyValue] = useState(0)
    const [miseryValue, setMiseryValue] = useState(0)
    const [passionValue, setPassionValue] = useState(0)
    const [doubtValue, setDoubtValue] = useState(0)

    return (
        <div className={styles.MainPage}>
            <h1>Oncle Shop's Rocket Shop AI Mood Calculator</h1>
            <div>
                <div>Traits:</div>
                <div>
                    <TraitInput trait={'JOY'} value={joyValue} onChange={setJoyValue} />
                    <TraitInput trait={'MISERY'} value={miseryValue} onChange={setMiseryValue} />
                    <TraitInput trait={'PASSION'} value={passionValue} onChange={setPassionValue} />
                    <TraitInput trait={'DOUBT'} value={doubtValue} onChange={setDoubtValue} />
                </div>
            </div>
        </div>
    )
}
