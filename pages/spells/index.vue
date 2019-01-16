<template>
    <div>{{ $store.state.spells.list.length }}</div>
</template>

<script>

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
            this.$store.dispatch('spells/search', { str: phrase, filters: null })
        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
