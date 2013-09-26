$(function() {
  $.getJSON("/files", function(data) {
    data.forEach(function(item) {
      var newLi = $("<li></li>", {
        text: item,
      });
      var last = item.length - 1;
      if(item[last] === "/") {
        newLi.addClass("dir");
      }

      var numSlashes = item.split("/").length - 1;
      if(item.indexOf(".") > -1) numSlashes++;
      newLi.addClass("level-" + numSlashes);

      $("#files").append(newLi);
    });
  });

  var runGlob = function(glob) {
    $.getJSON("/test?glob=" + glob, function(data) {
      $("#files li").each(function() {
        if(data.indexOf($(this).text()) > -1) {
          $(this).addClass("matched");
        } else {
          $(this).removeClass("matched");
        }
      });
    });
  };

  $("#glob-input").on("keyup", function() {
    var glob = this.value;
    runGlob(glob);
  });

  $(".example").on("click", function() {
    runGlob($(this).data("glob"));
    $("#glob-input").val($(this).data("glob"));
  });

});
