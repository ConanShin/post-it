<template>
    <div class="private-post">
        <div>
            <h3>Private Post</h3>
            <div @click="showAddPost" class="button">+</div>
        </div>
        <article class="post-it-area">
            <post-it v-for="post in privatePost" :post="post" :key="'private-' + post.uid"></post-it>
        </article>

        <div v-if="newPost.visible" class="new-post" :style="{'background-color': currentColor}">
            <textarea v-model="newPost.text" :style="{'background-color': currentColor}"></textarea>
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

        get currentColor() {
            return this.$store.getters.postColor
        }

        get privatePost() {
            return this.$store.getters.filteredPrivatePost
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
