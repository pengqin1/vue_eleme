<template>
    <div class="header">
        <div class="header-goods">
            <div class="thumail">
                <img :src="seller.avatar">
            </div>
            <div class="content">
                <div class="goods-title">
                    <i class="title-icon"></i><h1>{{seller.name}}</h1>
                </div>
                <div class="goods-des">
                    {{seller.description}} / {{seller.deliveryTime}}分钟送达
                </div>
                <div class="goods-supports" v-if="seller.supports">
                    <i class="support-icon" :class=""></i> 
                    <span>{{seller.supports[0].description}}</span>
                    <p class="all-num" @click="showGoodsDetail()">{{seller.supports.length}}个</p>
                </div>
            </div>
        </div>
        <div class="header-notice" @click="showGoodsDetail()">
            <i class="notice-icon"></i>
            <span>{{seller.bulletin}}</span> 
        </div>
        <div class="header-bg">
            <img :src="seller.avatar">
        </div>
        
        <transition name="fade">
            <div class="full-modal" v-show="showDetail" ref="modalWrapper">
                <div class="modal-wrapper clear">
                    <div class="content">
                        <h1 class="name">{{seller.name}}</h1>
                        <div class="rating">
                            <ratings :score="seller.score" :size="48"></ratings>
                        </div>
                        <div class="module-title">
                            <span></span>
                            <h2>优惠信息</h2>
                            <span></span>
                        </div>  
                        <ul class="module-supports">
                            <li v-for="support in seller.supports">
                                <i class="icon" :class="supportIconClass[support.type]"></i><span>{{support.description}}</span>
                            </li>
                        </ul>
                        <div class="module-title">
                            <span></span>
                            <h2>商家公告</h2>
                            <span></span>
                        </div>
                        <div class="bulletin-detail">{{seller.bulletin}}</div>
                    </div> 
                </div>
                <div class="close"><i class="icon-close" @click="closeGoodsDetail()"></i></div>
            </div>
        </transition>
    </div>
</template>

<script>
    import ratings from '../ratings/ratings.vue'
    import BScroll from 'better-scroll'

    export default {
        props: ['seller'],
        components: {
            ratings
        },
        data() {
            return {
                supportIconClass: ['decrease', 'discount', 'special', 'invoice', 'guarantee'],
                showDetail: false
            }
        },
        methods: {
            showGoodsDetail() {
                this.showDetail = true;

                // this.$nextTick(() => {
                //     if (!this.modalScroll) {
                //         this._initScroll();
                //     } else {
                //         this.modalScroll.refresh();
                //     }
                // })
            },
            closeGoodsDetail() {
                this.showDetail = false;
            },
            _initScroll() {
                this.modalScroll = new BScroll(this.$refs.modalWrapper, {
                    click: true
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../../static/css/mixin.scss';

    .header {
        position: relative;
        overflow: hidden;
    }

    .header-goods {
        padding: 24px 12px 18px 24px;
        background: rgba(7,17,27,0.5);   
        display: flex;

        .thumail {
            width: 64px;
            height: 64px;
            margin-right: 16px;

            img {
                width: 100%;
                height: 100%;
                border-radius: 4px;
            }
        }
        .content {
            flex: 1;
            color: #fff;
            .goods-title { 
                line-height: 18px;
                margin-top: 2px;
                margin-bottom: 8px;
                font-size: 0;
                
                .title-icon {
                    display: inline-block;
                    font-size: 16px;
                    width: 30px;
                    height: 18px;
                    @include bg-image('brand');
                    vertical-align: top;
                    margin-right: 6px;
                }
                h1 {
                    font-size: 16px;
                    display: inline-block;
                    vertical-align: top;
                    font-weight: bold;
                }
            }
            .goods-des {
                font-size: 12px;
                font-weight: 200;
                margin-bottom: 10px;
            }
            .goods-supports {
                font-size: 10px;
                font-weight: 200;
                font-size: 0;
                position: relative;
                .support-icon {
                    width: 12px;
                    height: 12px;
                    @include bg-image('decrease_1');
                    display: inline-block;
                    vertical-align: top;
                    font-size: 12px;
                    margin-right: 4px;
                }
                span {
                    display: inline-block;
                    vertical-align: top;
                    line-height: 12px;
                    font-size: 12px;
                }
                .all-num {
                    position: absolute;
                    right: 0;
                    top: -7px;
                    padding: 7px 8px;
                    line-height: 12px;
                    font-size: 10px;
                    color: #fff;
                    font-weight: 200;
                    background: rgba(0,0,0,0.2);
                    border-radius: 10px;
                }
            }
        }
    }

    .header-notice {
        height: 28px;
        line-height: 28px;
        color: #fff;
        background: rgba(7,17,27,0.6);
        padding: 0 12px;
        font-size: 0;
        display: flex;

        .notice-icon {
            width: 22px;
            height: 12px;
            @include bg-image('bulletin');
            display: inline-block;
            margin-right: 4px;
            vertical-align: middle;
            margin-top: 8px;
        }

        span{
            flex: 1;
            font-size: 10px;
            vertical-align: top;
            white-space: nowrap;
            text-overflow: ellipsis;
            overflow: hidden;
        }

        .icon {
            width: 10px;
        }
    }

    .header-bg {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: -1;
        img {
            width: 100%;
            height: 100%;
             filter: blur(10px);
        }
    }

    .full-modal {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 200;
        background: rgba(7,17,27,0.8);
        -webkit-backdrop-filter: blur(10px);
        overflow: auto;

        .modal-wrapper {
            width: 80%;
            min-height: 100%;
            margin: 0 auto;

            .content {
                padding-bottom: 60px;
                color: #fff;

                .name {
                    font-size: 16px;
                    font-weight: 700;
                    line-height: 16px;
                    text-align: center;
                    padding-top: 60px;
                    margin-bottom: 16px;
                }

                .rating {
                    text-align: center;
                }

                .module-title {
                    display: flex;
                    margin-top: 28px;

                    span {
                        flex: 1;
                        display:inline-block;
                        border-top: 1px solid rgba(255,255,255,0.2);
                        margin-top: 7px;
                    }
                    h2 {
                        padding: 0 12px;
                        font-size: 14px;
                        font-weight: 700;
                    }
                }

                .module-supports {
                    margin-top: 24px;
                    padding: 0 12px;
                    li {
                        margin-bottom: 12px;
                        font-size: 12px;
                        font-weight: 200;
                        line-height: 12px;

                        .icon {
                            margin-right: 6px;
                            display: inline-block;
                            vertical-align: top;
                            margin-top: -2px;
                            width: 16px;
                            height: 16px;

                            &.decrease {
                                @include bg-image('decrease_2');
                            }
                            &.discount {
                                @include bg-image('discount_2');
                            }
                            &.guarantee {
                                @include bg-image('guarantee_2');
                            }
                            &.invoice {
                                @include bg-image('invoice_2');
                            }
                            &.special {
                                @include bg-image('special_2');
                            }

                        }
                    }
                }

                .bulletin-detail {
                    padding: 24px 12px;
                    font-size: 12px;
                    font-weight: 200;
                    line-height: 24px;
                }
            }  
        } 

        .close {
            margin-top: -50px;
            position: relative;
            text-align: center;
            clear: both;

            i {
                font-size: 32px;
                color: rgba(255,255,255,0.5);
            }
        }
    }
</style>
