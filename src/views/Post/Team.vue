<template>
    <div class="team-page">
        <article class="post-it-area">
            <div class="block" v-if="postList.length === 0">&nbsp;</div>
            <post-it v-for="post in postList" :post="post" :key="'team-' + post.uid"></post-it>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from './Components/PostIt'

    @Component({
        components: {PostIt}
    })
    export default class Team extends Vue {
        get postList () {
            return this.$store.getters.filteredTeamPosts
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";
    .team-page {
        top: 10px;
    }
    .post-it-area {
        @include post-it-area;
    }
    .block {
        height: 1px;
    }
</style>
