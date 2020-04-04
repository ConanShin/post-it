<template>
    <div class="main">
        <nav>
            <div class="user-info">
                <img class="user-image" :src="userImage"/>
                <div class="user-name">{{userName}}</div>
            </div>
            <input class="search-bar" v-model="searchKeyword" @keyup="setKeyword" placeholder="키워드 검색"/>
            <div class="logout-button" @click="logout">
                EXIT
                <img src="@/assets/logout.png"/>
            </div>
        </nav>
        <tabs @change="scrollToTop" :tabs="tabs">
            <private-post :key="refreshTrigger + '1'" class="page"></private-post>
            <today-post :key="refreshTrigger + '2'" class="page"></today-post>
            <all-post :key="refreshTrigger + '3'" class="page"></all-post>
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
        selectedTabIndex = 0
        originalHeights = null

        get refreshTrigger () {
            setTimeout(() => {
                this.originalHeights = Array.from(document.querySelectorAll('.post-it-area')).map(page => page.offsetHeight)
                this.clickTab(this.selectedTabIndex)
            }, 100)
            return this.$store.getters.refreshTrigger
        }

        async beforeMount() {
            await this.$store.dispatch('fetchPosts')
        }

        setKeyword() {
            this.$store.commit('setSearchKeyword', this.searchKeyword)
        }

        logout() {
            this.$store.dispatch('logout')
        }

        clickTab(index) {
            document.querySelectorAll('.title-item')[index].click()
        }

        setScrollHeight() {
            setTimeout(() => {
                document.querySelectorAll('.post-it-area').forEach(page => {
                    page.style.height = this.originalHeights[this.selectedTabIndex] + 'px'
                    page.style.overflow = 'hidden'
                })
            }, 500)
        }

        scrollToTop(tabIndex) {
            this.selectedTabIndex = tabIndex
            document.querySelector('.tabs-content').scrollTop = 0
            this.setScrollHeight()
        }
    }
</script>

<style lang="scss">
    @import '@/utils/MediaQuery.scss';
    .tabs {
        height: 100%;
    }

    @include mobile {
        .tabs-content {
            height: calc(100% - 81px) !important;
        }
    }
    @include desktop {
        .tabs-content {
            height: calc(100% - 98px) !important;
        }
    }
    .tabs-content {

        overflow-y: auto !important;
        overflow-x: hidden !important;
    }
</style>
<style scoped lang="scss">
    @import '@/utils/MediaQuery.scss';
    .main {
        height: 100%;
    }
    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .page {
        display: inline-table !important;
        width: 100%;
        height: 100%;
        font-size: 14px;
        margin-bottom: 10px;
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
