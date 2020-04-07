<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import {Vue, Component} from 'vue-property-decorator'

    @Component
    export default class App extends Vue {
    }
</script>

<style lang="scss">
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
    }
    html, body, #app, .main {
        height: 100%;
        overflow-y: hidden;
        margin: 0;
    }

    body {
        background: url("./assets/background.jpeg") no-repeat;
        background-size: cover;
    }
</style>
