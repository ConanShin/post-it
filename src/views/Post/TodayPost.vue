<template>
    <div class="today-post">
        <h3>Today Post</h3>
        <article class="post-it-area">
            <div class="post-it" v-for="post in todayPost">{{post.text}}</div>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class TodayPost extends Vue {
        get todayPost () {
            return this.$store.getters.filteredTodayPost
        }
    }
</script>

<style scoped lang="scss">
    h3 {
        display: inline-block;
    }
    .post-it-area {
        display: flex;
        flex-wrap: wrap;
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
