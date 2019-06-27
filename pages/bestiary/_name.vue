<template>
    <div>
        <h1>{{ beast.name }}</h1>
        <pre>{{ beast }}</pre>
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
            beast() {
                const list = this.$store.state.bestiary.list
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
