<template>
    <div class="main">
        <nav>
            <div class="user-info">
                <img class="user-image" :src="userImage"/>
                <div class="user-name">{{userName}}</div>
            </div>
            <input class="search-bar" v-model="keyword" placeholder="키워드 검색" :disabled="disableSearch"/>
            <div class="logout-button" @click="logout">
                EXIT
                <img src="@/assets/logout.png"/>
            </div>
        </nav>
        <tabs :tabs="tabs">
            <private-post class="page"></private-post>
            <today-post class="page"></today-post>
            <all-post class="page"></all-post>
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
        userName = SessionStorage.user().name
        userImage = SessionStorage.user().image
        tabs = [
            {label: 'Private'},
            {label: 'Today'},
            {label: 'All'}
        ]
        originalHeights = null

        get disableSearch() {
            return this.$store.getters.disabledSearch
        }

        get keyword() {
            return this.$store.getters.searchKeyword
        }

        set keyword(value) {
            this.$store.commit('setSearchKeyword', value)
        }

        async beforeMount() {
            await this.$store.dispatch('fetchPosts')
        }

        logout() {
            this.$store.dispatch('logout')
        }
    }
</script>

<style lang="scss">
    @import '@/utils/MediaQuery.scss';
    .tabs, .tabs-content, .tabs-content > .wrapper {
        height: 100%;
    }
</style>
<style scoped lang="scss">
    @import '@/utils/MediaQuery.scss';

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
    }

    .page {
        display: inline-grid !important;
        margin-bottom: 10px;
        overflow-x: hidden;
        overflow-y: auto;
    }

    @include mobile {
        .search-bar {
            font-size: 12px;
            height: 15px;
            border: 1px solid gray;
            border-radius: 5px;
            margin-right: 15px;
        }
        .user-name {
            font-size: 12px;
            margin-left: 3px;
        }
        .user-image {
            height: 30px;
        }
        .logout-button {
            height: 23px;
            font-size: 10px;
        }
    }

    @include desktop {
        .search-bar {
            font-size: 20px;
            height: 30px;
        }
        .user-name {
            font-size: 15px;
            margin-left: 13px;
        }
        .user-image {
            height: 54px;
            border-radius: 30px;
        }
        .logout-button {
            height: 23px;
        }
    }

    .search-bar {
        width: 50%;
        color: darkslategray;
        padding: 10px;
    }

    .user-info {
        display: inherit;
        align-items: center;
    }

    .user-name {
        display: inline-block;
        color: gray;
    }

    .user-image {
    }

    .logout-button {
        display: flex;
        cursor: pointer;
        align-items: center;

        img {
            margin-left: 4px;
        }
    }
</style>
