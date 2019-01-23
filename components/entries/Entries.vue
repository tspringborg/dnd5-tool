<template>
    <div class="entries">
        <Entry
            v-for="(item, index) in data"
            :key="index"
            :data="item"
        />
    </div>
</template>

<script>
    import Entry from './Entry'

    export default {
        name: 'Entries',
        components: {
            Entry,
        },
        props: {
            data: {
                type: Array,
                default() {
                    return []
                },
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
