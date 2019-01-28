<template>
    <div>
        <div>EzCarousel</div>
        <Carousel>
            <h1>Hello1</h1>
            <h1>Hello2</h1>
            <h1>Hello3</h1>
            <h1>Hello4</h1>
            <h1>Hello5</h1>
        </Carousel>
    </div>
</template>

<script>
    import Carousel from '@/components/EzCarousel'

    export default {
        name: 'Test',
        components: {
            Carousel,
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
