<template>
    <div class="dashboard-page">
        <div v-if="newItem.visible" class="new-item">
            <textarea v-model="newItem.text"></textarea>
            <div @click="saveNewItem" class="save-new-item button">save</div>
            <div @click="closeAddItem" class="close-add-item button">cancel</div>
        </div>
        <div class="head">
            <div class="month">{{month}}</div>
        </div>
        <table class="progress-table">
            <thead>
            <tr class="progress-tr week-name">
                <th class="progress-cell item-name-cell"></th>
                <th class="progress-cell" v-for="(days, index) in daysEachWeek"> week {{index + 1}}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="progress-tr" v-for="(itemPosts, index) in donePostsEachItem">
                <td class="progress-cell item-name-cell"> {{ itemList[index] ?
                    itemList[index].name.split(',').join('\n') : 'undefined'}}
                </td>
                <td class="progress-cell task-cell" v-for="posts in postsInWeek(itemPosts)">
                    <div v-for="post in posts" class="done-task" :style="{'backgroundColor': post.color}"
                         @click.stop.prevent="() => showPost(post)">{{post.text}}
                    </div>
                </td>
            </tr>
            </tbody>
        </table>
        <post-it v-if="selectedPost" :post="selectedPost" class="popup-position" v-click-outside="hidePost"></post-it>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from '@/views/Post/Components/PostIt'
    import DateUtil from '@/utils/Date'

    @Component({
        components: {PostIt}
    })
    export default class Dashboard extends Vue {
        now = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
        selectedPost = null

        get month() {
            return DateUtil.monthMapper(this.now)
        }

        get donePostsEachItem() {
            this.hidePost()
            const tasksItems = Array.from({length: this.itemList.length}, e => [])
            this.$store.getters.filteredFinishedPosts.forEach(post => {
                const itemIndex = this.itemList.findIndex(item => item.id === Number(post.item_id))
                tasksItems[itemIndex].push(post)
            })
            return tasksItems
        }

        postsInWeek(itemTasks) {
            const tasksInWeek = Array.from({length: this.daysEachWeek.length}, e => [])
            itemTasks.forEach(post => {
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

        get itemList() {
            return this.$store.getters.items
        }

        showPost(selectedPost) {
            this.selectedPost = selectedPost
        }

        hidePost() {
            this.selectedPost = null
        }

        // add work item
        newItem = {
            visible: false,
            text: ''
        }

        showAddItem() {
            this.newItem.visible = true
        }

        closeAddItem() {
            this.resetNewItem()
        }

        saveNewItem() {
            this.$store.dispatch('newItem', this.newItem.text)
            this.resetNewItem()
        }

        resetNewItem() {
            this.newItem.visible = false
            this.newItem.text = ''
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
        top: -10px;
        position: relative;
        overflow: auto;
    }


    .button {
        cursor: pointer;
        display: block;
        margin-left: 10px;
        padding: 5px;
    }

    .month {
        font-size: 2em;
        font-weight: 500;
        margin: 20px;

    }

    .add-new-item {
        margin: 8px;
    }

    .week {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
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

    // table 부분
    .progress-table {
        table-layout: fixed;
        width: 90%;
        margin: 0 auto;
        white-space: nowrap;
        padding: 10px;

        td {
            background-color: rgba(240, 240, 240, 0.5);
        }

        th, td {
            padding: 5px;
        }

        //tr
        .progress-tr {
            height: 13vh;
        }

        .week-name {
            height: 20px;
        }


        .task-cell {
            vertical-align: baseline;

            div.done-task {
                padding: 2px 4px;
                margin: 3px 0 3px 2px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

        }

        th.item-name-cell {
            width: 8vw;
        }

        td.item-name-cell {
            white-space: pre-wrap;
            background: rgba(256, 256, 256, 0.85);
            border-radius: 10% 0% 0% 10%/ 15%;
        }

    }


</style>
