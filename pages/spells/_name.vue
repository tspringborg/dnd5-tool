<template>
    <div>
        <h1>{{ spell.name }}</h1>
        <Entries :data="spell.entries"/>
        <Entries
            :data="spell.entriesHigherLevel"
        />
    </div>
</template>

<script>
    import _ from 'lodash'
    import Entries from '@/components/entries/Entries'

    export default {
        name: 'Name',
        components: {
            Entries,
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
