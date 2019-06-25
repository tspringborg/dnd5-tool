import _ from 'lodash'

export const bindToStateComputed = (prop, commit) => {
    return {
        get() {
            return _.get(this.$store.state, prop, '')  
        },
        set(value) {
            this.$store.commit(commit, value)
        },
    }
}