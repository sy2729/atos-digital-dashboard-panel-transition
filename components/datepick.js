var loadingResult = loadingState();
export function datePicker (callback) {
  var newCardData = {};
  if(loadingResult()) {
    initPicker('datepicker-start-date', 'start date')
    initPicker('datepicker-target-date', 'target date')
    initPicker('datepicker-complete-date', 'complete date')
    changeLoadingState()
  }

  // submit the data
  $('.card-form .submit').one('click', (e)=> {
    e.preventDefault();
    newCardData.milestone = $('#milestone')[0].value;
    console.log(newCardData)
    if(newCardData.milestone && newCardData['start date'] && newCardData['target date']) {
      newCardData.id = createRandomId(10);
      callback(newCardData);
      // clear the form
      $('.card-form input').val("");
    }else {
      throw new Error('not qualified')
    }

  })





  // initialize the datepicker library
  function initPicker(id, key) {
    var picker = new Pikaday({
      field: document.getElementById(id),
      format: 'D/M/YYYY',
      toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
      },
      parse(dateString, format) {
          // dateString is the result of `toString` method
          const parts = dateString.split('/');
          const day = parseInt(parts[0], 10);
          const month = parseInt(parts[1], 10) - 1;
          const year = parseInt(parts[2], 10);
          return new Date(year, month, day);
      },
      onSelect: function() {
        newCardData[key] = picker.toString();
      }
    });
  }

  function createRandomId(length) {
    var all = "abcdefghijklmnopqrstuvwxyz1234567890";
    var result = "";
    for(var i = 0; i < length; i++) {
      var index = Math.floor(Math.random()*all.length);
      result += all[index];
    };
    return result;
  }
}


// loading state
var changeLoadingState
function loadingState (){
  var firstLoading = true;
  function getState() {
    return firstLoading
  };
  changeLoadingState = function() {
    firstLoading = false
  };
  return getState
}
