<template>
    <div class="post-it" :style="{'background-color': currentColor}">
        <div class="menu">
            <template v-if="post.isMyPost && !finishingPost.visible">
                <template v-if="post.editable">
                    <div class="save-button" @click.stop.prevent="savePost">save</div>
                    <date-picker :defaultDate="new Date(post.newDate)" @setDate="dateChange"></date-picker>
                    <div class="cancel-button" @click.stop.prevent="cancel">cancel</div>
                </template>
                <template v-else>
                    <img v-if="isPublished&&!isFinished" class="finish-button" @click="showFinishingPost" src="@/assets/finish-flag.png"/>
                    <img class="delete-button" @click="deletePost" src="@/assets/trashcan.png"/>
                    <img v-if="!isPublished" class="publish-button" @click="publishPost" src="@/assets/plane.png"/>
                    <div class="date-field">{{DateUtil.dateToString(new Date(post.date))}}</div>
                </template>
            </template>
        </div>
        <textarea v-if="post.isMyPost" v-model="post.newNote" @click="editPost" class="editable textarea" :readonly="!post.editable"></textarea>
        <textarea v-else v-model="post.text" class="editable textarea" readonly></textarea>
        <div v-if="finishingPost.visible" class="publishing-post" >
            <div>
                아이템:
                <select class="item-picker" v-model="finishingPost.itemId" :required="true">
                    <option disabled>선택</option>
                    <option v-for="item in itemList" v-bind:value="item.id">
                        {{ item.name }}
                    </option>
                </select>
            </div>
            <div @click="saveFinishingPost" class="finishing-post-button button">저장</div>
            <div @click="resetFinishingPost" class="finishing-post-button button">취소</div>
        </div>
        <div v-if="!post.editable" class="author">{{name}}</div>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'
    import Color from "@/model/Color";
    import Helper from '@/utils/HelperMethods'
    import DatePicker from './DatePicker'

    @Component({
        components: {DatePicker}
    })
    export default class PostIt extends Vue {
        @Prop() post
        finishingPost = {
            visible: false,
            itemId: ''
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
            this.$nextTick(() => {
                this.$el.querySelector('textarea').focus()
            })
        }

        savePost() {
            this.$store.commit('enableSearch')
            this.post.editable = false
            this.$store.dispatch('updatePost', this.post)
        }
        cancel() {
            this.$store.commit('enableSearch')
            this.post.editable = false
            this.post.newNote = this.post.text
            this.post.newDate = this.post.date
        }

        publishPost() {
            Helper.confirmAction('공유 하시겠습니까?', () => this.$store.dispatch('publishPost', this.post.uid))
        }

        deletePost() {
            Helper.confirmAction('삭제 하시겠습니까?', () => this.$store.dispatch('deletePost', this.post.uid))
        }

        dateChange(newDate) {
            this.post.newDate = new Date(newDate)
        }

        // finishing post
        resetFinishingPost() {
            this.finishingPost.visible = false
            this.finishingPost.itemId = ''
            this.post.editable = false
        }

        showFinishingPost(){
            this.finishingPost.visible = true
        }

        saveFinishingPost() {
            if(this.finishingPost.itemId===''){
                return alert('아이템을 선택해 주십시오')
            }
            if (confirm('완료처리 하시겠습니까?')) {
                this.post.item_id = this.finishingPost.itemId
                this.post.done_yn = 'y'
                this.$store.dispatch('finishPost', this.post)
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
        .save-button, .cancel-button {
            display: inline-block;
            cursor: pointer;
        }
        .cancel-button {
            float: right;
        }

        .delete-button, .finish-button, .publish-button {
            height: 13px;
            cursor: pointer;
            padding: 3px;
            margin-left: 2px;
            @include embossed-button;
        }

        .delete-button, .finish-button, .publish-button {
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

    .finishing-post-button{
        padding: 5px;
        margin-left: 5px;
        float: right;
        font-weight: 500;
        cursor: pointer;
    }

    .item-picker {
        width: 140px;
    }

    .date-picker {
        display: inline-flex;
        margin-left: 30px;
    }
    .date-field {
        font-size: 12px;
        margin-top: 1px;
        margin-left: 59px;;
    }
</style>
