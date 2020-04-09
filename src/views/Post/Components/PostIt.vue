<template>
    <div class="post-it" :style="{'background-color': currentColor}">
        <div class="menu">
            <template v-if="post.isMyPost">
                <img v-if="!post.editable&&isPublished&&!isFinished" class="finish-button" @click="finishPost" src="@/assets/finish-flag.png"/>
                <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/>
                <img v-if="!post.editable&&!isPublished" class="publish-button" @click="publishPost" src="@/assets/plane.png"/>
<!--                <img v-if="!post.editable&&isPublished" class="publish-button" @click="unpublishPost" src="@/assets/private.png"/>-->
                <img v-if="post.editable" class="save-button" @click="savePost" src="@/assets/document-check.png"/>
                <img v-if="!post.editable" class="edit-button" @click="editPost" src="@/assets/pencil.png"/>
            </template>
        </div>
        <textarea v-if="post.editable" v-model="post.newNote" class="editable textarea">
        </textarea>
        <div v-else class="textarea">{{post.text}}</div>
        <div v-if="finishingPost.visible" class="publishing-post" >
            <div>
                아이템: 
                <select v-model="finishingPost.itemId">
                    <option disabled value="">선택</option>
                    <option v-for="item in itemList" v-bind:value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div>
                날짜:  
                <datepicker v-model="finishingPost.date"  :value="this.now"></datepicker>
            </div>

            <div @click="saveFinishingPost" class="publishing-post-button button">저장</div>
            <div @click="closeFinishingPost" class="publishing-post-button button">취소</div>
        </div>
        <div v-if="!post.editable" class="author">{{name}}</div>


    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import Color from "@/model/Color";
    import Helper from '@/utils/HelperMethods'
    import moment from 'moment';
    import Datepicker from 'vuejs-datepicker';

    @Component({
        components: {Datepicker}
    })
    export default class PostIt extends Vue {
        @Prop() post
        now = moment(new Date()).format('YYYY-MM-DD');

        finishingPost = {
            visible: false,
            itemId: '',
            date: this.now
        }

        get currentColor() {
            if (this.post.isMyPost) {
                const myColor = new Color(this.$store.getters.postColor)
                if (this.isPublished) return myColor.value()
                else return myColor.transparentValue()
            }
            return this.post.color
        }

        get name() {
            if (this.post.isMyPost) return this.$store.getters.userName
            else return this.post.name
        }
        get isPublished() {
            return this.post.private_yn === 'n'
        }
        get isFinished() {
            return this.post.done_yn === 'y'
        }

        get itemList() {
            return this.$store.getters.items
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

        unpublishPost() {
            Helper.confirmAction('비공개로 전환 하시겠습니까?', () => this.$store.dispatch('unpublishPost', this.post.uid))
        }

        publishPost() {
            Helper.confirmAction('공유 하시겠습니까?', () => this.$store.dispatch('publishPost', this.post.uid))
        }

        deletePost() {
            Helper.confirmAction('삭제 하시겠습니까?', () => this.$store.dispatch('deletePost', this.post.uid))
        }

        // finishing post
        resetFinishingPost() {
            this.finishingPost.visible = false
            this.finishingPost.itemId = ''
            this.finishingPost.date = this.now
            this.post.editable = false

        }

        finishPost() {
            this.showFinishingPost();
        }

        showFinishingPost(){
            this.finishingPost.visible = true
            this.post.editable = true
        }

        closeFinishingPost() {
            this.resetFinishingPost()
        }

        saveFinishingPost() {
            // parsedDate = moment(this.finishingPost.date).format('YYYY-MM-DD');
            if (confirm('완료처리 하시겠습니까?')) {
                this.$store.dispatch('finishPost', { 
                    postId : this.post.uid, 
                    itemId : this.finishingPost.itemId, 
                    date: moment(this.finishingPost.date).format('YYYY-MM-DD')
                })
            }
            this.resetFinishingPost()
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
        height: 244px;
        width: 230px;
    }

    .menu {
        height: 21px;
        margin-bottom: 5px;

        .delete-button, .finish-button, .edit-button, .save-button, .publish-button {
            height: 13px;
            cursor: pointer;
            padding: 3px;
            margin-left: 2px;
            @include embossed-button;
        }

        .edit-button, .finish-button, .publish-button, .save-button, .delete-button {
            float: right;
        }
    }

    .textarea {
        width: 230px;
        height: 200px;
        white-space: pre-wrap;
        text-align: left;
        overflow-y: auto;
        word-break: break-all;
        padding: 0;
        background-color: transparent;

        &.editable {
            @include post-it;
        }
    }

    .author {
        text-align: right;
    }

    .publishing-post-button{
        padding: 5px;
        margin-left: 5px;
        float: right;
        font-weight: 500;
    }

</style>
