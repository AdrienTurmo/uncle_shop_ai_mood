import * as React from 'react';
import styles from './XpSelectorDisplay.module.scss';
import { useTraitsContext } from '@/context/TraitsContext.tsx';
import { NumberInput } from '@/components';


export const XpSelectorDisplay: React.FC = () => {
    const { xpsSelected, addXp, removeXp, resetXp } = useTraitsContext();

    return (
        <div className={styles.XpSelectorDisplay}>
            <div className={styles.Title}>Xp Selector:</div>
            <div className={styles.List}>
                <div>
                    <div>Bath</div>
                    <div>2-0-0-0</div>
                    <NumberInput value={xpsSelected.Bath} onPlus={() => addXp('Bath')}
                                 onMinus={() => removeXp('Bath')} />
                </div>
                <div>
                    <div>Food</div>
                    <div>2-0-0-1</div>
                    <NumberInput value={xpsSelected.Food} onPlus={() => addXp('Food')}
                                 onMinus={() => removeXp('Food')} />
                </div>
                <div>
                    <div>Cake</div>
                    <div>1-0-1-0</div>
                    <NumberInput value={xpsSelected.Cake} onPlus={() => addXp('Cake')}
                                 onMinus={() => removeXp('Cake')} />
                </div>
                <div>
                    <div>Nature</div>
                    <div>0-0-2-0</div>
                    <NumberInput value={xpsSelected.Nature} onPlus={() => addXp('Nature')}
                                 onMinus={() => removeXp('Nature')} />
                </div>
                <div>
                    <div>Hangover Poo</div>
                    <div>0-1-0-2</div>
                    <NumberInput value={xpsSelected.Hangover_Poo} onPlus={() => addXp('Hangover_Poo')}
                                 onMinus={() => removeXp('Hangover_Poo')} />
                </div>
                <div>
                    <div>Rain</div>
                    <div>0-1-0-0</div>
                    <NumberInput value={xpsSelected.Rain} onPlus={() => addXp('Rain')}
                                 onMinus={() => removeXp('Rain')} />
                </div>
                <div>
                    <div>Death</div>
                    <div>0-3-0-0</div>
                    <NumberInput value={xpsSelected.Death} onPlus={() => addXp('Death')}
                                 onMinus={() => removeXp('Death')} />
                </div>
                <div>
                    <div>Stress</div>
                    <div>0-0-0-3</div>
                    <NumberInput value={xpsSelected.Stress} onPlus={() => addXp('Stress')}
                                 onMinus={() => removeXp('Stress')} />
                </div>
            </div>
            <button type="button" onClick={resetXp}>Reset Xp</button>
        </div>
    )
}
