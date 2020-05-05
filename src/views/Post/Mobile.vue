<template>
    <div class="dashboard-mobile-page">
            <div class="vl"></div>
        <article class="timeline-area">
            <div class="post-timeline">
                <div v-for="(week, index) in donePostsInWeek" v-if="hasSchedule(week)" class="week">
                    <h3 class = "post-timeline-month-heading">{{month}}. week {{index+1}} </h3>
                    <roll-up v-for="doneTask in week" :post="doneTask" :key="'team-' + doneTask.uid"></roll-up>
                </div>
            </div>
            <!-- <div class="show-more-button">show more</div> -->
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import RollUp from "./Components/RollUp"
    import DateUtil from '@/utils/Date'

    @Component({
        components: {RollUp}
    })
    export default class Dashboard extends Vue {


        now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        get month() {
            return DateUtil.monthMapper(this.now)
        }

        get startingDays(){
            const startingDay = 0; // 0: 일요일, 1: 월요일
            return DateUtil.startingDaysOfWeek(this.now, startingDay)
        }

        get numOfWeeks(){
            return this.startingDays.length-1
        }

        // 포스트 주별로 가져오기
        get donePostsInWeek() {
            const tasksInWeek = Array.from({length: this.numOfWeeks}, e => [])
            this.$store.getters.filteredFinishedPosts.forEach(post => {
                const postDate = new Date(post.date)
                const nthWeek = DateUtil.nthWeek(this.startingDays, postDate)
                if(nthWeek > 0)
                    tasksInWeek[nthWeek-1].push(post)

            })
            return tasksInWeek
        }

        hasSchedule(week) {
            if(week.length === 0) return false;
            return true;
        }
    }
</script>

<style lang="scss">
    @import "@/utils/Common.scss";

    .dashboard-mobile-page{
        // background: rgba(256, 256, 256, 0.3);
        position: relative;
        height: 100% !important;
        top: -10px;
        // overflow: scroll;
    }
    .vl{
        display: block;
        left: 50px;
        width: 2px;
        position: absolute;
        top: 30px;
        bottom: 0px;
        z-index: -1;
        background: linear-gradient(rgba(255, 255, 255, 1) 20%, rgba(255, 255, 255, 0));
    }
    .timeline-area {
        @include post-it-area;
        min-height: 78vh;
        background: rgba(256, 256, 256, 0.3);
        position: relative;
        margin: 20px;
        padding:10px;
        // margin-top: 30px;
    }

    .post-timeline{
        width: 100%;
        text-align: left;
    }
    .week{
        position: relative;
    }
    .week>div:last-child{
        padding-bottom: 40px;
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
        top: 10px;
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
        background-color: white;
        color: black;
        border: solid 1px white;
        line-height: 30px;
        margin: 0px 15px;
        border-radius: 10px;
    }
</style>
