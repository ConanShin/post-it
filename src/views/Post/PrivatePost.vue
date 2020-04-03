<template>
    <div class="private-post">
        <h3>Private Post</h3><div @click="showAddPost" class="button">+</div>
        <article class="post-it-area">
            <div class="post-it" v-for="post in todayPost">{{post.text}}</div>
        </article>

        <div v-if="newPost.visible" class="new-post">
            <textarea class="post-it" v-model="newPost.text"></textarea>
            <div @click="saveNewPost" class="save-new-post button">save</div>
            <div @click="closeAddPost" class="close-add-post button">cancel</div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class PrivatePost extends Vue {
        newPost = {
            visible: false,
            text: ''
        }
        get todayPost () {
            return this.$store.getters.filteredTodayPost
        }
        resetNewPost () {
            this.newPost.visible = false
            this.newPost.text = ''
        }
        showAddPost () {
            this.newPost.visible = true
        }
        closeAddPost () {
            this.newPost.visible = false
        }
        saveNewPost () {
            this.$store.dispatch('newPost', this.newPost.text)
            this.resetNewPost()
        }
    }
</script>

<style scoped lang="scss">
    h3 {
        display: inline-block;
    }
    .post-it-area {
        display: flex;
        flex-wrap: wrap;
    }
    .post-it {
        display: inline-block;
        width: 200px;
        height: 200px;
        background: lightgoldenrodyellow;
        font-size: 14px;
        padding: 15px;
        margin: 5px;
        white-space: pre-wrap;
        text-align: left;
    }

    .new-post {
        position: absolute;
        top: 25vh;
        left: 25vw;

        textarea {
            padding: 35px 15px 15px 15px;
            border: none;
            box-shadow: 5px 4px 11px 6px gray;
            resize: none;
        }
        .close-add-post {
            position: absolute;
            top: 10px;
            right: 23px;
        }
        .save-new-post {
            position: absolute;
            top: 10px;
            left: 16px;
        }
    }

    .button {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        padding: 5px;
    }
</style>
