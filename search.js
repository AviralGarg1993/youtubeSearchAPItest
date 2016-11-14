// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  $('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  var q = $('#query').val();
  var request = gapi.client.youtube.search.list({
    q: q,
    part: 'snippet'
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
  });
}

function init() {
    gapi.client.setApiKey("AIzaSyCOy7lpdzpaYI1v-cUiOm1taVqI7ZnF9yY");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
    });
}
