<template>
    <div>
        <h1>{{ spell.name }}</h1>
        <p>time: {{ spell.time }}</p>
        <p>duration: {{ spell.duration }}</p>
        <p>range: {{ spell.range }}</p>
        <p>level: {{ spell.level }}</p>

        <SpellComponents :data="spell.components"/>
        <Entries :data="spell.entries"/>
        <Entries
            :data="spell.entriesHigherLevel"
        />
    </div>
</template>

<script>
    import _ from 'lodash'
    import Entries from '@/components/entries/Entries'
    import SpellComponents from '@/components/SpellComponents'

    export default {
        name: 'Name',
        components: {
            Entries,
            SpellComponents,
        },
        data() {
            return {
            }
        },
        computed: {
            spell() {
                const list = this.$store.state.spells.list
                const name = this.$route.params.name
                const spell = _.find(list, {name})
                return spell
            },
        },
        methods: {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
