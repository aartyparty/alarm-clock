/**
 * @class Alarm
 * @descr Alarm class; handles creation of alarm, has set of alarms, displays alarms
 * @param
 *      options : JSON obj, options for the alarm
 *                alarmContainer : element which will hold alarm container
 * */
var Alarm = function(options) {

    var container,
        alarms = [];

    setupAlarm();

    /**
     * @func setupAlarm
     * @descr creates an alarm
     * */
    function setupAlarm() {
        container = options.alarmContainer;
        addListeners();
    }

    /**
     * @func addListeners
     * @descr handles listeners for creating an alarm form
     * */
    function addListeners() {
        // handles click on body
        document.addEventListener('click', function(event){onClickBody(event)});

        // loops through hours/minutes/period to add listener to show/hide drop down
        for(var i = 0, selected = container.querySelectorAll('.drop-down-selected'); i < selected.length; i++) {
            selected[i].addEventListener('click', function(event){onClickSelected(event)});
        }

        // loops through hours/minutes/period drop down to add listener to handle selecting from drop down
        for(var j = 0, lists = container.querySelectorAll('.drop-down-list'); j < selected.length; j++) {
            lists[j].addEventListener('click', function(event){onClickDropDownList(event)});
        }

        // handles the adding alarm button
        container.querySelector('.alarms__add-alarm--button').addEventListener('click', function(){onClickAddAlarm()});
    }

    /**
     * @listener onClickBody
     * @descr handles click event on body, closes any opened drop downs
     * */
    function onClickBody(event) {
        if(!event.target.classList.contains('drop-down-selected')) {
            for(var k = 0, openedDropDowns = container.querySelectorAll('.drop-down-list.open'); k < openedDropDowns.length; k++) {
                openedDropDowns[k].className = openedDropDowns[k].className.replace(' open', '');
            }
        }
    }

    /**
     * @listener onClickSelected
     * @descr handles click event on hour/minutes/period, either opens or closes the drop down,
     *        closes other opened drop downs before opening current drop down, removes error message
     * */
    function onClickSelected(event) {
        var type = event.currentTarget.dataset.type,
            list = container.querySelector('.alarms__add-alarm__form--' + type + '--list');

        if(container.querySelector('.alarms__add-alarm--error').classList.contains('show')){
            container.querySelector('.alarms__add-alarm--error').className = container.querySelector('.alarms__add-alarm--error').className.replace(' show', '');
        }

        for(var k = 0, openedDropDowns = container.querySelectorAll('.drop-down-list.open'); k < openedDropDowns.length; k++) {
            if(openedDropDowns[k] !== list) {
                openedDropDowns[k].className = openedDropDowns[k].className.replace(' open', '');
            }
        }

        if(!list.classList.contains('open')) {
            list.className += ' open';
        }
        else {
            list.className = list.className.replace(' open', '');
        }
    }

    /**
     * @listener onClickDropDownList
     * @descr handles click event in drop down list for hour/minutes/period, updates elem with selected value from drop down
     * */
    function onClickDropDownList(event) {
        var type = event.currentTarget.dataset.type,
            selected = container.querySelector('.alarms__add-alarm__form--' + type + '--selected');

        if(!event.target.classList.contains('drop-down-list')) {
            selected.innerText = event.target.innerText;
        }
    }

    /**
     * @listener onClickAddAlarm
     * @descr handles click event of add alarm button; checks if alarm already exists, shows error if it does. if not, adds alarm
     * */
    function onClickAddAlarm() {
        var hour = container.querySelector('.alarms__add-alarm__form--hour--selected').innerText,
            minutes = container.querySelector('.alarms__add-alarm__form--minutes--selected').innerText,
            period = container.querySelector('.alarms__add-alarm__form--period--selected').innerText,
            alarm = hour + ':' + minutes + ' ' + period,
            isNewAlarm = true;

        for(var i = 0; i < alarms.length; i++) {
            if(alarms[i] === alarm) {
                isNewAlarm = false;
            }
        }

        if(isNewAlarm) {
            alarms.push(alarm);
            showAlarm(alarm);
        }
        else {
            container.querySelector('.alarms__add-alarm--error').className += ' show';
        }

    }

    /**
     * @func showAlarm
     * @descr updates DOM with alarm info using template; adds alarm to top to alarm list
     * @param alarm : string, the time of the newly added alarm
     * */
    function showAlarm(alarm) {
        var alarmTemplate = document.getElementById('alarm-template').content.cloneNode(true);
        alarmTemplate.querySelector('.alarms__list--alarm--time').innerText = alarm;
        container.querySelector('.alarms__list').prepend(alarmTemplate);
    }

    /**
     * @func getAlarms
     * @descr returns alarm array
     * @return array of alarms ["01:20 AM", "12:00 PM"]
     * */
    function getAlarms() {
        return alarms;
    }

    /** Public functions returned */
    return {
        getAlarms : getAlarms
    };

};