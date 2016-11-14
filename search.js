function mvc() {
  var model = {
    init : function() {
      console.log('4');
      if (!localStorage.videos)
        localStorage.videos = JSON.stringify([]);
    },
    add : function(obj){
      var data = JSON.parse(localStorage.videos);
			data.push(obj);
			localStorage.videos = JSON.stringify(data);
    }
  };
  var controller = {
    setUpYoutubeAPI : function(){
      console.log("3");
      gapi.client.setApiKey("AIzaSyAV1MZol0Lh9yA1i9EKAWcuYLI3hjqLj3Y");
      gapi.client.load("youtube", "v3", function() {
        // yt api is ready
        model.init();
        view.init();
      });
    },
    init : function(){
      console.log("2");
      controller.setUpYoutubeAPI(); 
    },
    addVideo : function(vTitle, vImage){
      model.add({
        title: vTitle,
        image : vImage
      });
    }
  };
  var  view = {
    init : function() {
      console.log('5');
      $('#search-button').attr('disabled', false);
      console.log("6");
      $('form#searchForm').on("submit", function(e) {
        //To-do: localStorage.clear();
        e.preventDefault();
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
            videoTitle = video.snippet.title;
            videoImage = video.snippet.thumbnails.default.url;
            console.log(videoTitle);
            console.log(videoImage);
            controller.addVideo(videoTitle, videoImage);
          })
        });
      });
    }
  };
  
  controller.init();
}

function init() {
  console.log("1");
  mvc();
}
