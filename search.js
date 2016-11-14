// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  console.log("handleAPIloaded");
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  console.log("search");
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    console.log("execute");
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}

function init() {
  console.log("init");
    gapi.client.setApiKey("AIzaSyAV1MZol0Lh9yA1i9EKAWcuYLI3hjqLj3Y");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
      console.log("load");
    });
}
