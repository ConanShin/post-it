<template>
    <div class="me-page">
        <div @click="showAddPost" class="add-new-post button">NEW +</div>
        <article class="post-it-area">
            <post-it v-for="post in postList" :post="post" :key="'me-' + post.uid"></post-it>
        </article>
        <div v-if="newPost.visible" class="new-post" :style="{'background-color': currentColor}">
            <div @click="saveNewPost" class="save-new-post button">save</div>
            <date-picker class="date-picker-for-new" :defaultDate="newPost.date" @setDate="dateChange"></date-picker>
            <div @click="closeAddPost" class="close-add-post button">cancel</div>
            <textarea v-model="newPost.text"></textarea>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from './Components/PostIt'
    import DatePicker from './Components/DatePicker'

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

        saveNewPost() {
            this.$store.dispatch('newPost', this.newPost)
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
            top: 8vh;
            left: 15vw;
        }
    }

    @include desktop {
        .new-post {
            top: 25vh;
            left: 25vw;
        }
    }

    .new-post {
        position: absolute;
        border-radius: 1px;
        box-shadow: 8px 8px 7px 7px rosybrown;
        padding: 44px 15px 15px 15px;

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
            right: 23px;
        }

        .date-picker-for-new {
            display: inline-block;
            position: absolute;
            top: 15px;
            left: 80px;
        }

        .save-new-post {
            position: absolute;
            top: 10px;
            left: 16px;
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
