<template>
    <div>{{ $store.state.spells.list.length }}</div>
</template>

<script>

import Fuse from 'fuse.js'

export default {
    name: 'Spells',
    data() {
        return {}
    },
    mounted() {
        window.search = this.search
    },
    methods: {
        search(phrase) {
            const options = {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                includeMatches: true,
                includeScore: true,
                keys: [
                    'name',
                    'flattenedEntries',
                ],
            }
            const list = this.$store.state.spells.list
            const fuse = new Fuse(list, options)
            return fuse.search(phrase)
            // this.$store.dispatch('spells/search', { str: phrase, filters: null })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
