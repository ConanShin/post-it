<template>
    <div class="post-it">
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
    }
    .text-area {
        width: 200px;
        height: 200px;
        padding: 15px 15px 0 15px;
        white-space: pre-wrap;
        text-align: left;
        overflow-y: auto;
    }
    .author {
        text-align: right;
    }
</style>
