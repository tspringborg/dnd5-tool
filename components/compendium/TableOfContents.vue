<template>
    <div>
        {{ data }}
    </div>
</template>

<script>

import _ from 'lodash'

export default {
    name: 'Bestiary',
    components: {
    },
    props: {
        data: {
            type: Array,
            default() {
                return []
            },
        },
    },
    data() {
        return {
            sortBy: null,
        }
    },
    computed: {
    },
    mounted() {
    },
    methods: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
