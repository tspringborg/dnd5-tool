import spells_php from '@/assets/spells-php.json'
import spells_scag from '@/assets/spells-scag.json'
import spells_xge from '@/assets/spells-xge.json'
import _ from 'lodash'
import Fuse from 'fuse.js'

const satisfiesFilters = (item, filters) => {
    return true
}

const flattenEntries = (obj) => {
    if (_.has(obj, 'entries')) {
        return flattenEntries(obj.entries)
    } else if (_.isArray(obj)) {
        return _.map(obj, (item) => {
            if (_.isString(item)) {
                return item
            }
            return flattenEntries(item)
        })
    }
    return obj
}

export default {
    state: () => {
        const list = [].concat(
            spells_php.spell,
            spells_scag.spell,
            spells_xge.spell,
        )
        _.each(list, (item) => {
            // console.log(item)
            const entries = flattenEntries(item)
            const entriesHigherLevel = flattenEntries(item.entriesHigherLevel || [])
            item.flattenedEntries = _.flatMap([].concat(entries, entriesHigherLevel))
        })

        return {
            sort: 'level',
            sortType: 'asc',
            currentPage: 1,
            perPage: 50,
            searchQuery: '',
            list,
            columns: [
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
            ],
            filterOptions: {

            },
            
            
            searchOptions: {
                shouldSort: true,
                threshold: 0.6,
                location: 0,
                distance: 100,
                maxPatternLength: 32,
                minMatchCharLength: 1,
                // includeMatches: true,
                // includeScore: true,
                keys: [
                    'name',
                    'flattenedEntries',
                ],
            },
        }
    },

    mutations: {
        set_currentPage(state, n) {
            state.currentPage = n
        },
        set_perPage(state, n) {
            state.perPage = n
        },
        set_sort(state, value) {
            state.sort = value.field
            state.sortType = value.type
        },
        set_searchQuery(state, value) {
            state.searchQuery = value
        },
    },
    getters: {
        tableOptions: state => {
            return {
                columns: state.columns,
            }
        },
        // search: (state) => (phrase) => {
        //     const list = state.list
        //     const options = state.searchOptions
        //     const fuse = new Fuse(list, options)
        //     const result = fuse.search(str)
        //     return result
        // }
    },
    actions: {
        search(context, { str, filters }) {
            return new Promise((resolve, reject) => {
                const list = context.state.list
                const options = context.state.searchOptions
                const fuse = new Fuse(list, options)
                const result = fuse.search(str)
                resolve(result)
            })
        },
    },
}
