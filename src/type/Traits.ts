import { XP_EFFECTS, XpSelector } from '@/type/XpSelector.ts';
import { Mood } from '@/type/Moods.ts';

export type Trait =
    'JOY' |
    'MISERY' |
    'PASSION' |
    'DOUBT';

export const MAX_TRAIT_VALUE = 4

export class TraitValues {
    readonly joy: number;
    readonly misery: number;
    readonly passion: number;
    readonly doubt: number;

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

    static fromArray(array: number[] | undefined = [0, 0, 0, 0]) {
        return new TraitValues(array[0] || 0, array[1], array[2], array[3])
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

    increase(trait: Trait) {
        switch (trait) {
            case 'JOY':
                return new TraitValues(Math.min(MAX_TRAIT_VALUE, this.joy + 1), this.misery, this.passion, this.doubt);
            case 'MISERY':
                return new TraitValues(this.joy, Math.min(MAX_TRAIT_VALUE, this.misery + 1), this.passion, this.doubt);
            case 'PASSION':
                return new TraitValues(this.joy, this.misery, Math.min(MAX_TRAIT_VALUE, this.passion + 1), this.doubt);
            case 'DOUBT':
                return new TraitValues(this.joy, this.misery, this.passion, Math.min(MAX_TRAIT_VALUE, this.doubt + 1));
        }
    }

    decrease(trait: Trait) {
        switch (trait) {
            case 'JOY':
                return new TraitValues(Math.max(0, this.joy - 1), this.misery, this.passion, this.doubt);
            case 'MISERY':
                return new TraitValues(this.joy, Math.max(0, this.misery - 1), this.passion, this.doubt);
            case 'PASSION':
                return new TraitValues(this.joy, this.misery, Math.max(0, this.passion - 1), this.doubt);
            case 'DOUBT':
                return new TraitValues(this.joy, this.misery, this.passion, Math.max(0, this.doubt - 1));
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
        const xpValues = XP_EFFECTS.get(xp) || [0, 0, 0, 0]
        return new TraitValues(
            this.joy + xpValues[0],
            this.misery + xpValues[1],
            this.passion + xpValues[2],
            this.doubt + xpValues[3]
        )
    }

    remove(xp: XpSelector) {
        const xpValues = XP_EFFECTS.get(xp) || [0, 0, 0, 0]
        return new TraitValues(
            Math.max(this.joy - xpValues[0], 0),
            Math.max(this.misery - xpValues[1], 0),
            Math.max(this.passion - xpValues[2], 0),
            Math.max(this.doubt - xpValues[3], 0)
        )
    }

    isValid() {
        return this.joy <= MAX_TRAIT_VALUE &&
            this.misery <= MAX_TRAIT_VALUE &&
            this.passion <= MAX_TRAIT_VALUE &&
            this.doubt <= MAX_TRAIT_VALUE;
    }

    calculateMood(): Mood | 'OVERLOAD' {
        if (!this.isValid()) return 'OVERLOAD'

        const { joy, misery, passion, doubt } = this
        const netJoy = joy - misery
        const netMisery = -netJoy
        const netPassion = passion - doubt
        const netDoubt = -netPassion


        if (netJoy === 0 && netPassion === 0) return 'BORED'
        if (netJoy < 2 && misery < 2 && passion < 2 && doubt < 2) return 'NEUTRAL'

        if (netJoy > 1) {
            if (netPassion === 0) return 'HAPPY'
            if (netPassion > 1) return 'LOVE'
            if (netDoubt > 0) return 'SHY'
            return 'ANXIOUS'
        } else {
            if (netMisery <= 1) return 'ANXIOUS'
            if (passion < 2 && doubt < 2) return 'SAD'
            if (netPassion > 1) return 'ANGRY'
            if (netDoubt > 1) return 'SCARED'
            return 'ANXIOUS'
        }
    }

    diff(traits: TraitValues): TraitValues | 'INVALID' {
        const result = new TraitValues(
            this.joy - traits.joy,
            this.misery - traits.misery,
            this.passion - traits.passion,
            this.doubt - traits.doubt
        )

        if (
            result.joy < 0 ||
            result.misery < 0 ||
            result.passion < 0 ||
            result.doubt < 0
        ) return 'INVALID'

        return result
    }

    isEmpty() {
        return this.joy === 0 &&
            this.misery === 0 &&
            this.passion === 0 &&
            this.doubt === 0
    }
}
