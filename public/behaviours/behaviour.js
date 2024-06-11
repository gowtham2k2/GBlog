var intervalId = setInterval(() => {
  $("p.alert").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
}, 400);

setTimeout(() => {
  clearInterval(intervalId);
}, 1000);

setTimeout(() => {
  $("p.alert").css("display", "none");
}, 4000);
