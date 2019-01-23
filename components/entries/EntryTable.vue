<template>
    <div class="entry-table">
        <h4>{{ data.caption }}</h4>
        <table>
            <tr>
                <th
                    v-for="(column, index) in data.colLabels"
                    :key="index">
                    {{ column }}
                </th>
            </tr>
            <tr
                v-for="(row, rowIndex) in data.rows"
                :key="rowIndex">
                <td
                    v-for="(cell, cellIndex) in row"
                    :key="cellIndex">
                    {{ cell }}
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
    export default {
        name: 'EntryTable',
        props: {
            data: {
                type: Object,
                default: null,
            },
        },
        data() {
            return {
            }
        },
        methods: {
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
