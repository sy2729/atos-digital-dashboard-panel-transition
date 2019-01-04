var newCardData = {};
export function datePicker (state, callback) {
  if(state === 'add') {
    initPicker('datepicker-start-date', 'start date')
    initPicker('datepicker-target-date', 'target date')
    initPicker('datepicker-complete-date', 'complete date')
    // submit the data
    $('.card-form .submit').on('click', (e)=> {
      e.preventDefault();
      newCardData.milestone = $('#milestone')[0].value;
      if(newCardData.milestone && newCardData['start date'] && newCardData['target date']) {
        newCardData.id = createRandomId(10);
        callback(JSON.parse(JSON.stringify(newCardData)));
        // clear the form
        $('.card-form input').val("");
        // clear data set
        newCardData = {};
      }else {
        throw new Error('not qualified')
      }

    })
  }else if (state === 'update') {
    initPicker('datepicker-start-date-update', 'start date')
    initPicker('datepicker-target-date-update', 'target date')
    initPicker('datepicker-complete-date-update', 'complete date')

    
  }
}







  // initialize the datepicker library
  function initPicker(id, key) {
    var picker = new Pikaday({
      field: document.getElementById(id),
      format: 'M/D/YYYY',
      toString(date, format) {
        // you should do formatting based on the passed format,
        // but we will just return 'D/M/YYYY' for simplicity
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${month}/${day}/${year}`;
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