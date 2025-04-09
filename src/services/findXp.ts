import { MAX_TRAIT_VALUE, Mood, TraitValues, XP_EFFECTS, XpSelector } from '@/type';
import { defaultXpsSelected, XpsSelected } from '@/context/TraitsContext.tsx';

const XP_TO_TRAITS = new Map<XpSelector, TraitValues>([
    ['Bath', TraitValues.fromArray(XP_EFFECTS.get('Bath'))],
    ['Food', TraitValues.fromArray(XP_EFFECTS.get('Food'))],
    ['Cake', TraitValues.fromArray(XP_EFFECTS.get('Cake'))],
    ['Nature', TraitValues.fromArray(XP_EFFECTS.get('Nature'))],
    ['Hangover_Poo', TraitValues.fromArray(XP_EFFECTS.get('Hangover_Poo'))],
    ['Rain', TraitValues.fromArray(XP_EFFECTS.get('Rain'))],
    ['Death', TraitValues.fromArray(XP_EFFECTS.get('Death'))],
    ['Stress', TraitValues.fromArray(XP_EFFECTS.get('Stress'))],
])

export const calculateAllMoods = (): Map<Mood, TraitValues[]> => {
    const result = new Map<Mood, TraitValues[]>;

    for (let j = 0; j <= MAX_TRAIT_VALUE; j++) {
        for (let m = 0; m <= MAX_TRAIT_VALUE; m++) {
            for (let p = 0; p <= MAX_TRAIT_VALUE; p++) {
                for (let d = 0; d <= MAX_TRAIT_VALUE; d++) {
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

const filterUnique = <T>(array: T[]): T[] => Array.from(
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
        .filter((t) => !t.isEmpty())

    return filterUnique(possibleTraits.flatMap((pt) => findPath(pt)))
        .sort((a,b) => sum(a) - sum(b))
}

const sum = (xp: XpsSelected) => Object.values(xp).reduce((prev, current) => prev + current)
