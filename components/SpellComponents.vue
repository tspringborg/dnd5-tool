<template>
    <div>{{ prettyString }}</div>
</template>

<script>
    import _ from 'lodash'

    export default {
        name: 'SpellComponents',
        props: {
            data: {
                type: Object,
                default: null,
            },
        },
        computed: {
            prettyString() {
                let str = ''
                let sep = ''
                _.each(this.data, (value, key) => {
                    if (_.isBoolean(value)) {
                        if (value) str += sep+key
                    } else {
                        str += sep+key
                        if (_.isString(value)) {
                            str += `(${value})`
                        } else {
                            str += `(${value.text})`
                        }
                    }
                    sep = ', '
                })
                return str
            },
        },
    }
</script>
