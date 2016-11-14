// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  console.log("3");
  $('#search-button').attr('disabled', false);
  
  var model = {
    init : function() {
      console.log('4');
    }
  };
  var controller = {
    init : function(){
      model.init();
      view.init();
    }
  };
  var  view = {
    init : function() {
      console.log('5');
    }
  };
  
  controller.init();
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
    console.log(response);
    var str = JSON.stringify(response.result);
    $('#search-container').html('<pre>' + str + '</pre>');
    response.items.forEach(function(video){
      console.log(video);
    })
  });
}

function init() {
  console.log("1");
    gapi.client.setApiKey("AIzaSyAV1MZol0Lh9yA1i9EKAWcuYLI3hjqLj3Y");
    gapi.client.load("youtube", "v3", function() {
        // yt api is ready
      console.log("2");
      handleAPILoaded()
    });
}
