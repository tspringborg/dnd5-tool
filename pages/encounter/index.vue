<template>
    <div>
        <h1>encounter</h1>
    </div>
</template>

<script>

import seed from '@/assets/seedRandom'
import _ from 'lodash'

export default {
    name: 'Encounter',
    components: {
    },
    data() {
        return {
        }
    },
    computed: {

    },
    mounted() {
        window.seed = seed
        if ('storage' in navigator && 'estimate' in navigator.storage) {

            navigator.storage.estimate()
                .then(function e(estimate){

                    console.log(`Using ${estimate.usage} out of ${estimate.quota} bytes.`)

                })
        }
    },
    methods: {
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
</style>
