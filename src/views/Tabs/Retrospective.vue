<template>
    <div class="retrospective">
        <table class="progress-table">
            <thead>
            <tr class="progress-tr month-name">
                <th class="progress-cell item-name-cell"></th>
                <th class="progress-cell" v-for="month in months"> {{ month }}</th>
            </tr>
            </thead>
            <tbody>
            <tr class="progress-tr" v-for="(itemPosts, index) in postListByItem">
                <td class="progress-cell item-name-cell"> {{
                        items[index] ?
                            items[index].name.split(',').join('\n') : 'undefined'
                    }}
                </td>
                <td class="progress-cell task-cell" v-for="posts in postListByMonth(itemPosts)">
                    <div v-for="post in posts" class="done-task" :style="{'backgroundColor': post.color}"
                         @click.stop.prevent="() => showPost(post)">{{ post.text }}
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
import DateUtil from '@/utils/Date'
import PostIt from '@/views/Post/Components/PostIt'

@Component({
    components: {PostIt}
})
export default class Retrospective extends Vue {
    get months() {
        return DateUtil.months
    }

    get items() {
        return this.$store.getters.items
    }

    selectedPost = null

    get postListByItem() {
        this.hidePost()
        const tasksItems = Array.from({length: this.items.length}, e => [])
        this.$store.getters.finishedMyPosts.forEach(post => {
            const itemIndex = this.items.findIndex(item => item.id === Number(post.item_id))
            tasksItems[itemIndex].push(post)
        })
        return tasksItems
    }

    postListByMonth(itemTasks) {
        const tasksInMonth = Array.from({length: 12}, e => [])
        itemTasks.forEach(post => {
            const postDate = new Date(post.date)
            const nthMonth = postDate.getMonth()
            if (nthMonth > -1)
                tasksInMonth[nthMonth].push(post)

        })
        return tasksInMonth
    }

    showPost(selectedPost) {
        this.selectedPost = selectedPost
    }

    hidePost() {
        this.selectedPost = null
    }
}
</script>

<style scoped lang="scss">
    .retrospective {
        padding: 10px 0;
        top: -10px;
        position: relative;
        overflow: auto;
    }

    .popup-position {
        position: absolute;
        top: 25vh;
        left: 25vw;
    }

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
        .progress-tr {
            height: 13vh;
        }
        .month-name {
            height: 20px;
        }
        .task-cell {
            vertical-align: baseline;
            overflow-y: auto;
            max-height: 200px;
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