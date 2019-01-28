<template>
    <ol class="entry-list">
        <li
            v-for="(item, index) in data"
            :key="index">
            {{ item }}
        </li>
    </ol>
</template>

<script>
    export default {
        name: 'EntryList',
        props: {
            data: {
                type: Array,
                default: null,
            },
        },
    }
</script>
