import spells_php from '@/assets/spells-php.json'
import spells_scag from '@/assets/spells-scag.json'
import spells_xge from '@/assets/spells-xge.json'
import _ from 'lodash'

const satisfiesFilters = (item, filters) => {
    return true
}

export default {
    state: () => {
        return {
            list: [].concat(
                spells_php.spell,
                spells_scag.spell,
                spells_xge.spell,
            ),
        }
    },
    actions: {
        search(context, { str, filters }) {
            let result = _
                .chain(context.state.list)
                .filter((value, index) => {
                    console.log(value)
                    if (!satisfiesFilters(value, filters)) {
                        return false
                    }
                    if (value.name.indexOf(str) !== -1) {
                        return true
                    }
                    _.each(value.entries, (entry, index) => {
                        let text = entry
                        if (_.isArray(entry)) {
                            text = entry.join('. ')
                        }
                        if (_.isObject(entry)) {
                            if (_.has(entry, 'entries')) {
                                text = entry.entries.join('. ')
                            } else {
                                text = ''
                            }
                        }
                        if (text.indexOf(str) !== -1) {
                            return true
                        }
                    })
                })
                .value()
            console.log(result)
            return result
        },
    },
}
