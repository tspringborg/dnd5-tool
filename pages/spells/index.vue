<template>
    <div>
        <div>{{ list.length }}</div>
        <VueGoodTable
            :columns="tableColumns"
            :rows="tableRows"
        />
        <div
            v-for="(spell, index) in list"
            :key="index">
            <nuxt-link
                :to="`spells/${encodeURIComponent(spell.name)}`"
            >
                <h3>{{ spell.name }}</h3>
            </nuxt-link>
        </div>
    </div>
</template>

<script>

import Fuse from 'fuse.js'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table'

export default {
    name: 'Spells',
    components: {
        VueGoodTable,
    },
    data() {
        return {
            sortBy: null,
        }
    },
    computed: {
        list() {
            return this.$store.state.spells.list
        },
        tableColumns() {
            return [
                {
                    label: 'Level',
                    field: 'level',
                    type: 'number',
                },
                {
                    label: 'Name',
                    field: 'name',
                },
                {
                    label: 'Classes',
                    field: 'classlist',
                    type: 'array',
                },
                {
                    label: 'Source',
                    field: 'source',
                },
            ]
        },
        tableRows() {
            return _.map(this.list, (item, index) => {
                return {
                    ...item,
                    source: item.source + '(page '+item.page + ')',
                    classlist: _.map(item.classes.fromClassList, (c) => {
                        return c.name
                    }),
                }
            })
        },
    },
    mounted() {
        window.search = this.search
    },
    methods: {
        search(phrase) {
            const payload = {
                str: phrase,
                filters: null,
            }
            return this.$store.dispatch('spells/search', payload)

        },
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
