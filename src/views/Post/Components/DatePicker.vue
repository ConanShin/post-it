<template>
    <div class="date-picker">
        <div class="selected-date">
            {{DateUtil.dateToString(defaultDate)}}
            <img class="calendar-icon" @click.stop.prevent="showCalendar = true" src="@/assets/calendar.svg"/>
        </div>
        <inlineCalendar class="calendar" :class="{'show': showCalendar}"
                        yearName="" :monthNames="months" :weekNames="weeks" :dayClick="dateSelected"
                        :defaultDate="defaultDate" v-click-outside="() => showCalendar = false"/>
    </div>
</template>

<script>
    import {Vue, Component, Prop} from 'vue-property-decorator'

    @Component
    export default class DatePicker extends Vue {
        @Prop({default: () => new Date()}) defaultDate
        months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        weeks = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
        showCalendar = false
        dateSelected(date) {
            this.showCalendar = false
            this.$emit('setDate', date.$d)
        }
    }
</script>

<style scoped lang="scss">
    @import "@/utils/MediaQuery.scss";
    .selected-date {
        font-size: 12px;
        display: inline-flex;
        align-items: center;
    }
    .calendar-icon {
        width: 13px;
        margin-left: 5px;
        cursor: pointer;
    }

    @include desktop {
        .calendar {
            position: absolute;
            width: 300px;
            display: none;
            white-space: initial;
            &.show {
                display: block;
            }
        }
    }

    @include mobile {
        .calendar {
            position: absolute;
            bottom: -20px;
            left: 0;
            width: 100%;
            height: 0;
            overflow: hidden;
            transition: height .3s ease;
            white-space: initial;

            &.show {
                height: 300px;
            }
        }
    }
</style>
