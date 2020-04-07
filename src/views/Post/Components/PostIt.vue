<template>
    <div class="post-it" :style="{'background-color': currentColor}">
        <div class="menu">
            <template v-if="isMyPost">
                <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/>
                <img v-if="!post.editable&&!isPublished" class="publish-button" @click="publishPost" src="@/assets/plane.png"/>
                <img v-if="post.editable" class="save-button" @click="savePost" src="@/assets/document-check.png"/>
                <img v-if="!post.editable" class="edit-button" @click="editPost" src="@/assets/pencil.png"/>
            </template>
        </div>
        <textarea v-if="post.editable" v-model="post.newNote" class="editable text-area" :style="{'background-color': currentColor}"></textarea>
        <div v-else class="text-area">{{post.text}}</div>
        <div class="author">{{post.name}}</div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import SessionStorage from "@/utils/SessionStorage";
    import Color from "@/model/Color";

    @Component
    export default class PostIt extends Vue {
        @Prop() post

        get currentColor() {
            if (this.post.name === '나') {
                const myColor = new Color(this.$store.getters.postColor)
                if (this.isPublished) return myColor.value()
                else return myColor.transparentValue()
            }
            return this.post.color
        }

        get isMyPost() {
            return this.post.user_id === SessionStorage.user().id.toString()
        }
        get isPublished() {
            return this.post.private_yn === 'n'
        }

        editPost() {
            this.$store.commit('disableSearch')
            this.post.editable = true
        }

        savePost() {
            this.$store.commit('enableSearch')
            this.post.editable = false
            if (confirm('저장 하시겠습니까?')) {
                this.$store.dispatch('updatePost', this.post)
            } else {
                this.post.newNote = this.post.text
            }
        }

        publishPost() {
            if(confirm('공유 하시겠습니까?')) {
                this.$store.dispatch('publishPost', this.post.uid)
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
    @import "@/utils/Common.scss";
    .post-it {
        @include post-it;
        margin: 5px;
        display: flex;
        flex-direction: column;
        padding: 13px;
        box-shadow: 6px 6px 5px 0px rosybrown;
        max-height: 244px;
        max-width: 230px;
    }

    .menu {
        height: 21px;
        margin-bottom: 5px;

        .delete-button, .edit-button, .save-button, .publish-button {
            height: 13px;
            cursor: pointer;
            padding: 3px;
            margin-left: 2px;
            @include embossed-button;
        }

        .edit-button, .publish-button, .save-button, .delete-button {
            float: right;
        }
    }

    .text-area {
        width: 230px;
        height: 200px;
        white-space: pre-wrap;
        text-align: left;
        overflow-y: auto;
        word-break: break-all;
        padding: 0;

        &.editable {
            @include post-it;
        }
    }

    .author {
        text-align: right;
    }
</style>
