import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Mood, Trait, TraitValues, XpSelector } from '@/type';

export type XpsSelected = Record<XpSelector, number>

export const defaultXpsSelected: XpsSelected = {
    Bath: 0,
    Food: 0,
    Cake: 0,
    Nature: 0,
    Hangover_Poo: 0,
    Rain: 0,
    Death: 0,
    Stress: 0,
}

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
    resetTraits: () => void
    resetXp: () => void
    resetAll: () => void
    getTraits: () => TraitValues
    getXpsSelected: () => XpsSelected
}

const TraitsContext: React.Context<TraitsContextData> = createContext({
    getValueOf: () => 0,
    increaseValueOf: () => {},
    decreaseValueOf: () => {},
    getMood: () => 'NEUTRAL',
    getMoodWithXp: () => 'NEUTRAL',
    getXpOf: () => 0,
    addXp: () => {},
    removeXp: () => {},
    isValid: () => true,
    resetTraits: () => {},
    resetXp: () => {},
    resetAll: () => {},
    getTraits: () => new TraitValues(0, 0, 0, 0),
    getXpsSelected: () => defaultXpsSelected,
} as TraitsContextData);

const useTraitsContext = () => useContext(TraitsContext)

interface TraitsContextParams {
    children: React.ReactNode;
}

const TraitsContextProvider: React.FC<TraitsContextParams> = ({ children }) => {
    const [traits, setTraits] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))
    const [xps, setXps] = useState<TraitValues>(new TraitValues(0, 0, 0, 0))
    const [xpsSelected, setXpsSelected] = useState<XpsSelected>(defaultXpsSelected)

    const getValueOf = (trait: Trait): number => traits.get(trait)

    const increaseValueOf = (trait: Trait) => setTraits(prev => prev.increase(trait))
    const decreaseValueOf = (trait: Trait) => setTraits(prev => prev.decrease(trait))

    const getMood = () => traits.calculateMood()
    const getMoodWithXp = () => (traits.add(xps)).calculateMood()

    const getXpOf = (trait: Trait): number => xps.get(trait)

    const addXp = (xp: XpSelector) => {
        setXps(prev => prev.addXp(xp))
        setXpsSelected(prev => ({
            ...prev,
            [xp]: prev[xp] + 1
        }))
    }
    const removeXp = (xp: XpSelector) => {
        setXps(prev => prev.remove(xp))
        setXpsSelected(prev => ({
            ...prev,
            [xp]: Math.max(prev[xp] - 1, 0)
        }))
    }

    const resetTraits = () => {
        setTraits(new TraitValues(0, 0, 0, 0))
    }

    const resetXp = () => {
        setXps(new TraitValues(0, 0, 0, 0))
        setXpsSelected(defaultXpsSelected)
    }

    const resetAll = () => {
        resetTraits()
        resetXp()
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
            resetTraits,
            resetXp,
            resetAll,
            isValid,
            getTraits: () => traits,
            getXpsSelected: () => xpsSelected,
        }}>
            {children}
        </TraitsContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export { useTraitsContext, TraitsContextProvider };
