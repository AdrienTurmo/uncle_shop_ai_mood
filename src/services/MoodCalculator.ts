import { Mood, TraitValues } from '@/type';


export const calculateMood = ({ joy, misery, passion, doubt }: TraitValues): Mood => {
    const netJoy = joy - misery
    const netMisery = -netJoy
    const netPassion = passion - doubt
    const netDoubt = -netPassion

    if (netJoy === 0 && netPassion === 0) return 'BORED'
    if (netJoy < 2 && misery < 2 && passion < 2 && doubt < 2) return 'NEUTRAL'

    if (netJoy > 1) {
        if (netPassion === 0) return 'HAPPY'
        if (netPassion > 1) return 'LOVE'
        if (netDoubt > 0) return 'SHY'
        return 'ANXIOUS'
    } else {
        if (netMisery <= 1) return 'ANXIOUS'
        if (passion < 2 && doubt < 2) return 'SAD'
        if (netPassion > 1) return 'ANGRY'
        if (netDoubt > 1) return 'SCARED'
        return 'ANXIOUS'
    }
}
