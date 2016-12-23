<template>
    <div class="shopping-cart">
        <div class="statics" @click="toggleDetailCount">
            <div class="cart" :class="{'active': allCount>0}">
                <span class="icon-shopping_cart"></span>
                <span class='allCount' v-show="allCount>0">{{allCount}}</span>
            </div>
            <div class="allPrice" :class="{'active': allPrice>0}">￥{{allPrice}}</div>
            <div class="postage">另需配送费￥{{deliveryPrice}}元</div>
            <div class="pay" @click.stop="toPay" :class="{'highLight': showPay}">{{payDes}}</div>
        </div>

        <transition name="fade">
            <div class="modal" v-show="detailCountShow && allCount>0" @click="hideDetailCount"></div>
        </transition>
        
        <transition name="drop">
            <div class="detail-count" v-show="detailCountShow && allCount>0">
                <p class="title">购物车 <span class="clear" @click="clearFoods">清空</span></p>
                <div class="detail-wrapper" ref="selectFoodsWrapper">
                    <ul>
                        <li v-for="food in selectFoods" v-if="food.count>0">
                            <p class="count">
                                <countCtrl :food="food" :selectFoods="selectFoods"></countCtrl>
                            </p>
                            <p class="price">￥{{food.price}}</p>
                            <p class="name">{{food.name}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import countCtrl from './countCtrl.vue'
    import BScroll from 'better-scroll'

    export default {
        props: ['selectFoods', 'minPrice', 'deliveryPrice'],
        components: {
            countCtrl: countCtrl
        },
        data() {
            return {
                detailCountShow: false,
                showPay: false
            }
        },
        computed: {
            allPrice() {
                let all = 0;
                this.selectFoods.forEach(function(food, index) {
                    all += food.price * food.count;
                })
                return all;
            },
            allCount() {
                let all = 0;
                this.selectFoods.forEach(function(food, index) {
                    all += food.count;
                })
                if (all === 0) {
                    this.detailCountShow = false;
                }
                return all;
            },
            payDes() {
                let des;
                let allPrice = this.allPrice;
                if (this.selectFoods.length === 0) {
                    des = `￥${this.minPrice} 起送`;
                    this.showPay = false;
                } else if (allPrice < this.minPrice) {
                    let diff = this.minPrice - allPrice;
                    des = `还差￥${diff}起送`;
                    this.showPay = false;
                } else {
                    des = '去结算';
                    this.showPay = true;
                }
                return des;
            }
        },
        methods: {
            toggleDetailCount() {
                if (this.allCount > 0) {
                    this.detailCountShow = !this.detailCountShow;

                    if (this.detailCountShow) {
                        this.$nextTick(() => {
                            if (!this.selectFoodsScroll) {
                                this._initScroll();
                            } else {
                                this.selectFoodsScroll.refresh();
                            }
                        })
                    }
                }
            },
            clearFoods() {
                this.selectFoods.forEach(function(food, index) {
                    food.count = 0;
                })
                this.detailCountShow = false;
            },
            hideDetailCount() {
                this.detailCountShow = false;
            },
            toPay() {
                window.alert('去付款');
            },
            _initScroll() {
                this.selectFoodsScroll = new BScroll(this.$refs.selectFoodsWrapper, {
                    click: true
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../static/css/mixin.scss';

    .shopping-cart {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;

        .statics {
            height: 47px;
            background-color: #141d27;
            padding-left: 12px;
            font-size: 0;
            position: relative;
            z-index: 20;

            .cart {
                display: inline-block;
                vertical-align: top;
                color: rgba(255,255,255,0.4);
                line-height: 24px;
                padding: 6px;
                margin-right: 12px;
                font-size: 0;
                position: absolute;
                top: -11px;
                background-color: #141d27;
                border-radius: 50%;
                text-align: center;

                .icon-shopping_cart {
                    background-color: rgba(43,52,60,0.8);
                    border-radius: 50%;
                    width: 44px;
                    height: 44px;
                    line-height: 44px;
                    display: inline-block;
                    font-size: 24px;
                }

                .allCount {
                    font-size: 9px;
                    font-weight: 700;
                    color: #fff;
                    line-height: 16px;
                    background-color: rgb(240,20,20);
                    box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.4);
                    position: absolute;
                    right: 0;
                    top: 0;
                    display: block;
                    padding: 1px 6px;
                    width: 24px;
                    border-radius: 8px;
                }

                &.active {
                    
                    .icon-shopping_cart {
                        color: #fff;
                        background-color: rgb(0,160,220);
                    }
                }
            }
            .allPrice {
                margin-left: 68px !important;
            }
            .allPrice, .postage {
                line-height: 24px;
                font-size: 14px;
                color: rgba(255,255,255,0.4);
                font-weight: 700;
                display: inline-block;
                margin: 10px 0;
                padding-right: 12px;

                &.active {
                    color: #fff;
                }
            }
            .postage {
                border-left: 1px solid rgba(255,255,255,0.1);
                font-weight: normal;
                padding-left: 10px;
                font-size: 10px;
            }
            .pay {
                font-size: 13px;
                color: rgba(255,255,255,0.4);
                font-weight: 700;
                line-height: 47px;
                text-align: center;
                padding: 0 8px;
                width: 100px;
                position: absolute;
                right: 0;
                top: 0;
                background: rgba(43, 52, 60, 0.8);

                &.highLight {
                    background: rgb(4,138,63);
                    color: #fff;
                }

                .enough {
                    background: rgb(0,119,40);
                }
            }
        }

        .modal {
            position: fixed;
            top: 0;
            left: 0;
            right:0;
            bottom: 0;
            background-color: rgba(7,17,27,0.6);
            z-index: 9;
        }
        
        .detail-count {
            position: absolute;
            bottom: 47px;
            left: 0;
            width: 100%;
            background-color: #fff;
            z-index: 10;

            .title {
                background-color: #f3f5f7;
                height: 40px;
                line-height: 40px;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7,17,27);
                padding: 0 18px;
                border-bottom: 1px solid rgba(7,17,27,0.1);

                .clear {
                    float: right;
                    color: rgb(0,160,220);
                    font-size: 12px;
                }
            }

            .detail-wrapper {
                max-height: 204px;
                overflow: hidden;

                ul {
                    padding-bottom: 20px;
                    li {
                        padding-bottom: 12px;
                        margin: 12px 18px;
                        position: relative;
                        @include border-bottom-1px(rgba(7,17,27,0.1));

                        .name {
                            font-size: 14px;
                            color: rgb(7,17,27);
                            line-height: 24px;
                            overflow: hidden;
                        }

                        .price {
                            color: red;
                            float: right;
                            line-height: 24px;
                            margin-right: 12px;
                            margin-left: 18px;
                        }

                        .count {
                            float: right;
                        }
                    }
                }
            }  
        }
    }

    .drop-enter-active, .drop-leave-active {
        transition: all 0.4s linear;
        transform: translate3d(0, 0, 0);
    }
    .drop-enter, .drop-leave-active {
        transform: translate3d(0, 100%, 0);
    }
</style>
