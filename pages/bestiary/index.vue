<template>
    <div>
        <table-of-contents :data="list"/>
    </div>
</template>

<script>

import Creature from '@/models/Creature'
import Fuse from 'fuse.js'
import _ from 'lodash'
import { VueGoodTable } from 'vue-good-table'
import { bindToStateComputed } from 'assets/utils'
import TableOfContents from '@/components/compendium/TableOfContents'

export default {
    name: 'Bestiary',
    components: {
        VueGoodTable,
        TableOfContents,
    },
    data() {
        return {
            sortBy: null,
        }
    },
    computed: {
        searchQuery: bindToStateComputed('spells.searchQuery', 'spells/set_searchQuery'),
        list() {
            return this.$store.state.bestiary.list
        },
        tableOptions() {
            return {
                //columns: [].concat(this.$store.state.spells.columns),
                'fixed-header': true,
                columns: [
                    {
                        label: 'Name',
                        field: 'name',
                    },
                    {
                        label: 'Environment',
                        field: (rowObj) => {
                            return _.get(rowObj, 'environment', []).join(', ')
                            //return rowObj.environment.join(', ')
                        },
                    },
                    {
                        label: 'CR',
                        field: 'cr',
                        sortFn: (x, y, col, rowX, rowY) => {
                            return 
                        },
                    },
                ],
                sortOptions: {
                    enabled: true,/*
                    initialSortBy: {
                        field: this.$store.state.bestiary.sort,
                        type: this.$store.state.bestiary.sortType,
                    },
                */
                },
                paginationOptions: {
                    enabled: true,
                    mode: 'records',
                    perPage: this.$store.state.bestiary.perPage,
                    position: 'top',
                    perPageDropdown: [25, 50, 100],
                    dropdownAllowAll: true,
                    setCurrentPage: this.$store.state.bestiary.currentPage,
                    nextLabel: 'next',
                    prevLabel: 'prev',
                    rowsPerPageLabel: 'Rows per page',
                    ofLabel: 'of',
                    pageLabel: 'page', // for 'pages' mode
                    allLabel: 'All',
                },
                /*
                'search-options': {
                    enabled: true,
                    trigger: 'enter',
                    skipDiacritics: true,
                    //searchFn: mySearchFn,
                    placeholder: 'Search spells',
                    //externalQuery: this.searchQuery,
                },*/
            }
        },
        tableRows() {
            return _.map(this.list, (item, index) => {
                return {
                    ...item,
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
        const data = this.list[0]
        console.log(data)
        const creature = new Creature(this.list[0])
        console.log(creature)
        
    },
    methods: {
        onSortChange(p) {
            this.$store.commit('spells/set_sort', p[0])
        },
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
