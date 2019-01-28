<template>
    <!-- eslint-disable -->
    <div class="ez-carousel">
        <div class="track-wrapper" ref="trackWrapper"
            @mousedown="startDrag"
            @touchstart="startDrag">
            <div class="track" ref="track" :style="{transform: `translate3d(${trackPos}px, 0, 0)`}">
                <slot></slot>
            </div>
        </div>
        <div @click="next(true)" v-if="showControls" v-bind:class="{ inactive: currentIndex === slides.length - 1 }" class="next control">
            <slot name="next">
                <svg class="arrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 36.6 25.8" style="enable-background:new 0 0 36.6 25.8;" xml:space="preserve">
                    <polyline class="st0" points="23.5,0.2 36.2,12.9 23.5,25.6 "/>
                    <line class="st0" x1="36" y1="12.9" x2="0" y2="12.9"/>
                </svg>
            </slot>
        </div>
        <div @click="prev(true)" v-bind:class="{ inactive: currentIndex === 0 }" v-if="showControls" class="prev control">
            <slot name="next">
                <svg class="arrow" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                 viewBox="0 0 36.6 25.8" style="enable-background:new 0 0 36.6 25.8;" xml:space="preserve">
                    <polyline class="st0" points="23.5,0.2 36.2,12.9 23.5,25.6 "/>
                    <line class="st0" x1="36" y1="12.9" x2="0" y2="12.9"/>
                </svg>
            </slot>
        </div>
    </div>
</template>

<script>
    /* eslint-disable */

    import { TweenMax } from 'gsap'

    function easeOutQuad(t) {
        return t * (2 - t)
    }
    // lerp between two values
    function lerp(A, B, t) {
        return A + (t * (B - A))
    }

    export default {
        name: 'EzCarousel',
        props: {
            showControls: {
                default: true,
            },
            activeSlideClass: {
                type: String,
                default: 'active-slide',
            },
        },
        data() {
            return {
                index: 0,
                isDragging: false,
                drag: {
                    startX: 0,
                    startY: 0,
                    startTime: 0,
                    currentX: 0,
                    scrollY: 0,
                },
                track: {
                    x: 0,
                    size: 0,
                },
                slides: [],
                slideSize: 0,
                progressPercent: -1,
                targetIndex: 0,
                currentIndex: 0,
                timeline: false,
                seenAll: false,
            }
        },
        computed: {
            trackPos() {
                if (this.isDragging) {
                    return this.drag.currentX
                }
                return this.track.x
            },
        },
        mounted() {
            this.$nextTick(() => {
                // this.updateLayoutCalcs()
                // setting progressPercent is cheaper than forcing update. probably?
                this.progressPercent = 0
                this.slides = Array.from(this.$refs.track.children)
                this.slides[0].classList.add(this.activeSlideClass)
            })
        },
        watch: {
            targetIndex(newValue, oldValue) {
                this.slides[oldValue].classList.remove(this.activeSlideClass)
                this.slides[newValue].classList.add(this.activeSlideClass)
            },
            currentIndex(newValue, oldValue) {
            },
            trackPos(newValue, oldValue) {
                const x = newValue * -1
                const max = this.track.size
                this.progressPercent = _.clamp(x / max, 0, 1)
            },
        },
        methods: {
            next(emit) {
                this.goToIndex(this.targetIndex + 1, emit)
            },
            prev(emit) {
                this.goToIndex(this.targetIndex - 1, emit)
            },
            updateLayoutCalcs() {
                this.slideSize = this.$refs.trackWrapper.clientWidth
                this.track.size = this.slideSize * (this.slides.length - 1)
            },
            clearListeners() {
                _.each(['mouseup', 'touchend'], eventName => document.body.removeEventListener(eventName, this.handleDragEnd))
                _.each(['touchmove', 'mousemove'], eventName => document.body.removeEventListener(eventName, this.onDrag))
            },
            goToIndex(i, emit) {
                this.updateLayoutCalcs()
                const index = _.clamp(i, 0, this.slides.length - 1)
                const bestX = this.slideSize * index * -1
                TweenMax.to(this.track, 0.3, {
                    x: bestX,
                    onCompleteScope: this,
                    onComplete() {
                        this.currentIndex = index
                    },
                })
                if (i !== this.targetIndex && emit) {
                    this.$emit('beforeChange', {
                        newSlide: this.slides[index],
                        newIndex: index,
                        oldSlide: this.slides[this.currentIndex],
                        oldIndex: this.currentIndex,
                    })
                }
                this.targetIndex = index
            },
            handleDragEnd(event) {
                this.clearListeners()
                if (this.isDragging) {
                    this.isDragging = false
                    // snap to slide
                    const time = new Date().getTime() - this.drag.startTime
                    const dragDist = this.drag.startX - _.get(event, 'changedTouches[0]', event).pageX
                    let momentum = (dragDist / (time ** 1.2)) * dragDist
                    if (dragDist > 0) {
                        momentum *= -1
                    }
                    const x = _.clamp(this.drag.currentX + momentum, -this.track.size, 0) * -1
                    const bestIndex = Math.round(x / this.slideSize)
                    this.track.x = this.drag.currentX
                    this.goToIndex(bestIndex, true)
                }
            },
            startDrag(e) {
                if (!this.isDragging) {
                    this.updateLayoutCalcs()
                    const event = _.get(e, 'changedTouches[0]', e)
                    this.$emit('dragStart', this)
                    this.isDragging = true
                    this.drag.startTime = new Date().getTime()
                    this.drag.startX = event.pageX
                    this.drag.startY = event.pageY
                    this.drag.currentX = this.track.x
                    _.each(['mouseup', 'touchend'], eventName => document.body.addEventListener(eventName, this.handleDragEnd))
                    _.each(['touchmove', 'mousemove'], eventName => document.body.addEventListener(eventName, this.onDrag))
                }
            },
            onDrag(e) {
                const event = _.get(e, 'changedTouches[0]', e)
                const dragDistX = event.pageX - this.drag.startX
                const dragDistY = event.pageY - this.drag.startY
                this.drag.currentX = this.track.x + dragDistX
            },
        },
    }
</script>
<style lang="scss" scoped>
    .ez-carousel{
        text-align: center;
        .control {
            position: absolute;
            top: 50%;
            width: 14%;
            max-width: 80px;
            padding: 50px 15px;
            box-sizing: border-box;
            cursor: pointer;
            transition: all 200ms;
            &.inactive {
                opacity: 0;
                cursor: default;
            }
            &.next{
                right: 0px;
            }
            &.prev{
                left: 0;
                .arrow{
                    -webkit-transform: rotate(180deg);
                    -ms-transform: rotate(180deg);
                    transform: rotate(180deg);
                }
            }
            .arrow{
                .st0{
                    fill:none;
                    stroke:currentColor;
                    stroke-width:1.5;
                    stroke-miterlimit:10;
                }
            }
        }
    }
    .ez-carousel .track-wrapper {
        // position: relative;
        overflow: hidden;
        .track{
            display: flex;
            position: relative;
            *{
                user-select: none;
                -moz-user-select: none;
                -khtml-user-select: none;
                -webkit-user-select: none;
                -o-user-select: none;
            }
        }
        .track > * {
            // position: absolute;
            min-width: 100%;
            width: 100%;
            text-align: center;
        }
    }
</style>
