<template>
    <div class = "post-rollup-wrapper">
        <span class = "default-item-icon" :style="{'background-color': currentColor}"></span>
        <div class="post-rollup-body">
            <div class="post-rollup-title">Etc</div>
            <div class="post-rollup-content">{{post.text}}</div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import Color from "@/model/Color";
    import ConfirmAction from '@/utils/ConfirmAction'

    @Component
    export default class PostIt extends Vue {
        @Prop() post

        get currentColor() {
            if (this.post.isMyPost) {
                const myColor = new Color(this.$store.getters.postColor)
                if (this.isPublished) return myColor.value()
                else return myColor.transparentValue()
            }
            return this.post.color
        }

        get name() {
            if (this.post.isMyPost) return this.$store.getters.userName
            else return this.post.name
        }
        get isPublished() {
            return this.post.private_yn === 'n'
        }

        editPost() {
            this.$store.commit('disableSearch')
            this.post.editable = true
        }

        savePost() {
            this.$store.commit('enableSearch')
            this.post.editable = false
            if (confirm('저장 하시겠습니까?')) {
                this.$store.dispatch('updatePost', this.post)
            } else {
                this.post.newNote = this.post.text
            }
        }

        unpublishPost() {
            ConfirmAction('비공개로 전환 하시겠습니까?', () => this.$store.dispatch('unpublishPost', this.post.uid))
        }

        publishPost() {
            ConfirmAction('공유 하시겠습니까?', () => this.$store.dispatch('publishPost', this.post.uid))
        }

        deletePost() {
            ConfirmAction('삭제 하시겠습니까?', () => this.$store.dispatch('deletePost', this.post.uid))
        }

        finishPost() {
            if (confirm('완료처리 하시겠습니까?')) {
                this.$store.dispatch('finishPost', this.post.uid)
            }
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
        width: 24px;
        height: 24px;
        margin-top: -5px;
        margin-left: -15px;
        margin-right: 10px;
        line-height: 28px;
        // background-color: white;
        border-radius: 50%;
    }
    .post-rollup-body{
        margin-left: 20px;
        white-space: initial;
    }
    .post-rollup-title{
        font-weight: 600!important;
        font-size: 1.1em;
    }
</style>
