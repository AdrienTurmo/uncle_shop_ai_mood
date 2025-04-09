import * as React from 'react';
import styles from './XpSelectorDisplay.module.scss';
import { useTraitsContext } from '@/context/TraitsContext.tsx';
import { NumberInput } from '@/components';
import { XpSelector } from '@/type';
import { useState } from 'react';

type XpsSelected = Record<XpSelector, number>

export const XpSelectorDisplay: React.FC = () => {
    const { addXp, removeXp } = useTraitsContext();
    const [xps, setXps] = useState<XpsSelected>({
        Bath: 0,
        Food: 0,
        Cake: 0,
        Nature: 0,
        Hangover_Poo: 0,
        Rain: 0,
        Death: 0,
        Stress: 0,
    })

    const onClickPlus = (xp: XpSelector) => () => {
        setXps(prev => ({
            ...prev,
                [xp]: prev[xp] + 1
        }))
        addXp(xp)
    }

    const onClickMinus = (xp: XpSelector) => () => {
        setXps(prev => ({
            ...prev,
            [xp]: Math.max(prev[xp] - 1, 0)
        }))
        removeXp(xp)
    }

    return (
        <div className={styles.XpSelectorDisplay}>
            <div>Xp Selector:</div>
            <div className={styles.List}>
                <div>
                    <div>Bath</div>
                    <div>2-0-0-0</div>
                    <NumberInput value={xps.Bath} onPlus={onClickPlus('Bath')} onMinus={onClickMinus('Bath')} />
                </div>
                <div>
                    <div>Food</div>
                    <div>2-0-0-1</div>
                    <NumberInput value={xps.Food} onPlus={onClickPlus('Food')} onMinus={onClickMinus('Food')} />
                </div>
                <div>
                    <div>Cake</div>
                    <div>1-0-1-0</div>
                    <NumberInput value={xps.Cake} onPlus={onClickPlus('Cake')} onMinus={onClickMinus('Cake')} />
                </div>
                <div>
                    <div>Nature</div>
                    <div>0-0-2-0</div>
                    <NumberInput value={xps.Nature} onPlus={onClickPlus('Nature')} onMinus={onClickMinus('Nature')} />
                </div>
                <div>
                    <div>Hangover Poo</div>
                    <div>0-1-0-2</div>
                    <NumberInput value={xps.Hangover_Poo} onPlus={onClickPlus('Hangover_Poo')} onMinus={onClickMinus('Hangover_Poo')} />
                </div>
                <div>
                    <div>Rain</div>
                    <div>0-1-0-0</div>
                    <NumberInput value={xps.Rain} onPlus={onClickPlus('Rain')} onMinus={onClickMinus('Rain')} />
                </div>
                <div>
                    <div>Death</div>
                    <div>0-3-0-0</div>
                    <NumberInput value={xps.Death} onPlus={onClickPlus('Death')} onMinus={onClickMinus('Death')} />
                </div>
                <div>
                    <div>Stress</div>
                    <div>0-0-0-3</div>
                    <NumberInput value={xps.Stress} onPlus={onClickPlus('Stress')} onMinus={onClickMinus('Stress')} />
                </div>
            </div>
        </div>
    )
}
