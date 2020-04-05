<template>
    <div class="today-post">
        <h3>Today Post</h3>
        <article class="post-it-area">
            <template v-for="post in todayPost">
                <post-it :post="post"></post-it>
            </template>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from './Components/PostIt'

    @Component({
        components: {PostIt}
    })
    export default class TodayPost extends Vue {
        get todayPost () {
            return this.$store.getters.filteredTodayPost
        }
        mounted() {
            console.log('mounted')
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";
    h3 {
        display: inline-block;
    }
    .post-it-area {
        @include post-it-area;
    }
</style>
