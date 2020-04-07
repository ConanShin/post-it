<template>
    <div class="team-page">
        <article class="post-it-area">
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
            return this.$store.getters.filteredTeamPost
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
