var pause = false;
var resumeFlag = "";

var timer = {
  start: function (timestamp) {
    var durationinsec = 0;
    if (pause === true) {
      var duration = "";
      duration = document.getElementById("countdown").textContent;
      durationinsec =
        parseInt(duration.slice(0, -3)) * 60 + parseInt(duration.slice(-2));
    } else {
      var duration = "";
      duration = getDuration();
      durationinsec = duration * 60;
    }
    var self = this;
    this.interval = setInterval(function () {
      var diff = durationinsec - (((Date.now() - timestamp) / 1000) | 0);
      var min = parseInt(diff / 60, 10);
      var sec = parseInt(diff % 60, 10);

      if (sec < 10) {
        sec = "0" + sec;
      }
      if (min < 10) {
        min = "0" + min;
      }
      document.getElementById("countdown").textContent = min + ":" + sec;
      document.title = min + ":" + sec;
      if (diff < 1) {
        var temp = '';
        temp = document.getElementById("countdown").value.slice(0);
        console.log(temp);
        document.getElementById("countdown").textContent = document.getElementById("break").value;
        document.getElementById("countdown").value = document.getElementById("break").value;
        console.log(temp);
        document.getElementById("break").textContent = temp;
        document.getElementById("break").value = temp;
        soundAlert();
        clearInterval(self.interval);
        delete self.interval;
        timer.start(Date.now());
      }
    }, 1000);
  },
  pause: function () {
    clearInterval(this.interval);
    delete this.interval;
  },

  resume: function () {
    if (!this.interval) {
      this.start(Date.now());
    }
  }
};

$("#start").on("click", function (e) {
  disableSetupButtons();
  timer.start(Date.now());
  $("#start").attr("disabled", "disabled");
});

$("#pause").on("click", function (e) {
  pause = true;
  timer.pause();
  $("#start").attr("disabled", false);
});

$("#reset").on("click", function (e) {
  $("#start").attr("disabled", false);
  enableSetupButtons();
  document.getElementById("countdown").textContent = "25:00";
  document.getElementById("break").textContent = "04:00";
  pause = false;
  timer.pause();
});

$("#settingbox .modal-dialog .modal-content .modal-footer #save").on("click", function (e) {
  var sessionlen = $("#settingbox #session-input").val();
  var breaklen = $("#settingbox #break-input").val();

  document.getElementById("countdown").value = sessionlen;
  document.getElementById("break").value = breaklen;
  $('#settingbox').modal('hide');
  if (sessionlen <= 9) {
    document.getElementById("countdown").textContent = "0" + sessionlen + ":00";
  } else document.getElementById("countdown").textContent = sessionlen + ":00";
  if (breaklen <= 9) {
    document.getElementById("break").textContent = "0" + breaklen + ":00";
  } else document.getElementById("break").textContent = breaklen + ":00";

});

$("#plus").on("click", function (e) {
  addMinute("countdown");
});

$("#minus").on("click", function (e) {
  minusMinute("countdown");
});

function breakCount() {
  document.getElementById("countdown").textContent = document.getElementById("break").textContent;
}
function minusMinute(id) {
  var duration = getDuration();
  if (duration > 0) {
    duration = duration - 1;
    if (duration < 9) {
      document.getElementById(id).textContent = "0" + duration + ":00";
    } else {
      document.getElementById(id).textContent = duration + ":00";
    }
  }
}
function addMinute(id) {
  var duration = getDuration();
  if (duration < 9) {
    duration = duration + 1;
    document.getElementById(id).textContent = "0" + duration + ":00";
  } else {
    duration = duration + 1;
    document.getElementById(id).textContent = duration + ":00";
  }
}
function getDuration() {
  return parseInt(document.getElementById("countdown").textContent);
}
function disableSetupButtons() {
  $(".set").attr("disabled", "disabled");
}

function enableSetupButtons() {
  $(".set").attr("disabled", false);
}

function soundAlert() {
  var sound = document.getElementById("audio");
  sound.play();
}