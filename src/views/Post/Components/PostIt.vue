<template>
    <div :author="post.name" class="post-it">{{post.text}}</div>
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
        display: inline-block;
        width: 200px;
        height: 200px;
        background: lightgoldenrodyellow;
        font-size: 14px;
        padding: 15px 15px 30px 15px;
        margin: 5px;
        white-space: pre-wrap;
        text-align: left;
    }
    [author]::after {
        content: attr(author);
        position: relative;
        top: 205px;
        float: right;
    }
</style>
