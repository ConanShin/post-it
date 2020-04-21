<template>
    <div class="dashboard-page">
        <div v-if="newItem.visible" class="new-item">
            <textarea v-model="newItem.text"></textarea>
            <div @click="saveNewItem" class="save-new-item button">save</div>
            <div @click="closeAddItem" class="close-add-item button">cancel</div>
        </div>
        <div class="head">
            <img class="move-month-button" @click="goToPreviousMonth" src="@/assets/arrow-left.png"/>
            <div class="month">{{month}}</div>
            <img class="move-month-button" @click="goToNextMonth" src="@/assets/arrow-right.png"/>
        </div>
        <table class="progress-table">
            <thead>
            <tr class="progress-tr week-name">
                <th class="progress-cell item-name-cell"></th>
                <th class="progress-cell" v-for="(days, index) in numOfWeeks"> week {{index + 1}}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="progress-tr" v-for="(itemPosts, index) in postListByItem">
                <td class="progress-cell item-name-cell"> {{ items[index] ?
                    items[index].name.split(',').join('\n') : 'undefined'}}
                </td>
                <td class="progress-cell task-cell" v-for="posts in getPostListByWeek(itemPosts)">
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

        get items() {
            return this.$store.getters.items
        }

        showPost(selectedPost) {
            this.selectedPost = selectedPost
        }

        hidePost() {
            this.selectedPost = null
        }


        // 월 표기 및 날짜 이동
        get month() {
            return DateUtil.monthMapper(this.now)
        }

        goToPreviousMonth() {
            var d = new Date(this.now);
            d.setDate(1);
            d.setMonth(d.getMonth() - 1);
            this.now = d;
        }

        goToNextMonth(){
            var d = new Date(this.now);
            d.setDate(1);
            d.setMonth(d.getMonth() + 1);
            this.now = d;
        }

        get startingDays(){
            const startingDay = 1 // 월요일
            return DateUtil.startingDays(this.now, startingDay)
        }

        get numOfWeeks(){
            return this.startingDays.length-1
        }

        // 주별/아이템별 포스트 가져오기
        get postListByItem() {
            this.hidePost()
            const tasksItems = Array.from({length: this.items.length}, e => [])
            this.$store.getters.filteredFinishedPosts.forEach(post => {
                const itemIndex = this.items.findIndex(item => item.id === Number(post.item_id))
                tasksItems[itemIndex].push(post)
            })
            return tasksItems
        }

        getPostListByWeek(itemTasks) {
            const tasksInWeek = Array.from({length: this.numOfWeeks}, e => [])
            itemTasks.forEach(post => {
                const postDate = new Date(post.date)
                const nthWeek = DateUtil.nthWeek(this.startingDays, postDate)
                if(nthWeek > 0)
                    tasksInWeek[nthWeek-1].push(post)

            })
            return tasksInWeek
        }

        // 아이템 추가/삭제 부분... Not using for now
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
        display: inline-block;
        width: 200px;
        font-size: 2em;
        font-weight: 900;
        bottom: 3px;
        margin: 20px 40px;

    }

    .move-month-button{
        display: inline-block;
        font-size: 2em;
        //@include embossed-button;

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
