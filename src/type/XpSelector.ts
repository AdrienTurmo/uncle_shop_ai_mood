export type XpSelector =
    'Bath' |
    'Food' |
    'Cake' |
    'Nature' |
    'Hangover_Poo' |
    'Rain' |
    'Death' |
    'Stress';

export const XP_EFFECTS = new Map<XpSelector, number[]>([
    ['Bath', [2, 0, 0, 0]],
    ['Food', [2, 0, 0, 1]],
    ['Cake', [1, 0, 1, 0]],
    ['Nature', [0, 0, 2, 0]],
    ['Hangover_Poo', [0, 1, 0, 2]],
    ['Rain', [0, 1, 0, 0]],
    ['Death', [0, 3, 0, 0]],
    ['Stress', [0, 0, 0, 3]],
])
