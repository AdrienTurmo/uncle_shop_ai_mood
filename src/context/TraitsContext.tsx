import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Mood, Trait, TraitValues, XpSelector } from '@/type';

interface TraitsContextData {
    getValueOf: (trait: Trait) => number
    increaseValueOf: (trait: Trait) => void
    decreaseValueOf: (trait: Trait) => void
    getMood: () => Mood
    getMoodWithXp: () => Mood
    getXpOf: (trait: Trait) => number
    addXp: (xp: XpSelector) => void
    removeXp: (xp: XpSelector) => void
    isValid: () => boolean
    reset: () => void
}

const TraitsContext: React.Context<TraitsContextData> = createContext({
    getValueOf: () => 0,
    increaseValueOf: () => {
    },
    decreaseValueOf: () => {
    },
    getMood: () => 'NEUTRAL',
    getMoodWithXp: () => 'NEUTRAL',
    getXpOf: () => 0,
    addXp: () => {
    },
    removeXp: () => {
    },
    isValid: () => true,
    reset: () => {
    },
} as TraitsContextData);

const useTraitsContext = () => useContext(TraitsContext)

interface TraitsContextParams {
    children: React.ReactNode;
}

const TraitsContextProvider: React.FC<TraitsContextParams> = ({ children }) => {
    const [traits, setTraits] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))
    const [xps, setXps] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))

    const getValueOf = (trait: Trait): number => traits.get(trait)

    const increaseValueOf = (trait: Trait) => setTraits(prev => prev.increase(trait))
    const decreaseValueOf = (trait: Trait) => setTraits(prev => prev.decrease(trait))

    const getMood = () => traits.calculateMood()
    const getMoodWithXp = () => (traits.add(xps)).calculateMood()

    const getXpOf = (trait: Trait): number => xps.get(trait)

    const addXp = (xp: XpSelector) => setXps(prev => prev.addXp(xp))
    const removeXp = (xp: XpSelector) => setXps(prev => prev.remove(xp))

    const reset = () => {
        setTraits(new TraitValues(0, 0, 0, 0))
        setXps(new TraitValues(0, 0, 0, 0))
    }

    const isValid = () => (traits.add(xps)).isValid()

    return (
        <TraitsContext.Provider value={{
            getValueOf,
            increaseValueOf,
            decreaseValueOf,
            getMood,
            getMoodWithXp,
            getXpOf,
            addXp,
            removeXp,
            reset,
            isValid
        }}>
            {children}
        </TraitsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTraitsContext, TraitsContextProvider };
