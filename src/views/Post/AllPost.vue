<template>
    <div class="all-post">
        <h3>All Post</h3>
        <article class="post-it-area">
            <template v-for="post in allPost">
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
    export default class AllPost extends Vue {
        get allPost () {
            return this.$store.getters.filteredAllPost
        }
    }
</script>

<style lang="scss">
    @import "@/utils/Common.scss";

    h3 {
        display: inline-block;
    }
    .post-it-area {
        @include post-it-area;
    }
</style>
