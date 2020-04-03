<template>
    <div class="all-post">
        <h3>All Post</h3>
        <article class="post-it-area">
            <div class="post-it" v-for="post in allPost">{{post.text}}</div>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class AllPost extends Vue {
        get allPost () {
            return this.$store.getters.filteredAllPost
        }
    }
</script>

<style lang="scss">
    h3 {
        display: inline-block;
    }
    .post-it-area {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .post-it {
        display: inline-block;
        width: 200px;
        height: 200px;
        background: lightgoldenrodyellow;
        font-size: 14px;
        padding: 15px;
        margin: 5px;
        white-space: pre-wrap;
        text-align: left;
    }
</style>
