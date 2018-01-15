$(document).ready(function() {
  var total = 0; //running total
  var op = ''; //current operation
  var nodec = true; //'.' has not been pushed
  var clear = true; //the screen is clear
  var num = ''; //string that number buttons will be added to when pushed
  var last = ''; //for current class
  var opOn = false; //

  function calculate() {
    switch (op) {
      case '/':
        total /= num;
        break;
      case '-':
        total -= num;
        break;
      case 'x':
        total *= num;
        break;
      case '+':
        total = parseFloat(total) + parseFloat(num);
        break;
      default:
        total = num;
    }
    total = Math.round(total * 100) / 100;
    if (total == Infinity) {
      total = "ERROR";
    } else if (total > 9999999999999) {
      total = total.toExponential(2);
      last = total.toString();
    }
    $('#screen').text(total);
    clear = true;
    nodec = true;
  }

  function offscreen() {
    if (last.length > 34) {
      last = "(...)";
      $('.current').text(last);
    }
  }

  //'+/-' button
  $('.neg').click(function() {
    if (num > 0 && op === '') {
      total = -(total);
      num = '-' + num;
      last = '-' + last;
      $('#screen').prepend('-');
      $('.current').text(last);
    } else if (num < 0 && op === '') {
      total = -(total);
      num = num.replace('-', '');
      $('#screen').text(num);
      last = last.replace('-', '');
      $('.current').text(last);
    }

  });
  //what happens when you click a number
  $('.n').click(function() {
    n = $(this).text();
    if (num.length > 15) {} //no room left on screen
    else if (clear === true) { //screen was just cleared or op/= was pushed
      $('#screen').text(n);
      $('.current').append(n);
      clear = false;
      num = n;
      if (op === '') {
        last = '';
      }
    } else {
      $('#screen').append(n);
      $('.current').append(n);
      offscreen();
      num += n;
    }
    last += n;
    opOn = false;
  });
  //both clear buttons do this
  $('.clr').click(function() {
    $('#screen').text('0');
    last = last.replace(num, '');
    $('.current').text(last);
    nodec = true;
    clear = true;
    num = '0';
  });
  //all clear resets the total & operation
  $('.all').click(function() {
    $('.current').text('');
    last = '';
    total = 0;
    op = '';
  });
  //'=' button
  $('.eq').click(function() {
    if (!opOn) {
      calculate();
      num = $('#screen').text();
      op = '';
      last = num;
      clear = true;
    }
  });
  //'.' button; avoids '...4' for example
  $('.dec').click(function() {
    if (nodec === true) {
      if (clear === true) {
        $('#screen').text('0.');
        $('.current').append('0.');
      } else {
        $('#screen').append('.');
        $('.current').append('.');
      }
      num += '.';
      last += '.';
      nodec = false;
      clear = false;
    }
  });

  //operations (*,/,-,+)
  $('.op').click(function() {
    if (!opOn) {
      calculate();
      num = '';
      op = $(this).text();
      if (op === '/' || op === 'x') {
        last = '(' + last + ')';
      }
      last += op;
      $('.current').text(last);
      opOn = true;
    }
  });
});
