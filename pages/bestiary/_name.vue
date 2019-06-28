<template>
    <div>
        <h1>{{ beast.name }}</h1>
        <stats :data="beast"/>
        <div 
            v-for="item in beast.trait"
            :key="item.name"
            class="traits"
        >
            <h3>{{ item.name }}</h3>
            <entries :data="item.entries"/>
        </div>
        
        <div 
            v-for="item in beast.action"
            :key="item.name"
            class="actions"
        >
            <h3>{{ item.name }}</h3>
            <entries :data="item.entries"/>
        </div>

        <pre>{{ beast }}</pre>
    </div>
</template>

<script>
    import _ from 'lodash'
    import Entries from '@/components/entries/Entries'
    import Stats from '@/components/Stats'

    export default {
        name: 'Name',
        components: {
            Entries,
            Stats,
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
