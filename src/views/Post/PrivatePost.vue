<template>
    <div class="private-post">
        <h3>Private Post</h3><div @click="showAddPost" class="button">+</div>
        <article class="post-it-area">
            <template v-for="post in privatePost">
                <post-it :post="post"></post-it>
            </template>
        </article>

        <div v-if="newPost.visible" class="new-post">
            <textarea v-model="newPost.text"></textarea>
            <div @click="saveNewPost" class="save-new-post button">save</div>
            <div @click="closeAddPost" class="close-add-post button">cancel</div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import PostIt from './Components/PostIt'

    @Component({
        components: {PostIt}
    })
    export default class PrivatePost extends Vue {
        newPost = {
            visible: false,
            text: ''
        }
        get privatePost () {
            return this.$store.getters.filteredPrivatePost
        }
        resetNewPost () {
            this.newPost.visible = false
            this.newPost.text = ''
        }
        showAddPost () {
            this.newPost.visible = true
        }
        closeAddPost () {
            this.resetNewPost()
        }
        saveNewPost () {
            this.$store.dispatch('newPost', this.newPost.text)
            this.resetNewPost()
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/Common.scss";

    h3 {
        display: inline-block;
    }
    .post-it-area {
        @include post-it-area;
    }

    .new-post {
        position: absolute;
        top: 25vh;
        left: 25vw;

        textarea {
            display: inline-block;
            width: 200px;
            height: 200px;
            margin: 5px;
            box-shadow: 8px 8px 7px 7px rosybrown;
            padding: 35px 15px 15px 15px;

            @include post-it;
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
