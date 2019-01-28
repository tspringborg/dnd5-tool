<template>
    <div class="entry">
        <template v-if="isArray">
            <Entry
                v-for="(item, index) in data"
                :key="index"
                :data="item"
            />
        </template>
        <template v-else-if="isString">
            <p>{{ data }}</p>
        </template>
        <template v-else-if="isObject">
            <template v-if="data.type === 'entries'">
                <h4>{{ data.name }}</h4>
                <Entry :data="data.entries"/>
            </template>
            <template v-else-if="data.type === 'table'">
                <EntryTable :data="data"/>
            </template>
            <template v-else-if="data.type === 'list'">
                <EntryList :data="data.items"/>
            </template>
        </template>
    </div>
</template>

<script>
    import _ from 'lodash'
    import EntryTable from './EntryTable'
    import EntryList from './EntryList'

    export default {
        name: 'Entry',
        components: {
            EntryTable,
            EntryList,
        },
        props: {
            data: {
                type: [Array, String, Object],
                default: null,
            },
        },
        data() {
            return {
            }
        },
        computed: {
            isArray() {
                return _.isArray(this.data)
            },
            isString() {
                return _.isString(this.data)
            },
            isObject() {
                return _.isObject(this.data)
            },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
