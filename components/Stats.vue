<template>
    <div class="stats">
        <div
            v-for="(stat, index) in stats"
            :key="index"
        >
            {{ stat }} : {{ data[stat] }}
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'Stats',
        props: {
            data: {
                type: Object,
                default: null,
            },
        },
        computed: {
            stats() {
                return [
                    'str',
                    'dex',
                    'int',
                    'wis',
                    'cha',
                ]
            },
        },
    }
</script>
