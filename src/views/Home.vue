<template>
    <div class="home">
        <input class="search-bar" v-model="searchKeyword" placeholder="키워드 검색"/>

        <h3>Today Post</h3><div @click="addPost" class="button">+</div>
        <article class="post-it-area">
            <div class="post-it" v-for="post in todayPost">{{post.text}}</div>
        </article>

        <h3>All Post</h3>
        <article class="post-it-area">
            <div class="post-it" v-for="post in allPost">{{post.text}}</div>
        </article>

        <div v-if="newPost.date" class="new-post">
            <textarea class="post-it" v-model="newPost.text"></textarea>
            <div @click="addPostCancel" class="new-post-cancel button">x</div>
        </div>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import DateUtil from '../utils/Date'

    @Component
    export default class Home extends Vue {
        searchKeyword = ''
        newPost = {
            uid: 99,
            text: '',
            date: ''
        }

        get todayPost () {
            return this.$store.getters.todayPost
        }
        get allPost () {
            return this.$store.getters.allPost.filter(post => post.text.includes(this.searchKeyword))
        }

        addPost () {
            this.newPost.date = DateUtil.stringToday
        }
        addPostCancel () {
            this.newPost.date = ''
        }
    }
</script>

<style lang="scss">
    h3 {
        display: inline-block;
    }
    .post-it {
        display: inline-block;
        width: 200px;
        height: 200px;
        background: lightgoldenrodyellow;
        font-size: 14px;
        padding: 15px;
        margin: 5px;
    }

    .search-bar {
        width: 100%;
        height: 30px;
        font-size: 20px;
        color: darkslategray;
        padding: 10px;
    }

    .new-post {
        position: absolute;
        top: 25vh;
        left: 25vw;
        textarea {
            border: none;
            box-shadow: 5px 4px 11px 6px greenyellow;
            resize: none;
        }
        .new-post-cancel {
            position: absolute;
            top: 10px;
            right: 16px;
        }
    }

    .button {
        cursor: pointer;
        display: inline-block;
        margin-left: 10px;
        padding: 5px;
    }
</style>
