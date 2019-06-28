
import VuexORM from '@vuex-orm/core'
import database from '@/database'

export const plugins = [
    VuexORM.install(database),
]

export const state = () => ({
    hello: 'hello',
    keyLabels: {
        str: 'Strength',
        wis: 'Wisdom',
        cha: 'Charisma',
        int: 'Intelligence',
        dex: 'Dexterity',
        hp: 'Hitpoints',
        N: 'Neutral',
        E: 'Evil',
        M: 'Medium',
        S: 'Small',
        L: 'Large',
        H: 'Huge',
        cr: 'Challenge Rating',
        ac: 'Armor Class',
    },
})

export const mutations = {}
export const actions = {}
export const getters = {}
