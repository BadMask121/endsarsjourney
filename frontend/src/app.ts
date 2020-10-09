io.sockets.on("connection", function (socket) {
  console.log("SOCKET CONNECTED\n");
  var track_item = "#RI72";

  var twitterStream = t.stream("statuses/filter", { track: track_item });

  twitterStream.on("data", function (tweet) {
    if (tweet && tweet.text.match(track_item)) {
      socket.emit("tweets", { detail: tweet });
    }
  });

  twitterStream.on("error", function (error) {
    throw error;
  });
});
