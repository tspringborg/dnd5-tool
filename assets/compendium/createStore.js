import _ from 'lodash'

const createStore = (data, config) => {
    if (!_.isArray(data)) {
        throw new Error('data must be an array')
    }
    
    return {
        state: () => {
            return {
                list: data,
            }
        },
    }
}

export default createStore