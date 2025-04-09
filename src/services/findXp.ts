import { Mood, TraitValues, XpSelector } from '@/type';
import { defaultXpsSelected, XpsSelected } from '@/context/TraitsContext.tsx';

const XP_TO_TRAITS = new Map<XpSelector, TraitValues>([
    ['Bath', new TraitValues(2, 0, 0, 0)],
    ['Food', new TraitValues(2, 0, 0, 1)],
    ['Cake', new TraitValues(1, 0, 1, 0)],
    ['Nature', new TraitValues(0, 0, 2, 0)],
    ['Hangover_Poo', new TraitValues(0, 1, 0, 2)],
    ['Rain', new TraitValues(0, 1, 0, 0)],
    ['Death', new TraitValues(0, 3, 0, 0)],
    ['Stress', new TraitValues(0, 0, 0, 3)],
])

export const calculateAllMoods = (): Map<Mood, TraitValues[]> => {
    const result = new Map<Mood, TraitValues[]>;

    for (let j = 0; j <= 4; j++) {
        for (let m = 0; m <= 4; m++) {
            for (let p = 0; p <= 4; p++) {
                for (let d = 0; d <= 4; d++) {
                    const trait = new TraitValues(j, m, p, d)
                    const mood = trait.calculateMood()

                    result.set(mood, [...(result.get(mood) || []), trait])
                }
            }
        }
    }

    return result;
}

interface FindXpResult {
    trait: TraitValues
    xp: XpsSelected
}

export const findValidXp = (targetTrait: TraitValues) => (xpSelected: XpsSelected): FindXpResult[] => {
    if (targetTrait.isEmpty()) return [{
        trait: targetTrait,
        xp: xpSelected
    }]

    const result: { trait: TraitValues, xp: XpsSelected }[] = []

    for (const [xp, trait] of XP_TO_TRAITS) {
        const nextTrait = targetTrait.diff(trait)
        if (nextTrait === 'INVALID') continue;
        result.push({
            trait: nextTrait,
            xp: { ...xpSelected, [xp]: xpSelected[xp] + 1 }
        })
    }

    return result;
}

const filterUnique = (array: any[]) => Array.from(
    new Map(array.map(obj => [JSON.stringify(obj), obj])).values()
);

export const findPath = (targetTrait: TraitValues): XpsSelected [] => {
    let result = findValidXp(targetTrait)(defaultXpsSelected)

    for (let i = 0; i < 4; i++) {
        result = filterUnique(result.flatMap(({ trait, xp }) => findValidXp(trait)(xp)))
    }

    return result
        .filter(r => r.trait.isEmpty())
        .map(r => r.xp)
}

export const findPossiblePath = (startingTrait: TraitValues, targetMood: Mood): XpsSelected[] => {
    const allTraitForMoods = calculateAllMoods().get(targetMood) || [];
    const possibleTraits = allTraitForMoods
        .map((t) => t.diff(startingTrait))
        .filter((t) => t != 'INVALID')

    return filterUnique(possibleTraits.flatMap((pt) => findPath(pt)))
}
