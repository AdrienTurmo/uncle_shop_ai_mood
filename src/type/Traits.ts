import { XpSelector } from '@/type/XpSelector.ts';

export type Trait =
    'JOY' |
    'MISERY' |
    'PASSION' |
    'DOUBT';

export class TraitValues {
    private readonly joy: number;
    private readonly misery: number;
    private readonly passion: number;
    private readonly doubt: number;

    private XP_EFFECTS = new Map<XpSelector, number[]>([
        ['Bath', [2, 0, 0, 0]],
        ['Food', [2, 0, 0, 1]],
        ['Cake', [1, 0, 1, 0]],
        ['Nature', [0, 0, 2, 0]],
        ['Hangover Poo', [0, 1, 0, 2]],
        ['Rain', [0, 1, 0, 0]],
        ['Death', [0, 3, 0, 0]],
        ['Stress', [0, 0, 0, 3]],
    ])

    constructor(
        joy: number,
        misery: number,
        passion: number,
        doubt: number,
    ) {
        this.joy = joy;
        this.misery = misery;
        this.passion = passion;
        this.doubt = doubt;
    }

    get(trait: Trait) {
        switch (trait) {
            case 'JOY':
                return this.joy;
            case 'MISERY':
                return this.misery;
            case 'PASSION':
                return this.passion;
            case 'DOUBT':
                return this.doubt;
        }
    }

    set(trait: Trait, newValue: number) {
        switch (trait) {
            case 'JOY':
                return new TraitValues(newValue, this.misery, this.passion, this.doubt);
            case 'MISERY':
                return new TraitValues(this.joy, newValue, this.passion, this.doubt);
            case 'PASSION':
                return new TraitValues(this.joy, this.misery, newValue, this.doubt);
            case 'DOUBT':
                return new TraitValues(this.joy, this.misery, this.passion, newValue);
        }
    }

    add(traits: TraitValues) {
        return new TraitValues(
            this.joy + traits.joy,
            this.misery + traits.misery,
            this.passion + traits.passion,
            this.doubt + traits.doubt
        )
    }

    addXp(xp: XpSelector) {
        const xpValues = this.XP_EFFECTS.get(xp) || [0, 0, 0, 0]
        return new TraitValues(
            this.joy + xpValues[0],
            this.misery + xpValues[1],
            this.passion + xpValues[2],
            this.doubt + xpValues[3]
        )
    }

    isValid() {
        return this.joy <= 4 &&
            this.misery <= 4 &&
            this.passion <= 4 &&
            this.doubt <= 4;
    }
}
