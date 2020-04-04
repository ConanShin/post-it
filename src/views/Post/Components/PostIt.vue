<template>
    <div class="post-it">
        <div class="menu">
            <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/>
        </div>
        <div class="text-area">
            {{post.text}}
        </div>
        <div class="author">{{post.name}}</div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'

    @Component
    export default class PostIt extends Vue {
        @Prop() post

        deletePost() {
            if(confirm('정말 삭제하시겠습니까?')) {
                this.$store.dispatch('deletePost', this.post.uid)
            }
        }
    }
</script>

<style scoped lang="scss">
    .post-it {
        margin: 5px;
        display: flex;
        flex-direction: column;
        background: lightgoldenrodyellow;
        font-size: 13px;
        padding: 13px;
        box-shadow: 6px 6px 5px 0px rosybrown
    }
    .delete-button {
        height: 16px;
        float: right;
        cursor: pointer;
    }
    .text-area {
        width: 230px;
        height: 200px;
        white-space: pre-wrap;
        text-align: left;
        overflow-y: auto;
        word-break: break-all;
    }
    .author {
        text-align: right;
    }
</style>
