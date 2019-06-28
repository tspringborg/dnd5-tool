import bestiary_mm from '@/assets/data/bestiary-mm.json'
import _ from 'lodash'
import Fuse from 'fuse.js'
import createStore from '@/assets/compendium/createStore'
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

const list = [].concat(
    bestiary_mm,
)

const store = createStore(list)

export default store
