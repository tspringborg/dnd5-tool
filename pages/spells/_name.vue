<template>
    <div>
        <h1>{{ spell.name }}</h1>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Name',
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
