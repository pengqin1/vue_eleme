<template>
    <div>
        <myheader :seller="seller"></myheader>
        <div class="tab">
            <router-link class="tab-item active" to="/goods">商品</router-link>
            <router-link class="tab-item" to="/ratings">评价</router-link>
            <router-link class="tab-item" to="/seller">商家</router-link>
        </div>
        <router-view :seller="seller"></router-view> 
    </div>
</template>

<script>
    import myheader from 'components/header/header.vue'
    
    // @import url('../static/css/reset.css')
    // @import url('../static/css/iconfont.css')

    export default {
        data() {
            return {
                seller: {}
            }
        },
        created: function() {
            this.$http.get('/api/seller').then((res) => {
                this.seller = res.body.data;
            }, (res) => {

            })
        },
        components: {
            myheader
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .tab {
        display: flex;
        width: 100%;
        height: 40px;
        line-height: 40px;
        border-bottom: 1px solid rgba(7, 17, 27, 0.1);
        overflow: hidden;
        position: relative;
        background: #fff;
        z-index: 3;
        .tab-item {
            flex: 1;
            text-align: center;
            color: rgb(77,85,93);
            & > a {
                display: block;
                font-size: 14px;
                color: rgb(77, 85, 93);

                &.active {
                    color: rgb(240, 20, 20);
                }
            }
            &.active {
                color: red;
            } 
        }
    }
</style>
