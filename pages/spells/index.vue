<template>
    <div>
        <div>{{ list.length }}</div>
        <table>
            <th
                v-for="(name, index) in ['name']"
                :key="index"
                @click="sortBy = name"
            >
                {{ name }}
            </th>
        </table>
        <div v-for="(spell, index) in list" :key="index">
            <nuxt-link :to="`spells/${spell.name}`">
                <h3>{{ spell.name }}</h3>
            </nuxt-link>
        </div>
    </div>
</template>

<script>

import Fuse from 'fuse.js'

export default {
    name: 'Spells',
    data() {
        return {
            sortBy: null,
        }
    },
    computed: {
        list() {
            return this.$store.state.spells.list
        },
    },
    mounted() {
        window.search = this.search
    },
    methods: {
        search(phrase) {
            const payload = {
                str: phrase,
                filters: null,
            }
            return this.$store.dispatch('spells/search', payload)

        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
