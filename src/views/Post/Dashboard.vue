<template>
    <div class="dashboard-page">
        <div class="head">
            <div>{{month}}</div>
            <template v-for="(days, index) in daysEachWeek">
                <div class="nth-week">week {{index + 1}}</div>
                <div class="vertical-line"></div>
            </template>
        </div>
        <div class="body">
            <div v-for="week in donePostsInWeek" class="week">
                <div v-for="doneTask in week" class="done-task" :style="{'backgroundColor': doneTask.color}">{{doneTask.text}}</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import DateUtil from '@/utils/Date'

    @Component
    export default class Dashboard extends Vue {
        now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())

        get month () {
            return DateUtil.monthMapper(this.now)
        }

        get donePostsInWeek () {
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
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";

    $line-width: 2px;
    $cell-size: 3vw;
    $week-width: 16vw;

    .dashboard-page {
        padding: 10px 0;
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
            width: calc(100% - 24px);
            padding: 14px 5px;
            margin: 3px 3px 3px 4px;
            text-align: left;

            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            word-wrap: break-word;
        }
    }
</style>
