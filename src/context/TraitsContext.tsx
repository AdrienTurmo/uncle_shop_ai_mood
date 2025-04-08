import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Mood, Trait, TraitValues } from '@/type';
import { calculateMood } from '@/services/MoodCalculator.ts';

interface TraitsContextData {
    getValueOf: (trait: Trait) => number
    changeValueOf: (trait: Trait, newValue: number) => void
    getMood: () => Mood
}

const TraitsContext: React.Context<TraitsContextData> = createContext({
    getValueOf: () => 0,
    changeValueOf: () => {},
    getMood: () => 'NEUTRAL',
} as TraitsContextData);

const useTraitsContext = () => useContext(TraitsContext)

interface TraitsContextParams {
    children: React.ReactNode;
}

const TraitsContextProvider: React.FC<TraitsContextParams> = ({ children }) => {
    const [traits, setTraits] = useState<TraitValues>({
        joy: 0,
        misery: 0,
        passion: 0,
        doubt: 0,
    })

    const getValueOf = (trait: Trait): number => {
        switch (trait) {
            case 'JOY':
                return traits.joy;
            case 'MISERY':
                return traits.misery;
            case 'PASSION':
                return traits.passion;
            case 'DOUBT':
                return traits.doubt;
        }
    }

    const changeValueOf = (trait: Trait, newValue: number) => {
        switch (trait) {
            case 'JOY':
                setTraits(prev => ({ ...prev, joy: newValue }));
                break;
            case 'MISERY':
                setTraits(prev => ({ ...prev, misery: newValue }));
                break;
            case 'PASSION':
                setTraits(prev => ({ ...prev, passion: newValue }));
                break;
            case 'DOUBT':
                setTraits(prev => ({ ...prev, doubt: newValue }));
                break;
        }
    }

    const getMood = () => calculateMood(traits)

    return (
        <TraitsContext.Provider value={{ getValueOf, changeValueOf, getMood }}>
            {children}
        </TraitsContext.Provider>
    );
};

export { useTraitsContext, TraitsContextProvider };
