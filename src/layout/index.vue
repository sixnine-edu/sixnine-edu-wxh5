<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2020-03-25 10:19:35
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 20:07:06
-->
<template>
    <div class="layout-container">
        <router-view :key="key"></router-view>
        <div class="space-height"></div>
        <van-tabbar route active-color="#19B2FF">
            <van-tabbar-item replace to="/janbird">
                系统课程
                <template #icon="props">
                    <svg width="22px" height="20px" viewBox="0 0 40 35" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="美术" transform="translate(0.000000, -3.000000)" :fill="props.active?'#19B2FF':'#CCCCCC'">
                                <path d="M4,3 L36,3 C38.209139,3 40,4.790861 40,7 L40,29 C40,31.209139 38.209139,33 36,33 L4,33 C1.790861,33 2.705415e-16,31.209139 0,29 L0,7 C-2.705415e-16,4.790861 1.790861,3 4,3 Z M5,6 C3.8954305,6 3,6.8954305 3,8 L3,28 C3,29.1045695 3.8954305,30 5,30 L35,30 C36.1045695,30 37,29.1045695 37,28 L37,8 C37,6.8954305 36.1045695,6 35,6 L5,6 Z M20,27 C15.0294373,27 11,22.9705627 11,18 C11,13.0294373 15.0294373,9 20,9 C24.9705627,9 29,13.0294373 29,18 C29,22.9705627 24.9705627,27 20,27 Z M20,25 C23.8659932,25 27,21.8659932 27,18 C27,14.1340068 23.8659932,11 20,11 C16.1340068,11 13,14.1340068 13,18 C13,21.8659932 16.1340068,25 20,25 Z M18,14 L24,18 L18,22 L18,14 Z M11.5,35 L28.5,35 C29.3284271,35 30,35.6715729 30,36.5 C30,37.3284271 29.3284271,38 28.5,38 L11.5,38 C10.6715729,38 10,37.3284271 10,36.5 C10,35.6715729 10.6715729,35 11.5,35 Z"></path>
                            </g>
                        </g>
                    </svg>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/collage">
                成长学院
                <template #icon="props">
                    <svg width="22px" height="21px" viewBox="0 0 40 39" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="手机端（二期）" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <g id="成长学院" transform="translate(-102.000000, -2515.000000)">
                                <g id="内容" :fill="props.active?'#19B2FF':'#CCCCCC'">
                                    <g id="导航" transform="translate(0.000000, 2502.000000)">
                                        <g id="成长-copy" transform="translate(102.000000, 12.000000)">
                                            <g id="成长" transform="translate(0.000000, 1.000000)">
                                                <path d="M1.6,12.8 L17.6,0.8 C19.0222222,-0.266666667 20.9777778,-0.266666667 22.4,0.8 L38.4,12.8 C39.4072234,13.5554175 40,14.7409708 40,16 L40,35 C40,37.209139 38.209139,39 36,39 L4,39 C1.790861,39 2.705415e-16,37.209139 0,35 L0,16 C-1.5418661e-16,14.7409708 0.592776629,13.5554175 1.6,12.8 Z M11.5,30 C10.6715729,30 10,30.6715729 10,31.5 C10,32.3284271 10.6715729,33 11.5,33 L28.5,33 C29.3284271,33 30,32.3284271 30,31.5 C30,30.6715729 29.3284271,30 28.5,30 L11.5,30 Z" id="合并形状"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </g>
                        </g>
                    </svg>
                </template>
            </van-tabbar-item>
            <van-tabbar-item replace to="/user">
                个人
                <template #icon="props">
                    <svg width="22px" height="22px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <g id="组件" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                            <path d="M27.6284438,19.7778983 C27.8550846,19.5945722 28,19.3142095 28,19 C28,18.4477153 27.5522847,18 27,18 C26.6905394,18 26.4139102,18.140568 26.2304803,18.3613362 L26.1661339,18.3162937 C24.9840991,20.5094899 22.6661132,22 20,22 C17.3338868,22 15.0159009,20.5094899 13.8338661,18.3162937 L13.7695197,18.3613362 C13.5860898,18.140568 13.3094606,18 13,18 C12.4477153,18 12,18.4477153 12,19 C12,19.3142095 12.1449154,19.5945722 12.3715562,19.7778983 C13.9633428,22.3140107 16.7847794,24 20,24 C23.2152206,24 26.0366572,22.3140107 27.6284438,19.7778983 Z M6.45962374,25.2805392 C9.56464193,29.3638163 14.4744641,32 20,32 C25.5255359,32 30.4353581,29.3638163 33.5403763,25.2805392 C37.5116724,28.9356067 40,34.1772133 40,40 L0,40 C0,34.1772133 2.48832757,28.9356067 6.45962149,25.2805413 Z M20,30 C11.7157288,30 5,23.2842712 5,15 C5,6.71572875 11.7157288,0 20,0 C28.2842712,0 35,6.71572875 35,15 C35,23.2842712 28.2842712,30 20,30 Z" id="个人" :fill="props.active?'#19B2FF':'#CCCCCC'"></path>
                        </g>
                    </svg>
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
export default {
    data() {
        return {
            key: this.$route.fullPath,
        }
    },
    mounted() {},
}
</script>
<style lang="less">
.layout-container {
    .space-height {
        height: 70px;
    }
}
</style>