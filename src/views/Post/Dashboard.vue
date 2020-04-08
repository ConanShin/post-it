<template>
    <div class="dashboard-page">
        <div class="head">
            <div class="month">{{month}}</div>
            <template v-for="(days, index) in daysEachWeek">
                <div class="nth-week">week {{index + 1}}</div>
                <div class="vertical-line"></div>
            </template>
        </div>
        <div class="body">
            <div v-for="week in donePostsInWeek" class="week">
                <div v-for="doneTask in week" class="done-task" :style="{'backgroundColor': doneTask.color}"
                     @click.stop.prevent="() => showPost(doneTask)">
                    <div class="done-task-text">{{doneTask.text}}</div>
                </div>
            </div>
        </div>
        <post-it v-if="selectedPost" :post="selectedPost" class="popup-position" v-click-outside="hidePost"></post-it>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from '@/views/Post/Components/PostIt'
    import DateUtil from '@/utils/Date'
    import Color from '@/model/Color'
    import Helper from '@/utils/HelperMethods'

    @Component({
        components: {PostIt}
    })
    export default class Dashboard extends Vue {
        now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        selectedPost = null
        get month() {
            return DateUtil.monthMapper(this.now)
        }

        get donePostsInWeek() {
            const tasksInWeek = Array.from({length: this.daysEachWeek.length}, e => [])

            this.$store.getters.filteredFinishedPosts.forEach(post => {
                const nthWeek = DateUtil.nthWeek(new Date(post.date)) - 1 // index conversion
                tasksInWeek[nthWeek].push(post)
            })
            return tasksInWeek
        }

        get daysInFirstWeek() {
            const firstDayOfMonth = new Date(this.now.getFullYear(), this.now.getMonth(), 1)
            if (firstDayOfMonth.getDay() === 0) return 1
            return 8 - firstDayOfMonth.getDay()
        }

        get daysInLastWeek() {
            const lastDayOfMonth = new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0)
            if (lastDayOfMonth.getDay() === 0) return 7
            return lastDayOfMonth.getDay()
        }

        get fullWeeks() {
            const numberOfWeek = parseInt((new Date(this.now.getFullYear(), this.now.getMonth() + 1, 0).getDate() - this.daysInLastWeek - this.daysInFirstWeek) / 7)
            return Array(numberOfWeek).fill(7)
        }

        get daysEachWeek() {
            return [this.daysInFirstWeek, ...this.fullWeeks, this.daysInLastWeek]
        }

        showPost(selectedPost) {
            const post = Helper.deepcopy(selectedPost)
            post.color = new Color(post.color).solidValue()
            this.selectedPost = post
        }
        hidePost() {
            this.selectedPost = null
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";
    @import '@/utils/MediaQuery.scss';

    $line-width: 2px;
    $cell-size: 3vw;
    $week-width: 16vw;

    .dashboard-page {
        padding: 10px 0;
        position: relative;
    }

    .month{
        font-size: 2em;
        font-weight: 500;
        margin: 20px;

    }

    .cell {
        height: $cell-size;
        width: $cell-size;
        display: inline-block;
    }

    .nth-week, .week {
        &:last-of-type {
            border-right-color: transparent;
        }
    }

    .nth-week {
        display: inline-block;
        border-bottom: $line-width solid brown;
        padding: 15px 0;
    }

    .vertical-line {
        display: inline-block;
        width: $line-width;
        height: 80vh;
        background: brown;
        position: absolute;

        &:last-of-type {
            width: 0;
        }
    }

    .week {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
    }

    .nth-week, .week {
        width: $week-width;
    }

    .body {
        position: relative;

        .done-task {
            width: calc(100% - 22px);
            padding: 10px 5px;
            margin: 3px 0 3px 2px;
        }

        .done-task-text {
            text-align: left;
            box-sizing: border-box;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            white-space: pre-wrap;
            word-break: break-all;
        }
    }

    .popup-position {
        position: absolute;
    }

    @include mobile {
        .popup-position {
            top: 8vh;
            left: 15vw;
        }
    }

    @include desktop {
        .popup-position {
            top: 25vh;
            left: 25vw;
        }
    }
</style>
