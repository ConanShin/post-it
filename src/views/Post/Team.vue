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

<style lang="scss">
    @import '@/utils/MediaQuery.scss';

    @include desktop {
        .team-page .date-picker .calendar {
            margin-left: -87px;
            margin-top: 26px;
        }
    }

    @include mobile {
        .team-page .date-picker .calendar {
            bottom: -19px;
        }
    }
</style>

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
