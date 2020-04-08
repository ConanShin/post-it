<template>
    <div class="main">
        <nav>
            <div class="left-menu">
                <img class="user-image" :src="userImage"/>
                <input class="user-name" v-model="userName" @change="changeUserName" @keyup.enter="$event.target.blur()">
            </div>
            <input class="search-bar" v-model="keyword" placeholder="키워드 검색" :disabled="disableSearch"/>
            <div class="right-menu">
                <div class="current-color" :style="{'background-color': postColor}"></div>
                <chrome class="color-picker" :value="postColor" @input="colorPicked"></chrome>
                <div class="logout-button" @click="logout">
                    EXIT<img src="@/assets/logout.png"/>
                </div>
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
    import { Chrome } from 'vue-color'
    import Tabs from "vue-slide-tabs"
    import PrivatePost from './Me'
    // import AllPost from './Dashboard'
    import AllPost from './Mobile'
    import TodayPost from './Team'
    import SessionStorage from '@/utils/SessionStorage'

    @Component({
        components: {Chrome, Tabs, PrivatePost, TodayPost, AllPost}
    })
    export default class Main extends Vue {
        userName = SessionStorage.user().name
        userImage = SessionStorage.user().image
        debounceFunction
        tabs = [
            {label: 'Me'},
            {label: 'Team'},
            {label: 'DashboardMobile'}
        ]

        async beforeMount() {
            await this.$store.dispatch('fetchPosts')
        }

        get postColor() {
            return this.$store.getters.postColor
        }

        get disableSearch() {
            return this.$store.getters.disabledSearch
        }

        get keyword() {
            return this.$store.getters.searchKeyword
        }

        set keyword(value) {
            this.$store.commit('setSearchKeyword', value)
        }

        changeUserName() {
            this.$store.dispatch('changeUserName', this.userName)
        }

        colorPicked(color) {
            clearTimeout(this.debounceFunction)
            this.debounceFunction = setTimeout(() => {
                this.$store.dispatch('updateColor', color.hex8)
            }, 500)
        }

        logout() {
            this.$store.dispatch('logout')
        }
    }
</script>

<style lang="scss">
    @import '@/utils/Common.scss';
    @import '@/utils/MediaQuery.scss';

    @include mobile {
        .tabs {
            height: calc(100% - #{$nav-height-mobile})
        }
    }

    @include desktop {
        .tabs {
            height: calc(100% - #{$nav-height-desktop})
        }
    }
    .tabs-content {
        height: calc(100% - #{$tabs-height})
    }
    .tabs-content > .wrapper {
        height: 100%;
    }

    .post-it:last-child {
        margin-bottom: 30px;
    }
</style>
<style scoped lang="scss">
    @import '@/utils/Common.scss';
    @import '@/utils/MediaQuery.scss';

    nav {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
    }

    @include mobile {
        nav {
            height: $nav-height-mobile;
        }
        .search-bar {
            font-size: 12px;
            height: 15px;
            border: 1px solid gray;
        }
        .user-name {
            font-size: 12px;
            margin: 0 6px;
            width: 15vw;

        }
        .user-image {
            height: 30px;
        }
        .color-picker {
            top: 30px;
        }
        .logout-button {
            height: 23px;
            font-size: 10px;
        }
    }

    @include desktop {
        nav {
            height: $nav-height-desktop;
        }
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
        .color-picker {
            top: 40px;
        }
        .logout-button {
            height: 23px;
        }
    }

    .left-menu {
        display: inherit;
        align-items: center;
        .user-name {
            display: inline-block;
            color: gray;
            background: transparent;
            border: none;
        }
        .user-image {
        }
    }

    .search-bar {
        width: 50%;
        border-radius: 5px;
        margin-right: 15px;
        color: darkslategray;
        padding: 10px;
        background-color: #00000000;

        &:disabled {
            background-color: #00000050;
        }
    }

    .right-menu {
        display: flex;
        .color-picker {
            position: absolute;
            right: 60px;
            z-index: 2;
            height: 0;
            overflow: hidden;
            transition: height 0.3s ease-in-out;
            &:hover {
                height: 243px;
            }
        }
        .current-color {
            height: 12px;
            width: 12px;
            border: 3px solid gray;
            background-color: rgb(255, 255, 165);
            margin-right: 10px;
            &:hover {
                & + div {
                    height: 243px;
                }
            }
        }
    }

    .page {
        height: calc(100% - #{$tabs-height}) !important;
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
