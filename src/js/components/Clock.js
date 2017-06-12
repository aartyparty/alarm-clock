/**
 * @class Clock
 * @descr Clock class; handles creation of clock, has alarm, handles indication of whether alarm has gone off or not
 * @param
 *      options : JSON obj, options for the clock
 *                clockContainer : element which will hold the clock container
 *                alarmContainer : element which will hold alarm container
 * */
var Clock = function(options) {

    var container,
        alarm;

    setupClock();

    /**
     * @func setupClock
     * @descr creates a clock, sets up alarms, updates clock with time
     * */
    function setupClock() {
        container = options.clockContainer;
        alarm = new Alarm({
            alarmContainer: options.alarmContainer
        });
        updateClock();
    }

    /**
     * @func updateClock
     * @descr gets current time, updates clock with current time if time has changed, handles the visual clock animation as well
     * */
    function updateClock() {
        var currentTime = new Date(),
            hour = (currentTime.getHours() > 12 ? currentTime.getHours()-12 : (currentTime.getHours() === 0 ? '12' : currentTime.getHours())),
            hourDeg = currentTime.getHours() % 12 / 12 * 360 + (currentTime.getMinutes() / 12),
            minutes = (currentTime.getMinutes() < 10 ? '0'+currentTime.getMinutes() : currentTime.getMinutes()),
            minutesDeg = currentTime.getMinutes() * 6,
            secondsDeg = currentTime.getSeconds() * 6,
            period = (currentTime.getHours() > 12 ? 'PM' : 'AM'),
            newTime = (hour < 10 ? '0' + hour : hour) + ':' + minutes + ' ' + period;

        if(newTime !== container.querySelector('.alarm-clock__time').innerHTML) {
            container.querySelector('.alarm-clock__clock--hours').style.transform = "rotate(" + hourDeg + "deg)";
            container.querySelector('.alarm-clock__clock--minutes').style.transform = "rotate(" + minutesDeg + "deg)";
            container.querySelector('.alarm-clock__time').innerHTML = newTime;

            checkAlarms(newTime);
        }

        container.querySelector('.alarm-clock__clock--seconds').style.transform = "rotate(" + secondsDeg + "deg)";

        setTimeout(updateClock, 1000);
    }

    /**
     * @func updateClock
     * @descr takes given param and checks if there is an alarm that matches said time, if so then rings the clock, otherwise, removes ring from clock
     * @param time : string, time to check against alarms (ex: 01:20 AM)
     * */
    function checkAlarms(time) {
        var shouldClockRing = false;

        for(var i = 0, alarms = alarm.getAlarms(); i < alarms.length; i++) {
            if(alarms[i] === time) {
                shouldClockRing = true;
            }
        }

        if(shouldClockRing) {
            setAlarmClockRing(true);
        }
        else {
            setAlarmClockRing(false);
        }
    }

    /**
     * @func setAlarmClockRing
     * @descr takes given param and either sets clock animation on or off
     * @param shouldClockRing : boolean, whether clock should ring or not (true/false)
     * */
    function setAlarmClockRing(shouldClockRing) {
        if(shouldClockRing) {
            container.querySelector('.alarm-clock__clock').className += ' ring';
        }
        else {
            container.querySelector('.alarm-clock__clock').className = container.querySelector('.alarm-clock__clock').className.replace(' ring', '');
        }
    }

    /** No public functions returned */
    //return {};

};