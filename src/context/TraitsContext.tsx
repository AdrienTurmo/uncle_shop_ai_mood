import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Mood, Trait, TraitValues, XpSelector } from '@/type';
import { calculateMood } from '@/services/MoodCalculator.ts';

interface TraitsContextData {
    getValueOf: (trait: Trait) => number
    changeValueOf: (trait: Trait, newValue: number) => void
    getMood: () => Mood
    getMoodWithXp: () => Mood
    getXpOf: (trait: Trait) => number
    addXp: (xp: XpSelector) => void
    isValid: () => boolean
    reset: () => void
}

const TraitsContext: React.Context<TraitsContextData> = createContext({
    getValueOf: () => 0,
    changeValueOf: () => {},
    getMood: () => 'NEUTRAL',
    getMoodWithXp: () => 'NEUTRAL',
    getXpOf: () => 0,
    addXp: () => {},
    isValid: () => true,
    reset: () => {},
} as TraitsContextData);

const useTraitsContext = () => useContext(TraitsContext)

interface TraitsContextParams {
    children: React.ReactNode;
}

const TraitsContextProvider: React.FC<TraitsContextParams> = ({ children }) => {
    const [traits, setTraits] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))
    const [xps, setXps] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))

    const getValueOf = (trait: Trait): number => traits.get(trait)

    const changeValueOf = (trait: Trait, newValue: number) => setTraits(prev => prev.set(trait, newValue))

    const getMood = () => calculateMood(traits)
    const getMoodWithXp = () => calculateMood(traits.add(xps))

    const getXpOf = (trait: Trait): number => xps.get(trait)

    const addXp = (xp: XpSelector) => setXps(prev => prev.addXp(xp))

    const reset = () => {
        setTraits(new TraitValues(0, 0, 0, 0))
        setXps(new TraitValues(0, 0, 0, 0))
    }

    const isValid = () => (traits.add(xps)).isValid()

    return (
        <TraitsContext.Provider value={{ getValueOf, changeValueOf, getMood, getMoodWithXp, getXpOf, addXp, reset, isValid }}>
            {children}
        </TraitsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTraitsContext, TraitsContextProvider };
