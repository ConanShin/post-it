<template>
    <div class="main">
        <input class="search-bar" v-model="searchKeyword" @keyup="setKeyword" placeholder="키워드 검색"/>
        <img class="user-image" :src="userImage"/>
        <div class="user-name">{{userName}}</div>
        <img class="logout-button" @click="logout" src="https://chefhci.files.wordpress.com/2014/12/lgout.png"/>
        <tabs :tabs="tabs">
            <private-post></private-post>
            <today-post></today-post>
            <all-post></all-post>
        </tabs>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'
    import Tabs from "vue-slide-tabs"
    import PrivatePost from './PrivatePost'
    import AllPost from './AllPost'
    import TodayPost from './TodayPost'
    import SessionStorage from '@/utils/SessionStorage'

    @Component({
        components: {Tabs, PrivatePost, TodayPost, AllPost}
    })
    export default class Main extends Vue {
        searchKeyword = ''
        userName = SessionStorage.user().name
        userImage = SessionStorage.user().image
        tabs = [
            {label: 'Private'},
            {label: 'Today'},
            {label: 'All'}
        ]

        async beforeMount() {
            await this.$store.dispatch('fetchPosts')
        }

        setKeyword() {
            this.$store.commit('setSearchKeyword', this.searchKeyword)
        }

        logout() {
            this.$store.dispatch('logout')
        }
    }
</script>

<style lang="scss">
    .tabs-content {
        height: calc(100vh - 114px) !important;
    }
</style>
<style scoped lang="scss">
    .search-bar {
        width: 50%;
        height: 30px;
        font-size: 20px;
        color: darkslategray;
        padding: 10px;
    }
    .user-name {
        display: inline-block;
        float: left;
        margin-top: 18px;
        margin-left: 13px;
        color: gray;
        font-size: 15px;
    }
    .user-image {
        float: left;
        height: 54px;
        border-radius: 30px;
        margin-left: 15px;
    }

    .logout-button {
        height: 23px;
        float: right;
        margin-right: 18px;
        cursor: pointer;
        border-radius: 10px;
        margin-top: 14px;
    }
</style>
