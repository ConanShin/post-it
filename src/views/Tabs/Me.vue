<template>
    <div class="me-page">
        <div @click="showAddPost" class="add-new-post button">NEW +</div>
        <article class="post-it-area">
            <div v-if="newPost.visible" class="new-post post-it" :style="{'background-color': currentColor}">
                <div @click="saveNewPost" class="save-new-post button">save</div>
                <date-picker class="date-picker-for-new" :defaultDate="newPost.date" @setDate="dateChange"></date-picker>
                <div @click="closeAddPost" class="close-add-post button">cancel</div>
                <textarea v-model="newPost.text"></textarea>
            </div>
            <post-it v-for="post in postList" :post="post" :key="'me-' + post.uid"></post-it>
        </article>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from '../Post/Components/PostIt'
    import DatePicker from '../Post/Components/DatePicker'

    @Component({
        components: {PostIt, DatePicker}
    })
    export default class Me extends Vue {
        newPost = {
            visible: false,
            text: '',
            date: new Date()
        }

        get currentColor() {
            return this.$store.getters.postColor
        }

        get postList() {
            return this.$store.getters.filteredMyPosts
        }

        dateChange(newDate) {
            this.newPost.date = new Date(newDate)
        }

        resetNewPost() {
            this.newPost.visible = false
            this.newPost.text = ''
            this.newPost.date = new Date()
        }

        showAddPost() {
            this.newPost.visible = true
        }

        closeAddPost() {
            this.resetNewPost()
        }

        async saveNewPost() {
            await this.$store.dispatch('newPost', this.newPost)
            this.resetNewPost()
        }

    }
</script>

<style lang="scss">
    @import '@/utils/MediaQuery.scss';

    @include desktop {
        .me-page .date-picker .calendar {
            margin-left: -87px;
            margin-top: 26px;
        }
    }

    @include mobile {
        .date-picker-for-new .calendar {
            position: fixed;
            bottom: 0 !important;
        }
        .me-page .date-picker .calendar {
            bottom: -25px;
        }
    }
</style>

<style scoped lang="scss">
    @import "@/utils/Common.scss";
    @import '@/utils/MediaQuery.scss';

    h3 {
        display: inline-block;
    }

    .post-it-area {
        @include post-it-area;
    }

    @include mobile {
        .new-post {
        }
    }

    @include desktop {
        .new-post {
        }
    }

    .new-post {
        position: relative;
        border-radius: 1px;
        box-shadow: 6px 6px 5px 0px rosybrown;
        padding: 44px 11px 15px 11px;
        height: 210px;
        margin: 5px;

        textarea {
            display: inline-block;
            font-size: inherit;
            width: 230px;
            height: 200px;
            @include post-it;
            background-color: transparent;
        }

        .close-add-post {
            position: absolute;
            top: 10px;
            right: 10px;
        }

        .date-picker-for-new {
            display: inline-block;
            position: absolute;
            top: 15px;
            left: 75px;
        }

        .save-new-post {
            position: absolute;
            top: 10px;
            left: 0;
        }
    }

    .add-new-post {
        margin: 8px;
    }

    .button {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        padding: 5px;
    }
</style>
