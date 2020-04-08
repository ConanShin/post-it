<template>
    <div class="me-page">
        <div @click="showAddPost" class="add-new-post button">NEW +</div>
        <article class="post-it-area">
            <post-it v-for="post in postList" :post="post" :key="'me-' + post.uid"></post-it>
        </article>

        <div v-if="newPost.visible" class="new-post" :style="{'background-color': currentColor}">
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
    export default class Me extends Vue {
        newPost = {
            visible: false,
            text: ''
        }

        get currentColor() {
            return this.$store.getters.postColor
        }

        get postList() {
            return this.$store.getters.filteredMyPosts
        }

        resetNewPost() {
            this.newPost.visible = false
            this.newPost.text = ''
        }

        showAddPost() {
            this.newPost.visible = true
        }

        closeAddPost() {
            this.resetNewPost()
        }

        saveNewPost() {
            this.$store.dispatch('newPost', this.newPost.text)
            this.resetNewPost()
        }
    }
</script>

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
            width: 200px;
            height: 200px;
            @include post-it;
            background-color: transparent;
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
