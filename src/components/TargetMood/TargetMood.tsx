import { Mood } from '@/type';
import { findPossiblePath } from '@/services/findXp.ts';
import styles from './TargetMood.module.scss'
import clsx from 'clsx';
import { useTraitsContext, XpsSelected } from '@/context/TraitsContext.tsx';
import { useState } from 'react';

const displayXpSelected = (onClick: (newXp: XpsSelected) => void) => (xpSelecteds: XpsSelected[]) => {
    return xpSelecteds.map((t, i) => (
        <div key={i} className={styles.XpList} onClick={() => onClick(t)}>
            {t.Bath != 0 && (<div>Bath : {t.Bath}</div>)}
            {t.Food != 0 && (<div>Food : {t.Food}</div>)}
            {t.Cake != 0 && (<div>Cake : {t.Cake}</div>)}
            {t.Nature != 0 && (<div>Nature : {t.Nature}</div>)}
            {t.Hangover_Poo != 0 && (<div>Hangover_Poo : {t.Hangover_Poo}</div>)}
            {t.Rain != 0 && (<div>Rain : {t.Rain}</div>)}
            {t.Death != 0 && (<div>Death : {t.Death}</div>)}
            {t.Stress != 0 && (<div>Stress : {t.Stress}</div>)}
        </div>))
}

export const TargetMood = () => {
    const { traits, changeXps } = useTraitsContext()

    const [selectedMood, setSelectedMood] = useState<Mood | undefined>()

    const onClick = (mood: Mood) => () => {
        setSelectedMood(prev => prev === mood ? undefined : mood)
    }

    const displayer = displayXpSelected(changeXps)

    const selectButton = (mood: Mood) => {
        return (
            <button
                type="button"
                onClick={onClick(mood)}
                className={clsx(selectedMood === mood && styles.Selected)}
            >
                {mood}
            </button>
        )
    }

    return (
        <div className={styles.TargetMood}>
            <div className={styles.Title}>Target Mood:</div>
            <div className={styles.MoodList}>
                {selectButton('BORED')}
                {selectButton('NEUTRAL')}
                {selectButton('ANXIOUS')}
                {selectButton('SAD')}
                {selectButton('ANGRY')}
                {selectButton('SCARED')}
                {selectButton('HAPPY')}
                {selectButton('LOVE')}
                {selectButton('SHY')}
            </div>
            <div className={styles.Title}>Possible paths:</div>
            <div className={styles.PathList}>
                {selectedMood && displayer(findPossiblePath(traits, selectedMood))}
            </div>
        </div>
    )
}
