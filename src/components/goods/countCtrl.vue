<template>
    <div class="countctrl-wrapper">
        <transition name="translate">
            <span class="icon-decrease" @click="decreaseCount($event)" v-show="food.count>0">
                <transition name="rotate">
                    <i class="icon-remove_circle_outline" v-show="food.count>0"></i>
                </transition>
            </span>
        </transition>
        <transition name="fade">
            <span class="counte" v-show="food.count>0">{{food.count}}</span>
        </transition>
        <span class="icon-add_circle" @click="addCount($event)"></span>
    </div>
</template>

<script>
    export default {
        props: ['food', 'selectFoods'],
        methods: {
            addCount(event) {
                // 由于web版会触发两次事件，一次为浏览器原生的click事件，一次为better-scroll的派生事件，
                if (!event._constructed) {  // 浏览器原生的click事件 没有这个属性, 禁止掉，web版就不会触发两次
                    return;
                }
                if (this.food.count || this.food.count === 0) {
                    this.food.count++;
                } else {
                    this.$set(this.food, 'count', 1);
                    this.selectFoods.push(this.food);
                }
            },
            decreaseCount(event) {
                if (!event._constructed) {
                    return;
                }
                if (this.food.count >= 1) {
                    this.food.count--;

                    // 删除
                    if (this.food.count === 0) {
                        var index = this.selectFoods.indexOf(this.food);
                        if (index > -1) {
                            this.selectFoods.splice(index, 1);
                        }
                    }
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../static/css/mixin.scss';
    .countctrl-wrapper {
        font-size: 0;

        .icon-add_circle, .icon-decrease {
            font-size: 24px;
            color: rgb(0,160,220);
            line-height: 24px;
            margin-right: 0;
            display: inline-block;
            vertical-align: top;
        }

        .icon-decrease i{
            display: inline-block;
        }

        .counte {
            font-size: 10px;
            color: rgb(147,153,159);
            line-height: 24px;
            display: inline-block;
            width: 24px;
            text-align: center;
            vertical-align: top;
        }
    }

    .translate-enter-active, .translate-leave-active {
        transition: all 0.3s linear;
        transform: translate3d(0,0,0);
    }
    .translate-enter, .translate-leave-active {
        opacity: 0;
        transform: translate3d(48px,0,0);
    }
    .rotate-enter-active, .rotate-leave-active {
        transition: all 0.3s linear;
        transform: rotate(0deg);
    }
    .rotate-enter, .rotate-leave-active {
        transform: rotate(180deg)
    }
</style>
