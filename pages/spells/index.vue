<template>
    <div>
        <div>{{ list.length }}</div>
        <VueGoodTable
            v-bind="tableOptions"
            :rows="tableRows"
            @on-page-change="(e) => {currentPage = e.currentPage}"
        >
            <template
                slot="table-row"
                slot-scope="props"
            >
                <span v-if="props.column.field == 'name'">
                    <nuxt-link
                        :to="`spells/${encodeURIComponent(props.formattedRow[props.column.field])}`"
                    >
                        {{ props.formattedRow[props.column.field] }}
                    </nuxt-link>
                </span>
                <span v-else>
                    {{ props.formattedRow[props.column.field] }}
                </span>
            </template>
        </VueGoodTable>
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
        tableOptions() {
            return {
                ...this.$store.getters['spells/tableOptions'],
            }
        },
        tableRows() {
            return _.map(this.list, (item, index) => {
                return {
                    ...item,
                    source: item.source + '(page '+item.page + ')',
                    classlist: _.map(item.classes.fromClassList, (c) => {
                        return c.name
                    }).join(', '),
                }
            })
        },
        tableSortOptions() {
            return this.$store.state.spells.sortOptions
        },
        tablePaginationOptions() {
            return this.$store.state.spells.paginationOptions
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
