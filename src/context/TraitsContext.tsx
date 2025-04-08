import * as React from 'react';
import { createContext, useContext, useState } from 'react';
import { Trait } from '@/type';

interface TraitsContextData {
    getValueOf: (trait: Trait) => number
    changeValueOf: (trait: Trait, newValue: number) => void
}

const TraitsContext: React.Context<TraitsContextData> = createContext({
    getValueOf: () => 0,
    changeValueOf: () => {},
} as TraitsContextData);

const useTraitsContext = () => useContext(TraitsContext)

interface TraitsContextParams {
    children: React.ReactNode;
}

const TraitsContextProvider: React.FC<TraitsContextParams> = ({ children }) => {
    const [joyValue, setJoyValue] = useState(0)
    const [miseryValue, setMiseryValue] = useState(0)
    const [passionValue, setPassionValue] = useState(0)
    const [doubtValue, setDoubtValue] = useState(0)

    const getValueOf = (trait: Trait): number => {
        switch (trait) {
            case 'JOY':
                return joyValue;
            case 'MISERY':
                return miseryValue;
            case 'PASSION':
                return passionValue;
            case 'DOUBT':
                return doubtValue;
        }
    }

    const changeValueOf = (trait: Trait, newValue: number) => {
        switch (trait) {
            case 'JOY':
                setJoyValue(newValue);
                break;
            case 'MISERY':
                setMiseryValue(newValue);
                break;
            case 'PASSION':
                setPassionValue(newValue);
                break;
            case 'DOUBT':
                setDoubtValue(newValue);
                break;
        }
    }

    return (
        <TraitsContext.Provider value={{ getValueOf, changeValueOf }}>
            {children}
        </TraitsContext.Provider>
    );
};

export { useTraitsContext, TraitsContextProvider };
