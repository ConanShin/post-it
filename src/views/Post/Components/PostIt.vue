<template>
    <div class="post-it">
        <div class="menu">
            <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/>
            <img v-if="editable" class="save-button" @click="savePost" src="@/assets/document-check.png"/>
            <img v-else class="edit-button" @click="editPost" src="@/assets/pencil.png"/>
        </div>
        <textarea v-if="editable" v-model="newText" class="editable text-area"></textarea>
        <div v-else class="text-area">
            {{post.text}}
        </div>
        <div class="author">{{post.name}}</div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'

    @Component
    export default class PostIt extends Vue {
        @Prop() post
        editable = false
        newText = ''

        editPost() {
            this.editable = true
            this.newText = this.post.text
        }

        savePost() {
            this.editable = false
            if (confirm('저장 하시겠습니까?')) {
                const newPost = {
                    postId: this.post.uid,
                    text: this.newText
                }
                this.$store.dispatch('updatePost', newPost)
            }
        }

        deletePost() {
            if (confirm('삭제 하시겠습니까?')) {
                this.$store.dispatch('deletePost', this.post.uid)
            }
        }
    }
</script>

<style scoped lang="scss">
    .post-it {
        margin: 5px;
        display: flex;
        flex-direction: column;
        background: lightgoldenrodyellow;
        font-size: 13px;
        padding: 13px;
        box-shadow: 6px 6px 5px 0px rosybrown
    }

    .menu {
        margin-bottom: 5px;

        .delete-button, .edit-button, .save-button {
            height: 16px;
            cursor: pointer;
        }

        .edit-button {
            float: left
        }

        .save-button {
            float: left
        }

        .delete-button {
            float: right
        }
    }

    .text-area {
        width: 230px;
        height: 200px;
        white-space: pre-wrap;
        text-align: left;
        overflow-y: auto;
        word-break: break-all;

        &.editable {
            background: lightgoldenrodyellow;
            font-size: 13px;
            white-space: pre-wrap;
            text-align: left;
            border: none;
            resize: none;
        }
    }

    .author {
        text-align: right;
    }
</style>
