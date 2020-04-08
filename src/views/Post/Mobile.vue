<template>
    <div class="dashboard-page">
        <article class="timeline-area">
            <div class="post-timeline">
                <h3 class = "post-timeline-month-heading">Apr. week 1 </h3>
                <roll-up v-for="post in postList" :post="post" :key="'team-' + post.uid"></roll-up>
            </div>
            <div class="show-more-button">show more</div>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from "./Components/PostIt";
    import RollUp from "./Components/RollUp"
    @Component({
        components: {RollUp}
    })
    export default class Dashboard extends Vue {
        get postList () {
            return this.$store.getters.filteredFinishedPosts
        }
    }
</script>

<style lang="scss">
    @import "@/utils/Common.scss";

    .dashboard-page{
        // background: rgba(256, 256, 256, 0.3);
        position: relative;
        height: 100% !important;
        top: -40px;
        // overflow: scroll;
    }
    .timeline-area {
        @include post-it-area;
        background: rgba(256, 256, 256, 0.3);
        position: relative;
        margin: 20px;
        padding:10px;
    }
    .post-timeline{
        width: 100%;
        text-align: left;
    }

    .post-timeline::before{
        content: "";
        background-color: white;
        display: block;
        width: 2px;
        position: absolute;
        top: 30px;
        bottom: 0;
        left: 30px;
        display: block;
        z-index: -1;
    }

    .post-timeline>div:last-child{
        padding-bottom: 20px;
    }

    .post-timeline-month-heading{
        font-weight: 600!important;
        background: rgba(256, 256, 256, 1);
        display: inline-block;
        margin-top: 0px;
        margin-bottom: 0px;

    }
    .post-timeline-month-heading::after{
        position: absolute;
        top: 20px;
        right: 0;
        left: 40px;
        z-index: -1;
        height: 1px;
        content: "";
        background-color: white;
    }

    .show-more-button{
        height: 30px;
        width: 100%;
        border: solid 1px white;
        line-height: 30px;
        margin: 0px 15px;
        border-radius: 10px;
    }
</style>
