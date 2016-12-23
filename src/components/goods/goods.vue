<template>
    <div>
        <div class="goods-wrapper">
            <div class="menu-wrapper" ref="menuWrapper">
                <ul class="menu">
                    <li v-for="(goods, index) in allGoods" :class="{'active': currentIndex === index}" @click="updateCurGoods(goods, index, $event)"><p><span>
                        <i class="icon" :class="typeIconClass[goods.type]" v-if="goods.type>-1"></i>{{goods.name}}
                    </span></p></li>
                </ul>
            </div>
            <div class="foods-wrapper" ref="foodsWrapper">
                <div class="foods">
                    <div class="foods-type-wrapper" v-for="goods in allGoods">
                        <h2 class="title">{{goods.name}}</h2>
                        <ul class="foods-wrapper">
                            <li v-for="food in goods.foods">
                                <div class="icon"><img :src="food.icon"></div>
                                <div class="content">
                                    <p class="name">{{food.name}}</p>
                                    <div class="des" v-if="food.description">{{food.description}}</div>
                                    <p class="count">
                                        <span>月售{{food.sellCount}}份</span>
                                        <span class="rating">好评率{{food.rating}}%</span>
                                    </p>
                                    <div class="price">
                                        <span class="now">￥{{food.price}}</span>
                                        <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                        <div class="count-ctrl">
                                            <countCtrl :food="food" :selectFoods="selectFoods"></countCtrl>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <shoppingCart :selectFoods="selectFoods" :minPrice="seller.minPrice" :deliveryPrice="seller.deliveryPrice"></shoppingCart>
    </div>
</template>

<script>
    import countCtrl from './countCtrl.vue'
    import shoppingCart from './shoppingCart.vue'
    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                typeIconClass: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                allGoods: {},
                selectFoods: [],
                scrollY: 0,
                listHeight: []
            }
        },
        props: ['seller'],
        components: {
            countCtrl: countCtrl,
            shoppingCart: shoppingCart
        },
        created: function() {
            this.$http.get('/api/goods').then((res) => {
                this.allGoods = res.body.data;
                this.$nextTick(() => {
                    this._initScroll();
                    this._calculateHeight();
                })
            }, (res) => {

            })
        },
        computed: {
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let heightBegin = this.listHeight[i];
                    let heightEnd = this.listHeight[i + 1];
                    if ((this.scrollY >= heightBegin && this.scrollY < heightEnd) || !heightEnd) {
                        return i;
                    }
                }
                return 0;
            }
        },
        methods: {
            updateCurGoods(goods, index, event) {
                // 由于web版会触发两次事件，一次为浏览器原生的click事件，一次为better-scroll的派生事件，
                if (!event._constructed) {  // 浏览器原生的click事件 没有这个属性, 禁止掉，web版就不会触发两次
                    return;
                }
                this.scrollY = this.listHeight[index];   // 触发currentIndex的更新
                this.foodsScroll.scrollTo(0, -this.listHeight[index]);   // 右侧foods滚动到相应位置
            },
            _initScroll() {
                this.menuScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true
                });
                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    probeType: 3   // 实时返回当前滚动位置
                });

                this.foodsScroll.on('scroll', (pos) => {
                    this.scrollY = Math.abs(Math.round(pos.y));
                })
            },
            _calculateHeight() {
                let foodsList = this.$refs.foodsWrapper.getElementsByClassName('foods-type-wrapper');
                let height = 0;
                this.listHeight.push(height);
                for (let i = 0; i < foodsList.length; i++) {
                    let item = foodsList[i];
                    height += item.clientHeight;
                    this.listHeight.push(height);
                }
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../static/css/mixin.scss';

    .goods-wrapper {
        position: absolute;
        top: 174px;
        bottom: 47px;
        left: 0;
        right: 0;
        display: flex;
        overflow: hidden;

        .menu {
            width: 80px;
            margin-top: -1px;
            
            li {
                font-size: 0;
                padding: 0 12px;
                line-height: 14px;
                font-size: 12px;
                color: #333;
                font-weight: 200;
                background: #f6f6f6;

                p {
                    @include border-top-1px(rgba(7,17,27,0.1));
                    height: 54px;

                    .icon {
                        display: inline-block;
                        width: 12px;
                        height: 12px;
                        vertical-align: top;
                        margin-right: 3px;
                        margin-top: 1px;

                        &.decrease {
                            @include bg-image('decrease_3');
                        }
                        &.discount {
                            @include bg-image('discount_3');
                        }
                        &.guarantee {
                            @include bg-image('guarantee_3');
                        }
                        &.invoice {
                            @include bg-image('invoice_3');
                        }
                        &.special {
                            @include bg-image('special_3');
                        }
                    }
                    span {
                        vertical-align: middle;
                        display: inline-block;
                    }

                    &:before {
                        content: '';
                        height: 100%;
                        vertical-align: middle;
                        display: inline-block;
                    }
                }

                &.active {
                    background: #fff;
                    color: #111;

                    p {
                        @include border-none();
                    }

                    & + li {
                        p {
                            @include border-none();
                        }
                    }
                }
            }
        }

        .foods {
            flex: 1;
            .foods-type-wrapper {
                .title {
                    font-size: 12px;
                    color: rgb(147,153,159);
                    font-weight: normal/700;
                    line-height: 26px;
                    height: 26px;
                    padding-left: 14px;
                    border-left: 2px solid #d9dde1;
                    background: #f3f5f7;
                }
                .foods-wrapper {
                    padding: 0 18px;
                    li {
                        display: flex;
                        padding: 18px 0;

                        & + li {
                            @include border-top-1px(rgba(7,17,27,0.1));
                        }

                        .icon {
                            width: 65px;
                            height: 65px;
                            margin-right: 10px;
                            img {
                                width: 100%;
                            }
                        }

                        .content {
                            flex: 1;

                            .name {
                                font-size: 14px;
                                color: rgb(7,17,27);
                                line-height: 14px;
                                margin-top: 2px;
                            }
                            .des {
                                font-size: 10px;
                                color: rgb(147,153,159);
                                margin-top: 8px;
                                line-height: 14px;
                            }
                            .count {
                                margin-top: 9px;
                                font-size: 0;
                                line-height: 8px;
                                color: rgb(147,153,159);
                                span {
                                    font-size: 10px;
                                }
                                .rating {
                                    margin-left: 12px;
                                }
                            }
                            .price {
                                margin-top: 2px;
                                position: relative;
                                .now {
                                    font-size: 20px/28px;
                                    color: red;
                                    font-weight: normal/700;
                                    line-height: 24px;
                                }
                                .old {
                                    text-decoration: line-through;
                                    font-size: 10px;
                                    color: rgb(147,153,159);
                                    font-weight: normal/700;
                                    line-height: 24px;
                                    margin-left: 8px;
                                }
                                .count-ctrl {
                                    position: absolute;
                                    top: 2px;
                                    right: 0;
                                }
                            }

                        }
                    }
                }
            }
        }
    }
</style>
