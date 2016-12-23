<template>
    <ul class="star">
        <li :class="[type, starSize]" v-for="type in starType"></li>
    </ul>
</template>

<script>
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: ['score', 'size'],
        computed: {
            starSize() {
                return 'size' + this.size;
            },
            starType() {
                let starType = [];
                let cal = Math.floor(this.score * 2) / 2;
                for (let i = 1; i <= 5; i++) {
                    if (cal >= i) {
                        starType.push(CLS_ON);
                    } else if (cal < i && cal > i - 1) {
                        starType.push(CLS_HALF);
                    } else {
                        starType.push(CLS_OFF);
                    }
                }
                return starType;
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../static/css/mixin.scss';

    .star {
        font-size: 0;

        li {
            display: inline-block;
            &.on.size24{
                @include bg-image('star24_on');
                width: 10px;
            }
            &.on.size36{
                @include bg-image('star36_on');
            }
            &.on.size48{
                @include bg-image('star48_on');
            }
            &.half.size24{
                @include bg-image('star24_half');
            }
            &.half.size36{
                @include bg-image('star36_half');
            }
            &.half.size48{
                @include bg-image('star48_half');
            }
            &.off.size24{
                @include bg-image('star24_off');
            }
            &.off.size36{
                @include bg-image('star36_off');
            }
            &.off.size48{
                @include bg-image('star48_off');
            }
            &.size24 {
                width: 10px;
                height: 10px;
                margin-right: 10px;

            }
            &.size36 {
                width: 15px;
                height: 15px;
                margin-right: 15px;
            }
            &.size48 {
                width: 20px;
                height: 20px;
                margin-right: 20px;
            }
        }
        
    }
</style>
