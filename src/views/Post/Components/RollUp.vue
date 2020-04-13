<template>
    <div class = "post-rollup-wrapper">
        <!-- <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/> -->
        <span class = "default-item-icon" :style="{'background-color': post.color}"></span>
        <div class="post-rollup-body">
            <div class="post-rollup-title">{{post.item_name}}</div>
            <div class="post-rollup-content">{{post.text}}</div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import Helper from '@/utils/HelperMethods'

    @Component
    export default class PostIt extends Vue {
        @Prop() post

        deletePost() {
            Helper.confirmAction('삭제 하시겠습니까?', () => this.$store.dispatch('deletePost', this.post.uid))
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";

    .post-rollup-wrapper{
        padding: 24px 24px 0px 24px;
    }
    .default-item-icon{
        float: left;
        width: 15px;
        height: 15px;
        margin-top: 1px;
        margin-left: -10px;
        margin-right: 10px;
        line-height: 28px;
        // background-color: white;
        border-radius: 50%;
    }
    .post-rollup-body{
        margin-left: 20px;
        white-space: pre-wrap;
    }
    .post-rollup-title{
        font-weight: 600!important;
        font-size: 1.1em;
    }

    .delete-button {
        height: 13px;
        cursor: pointer;
        padding: 3px;
        margin-left: 2px;
        float: right;
        @include embossed-button;
    }
</style>
