<template>
    <div>
        <div>{{ list.length }}</div>
        <div v-for="(spell, index) in list" :key="index">
            <nuxt-link :to="spell.name">
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
        return {}
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
