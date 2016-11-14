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
    },
    getAllVideos : function(){
      return JSON.parse(localStorage.videos);
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
    },
    getVideos :function(){
      return model.getAllVideos();
    }
  };
  var  view = {
    init : function() {
      console.log('5');
      $('#search-button').attr('disabled', false);
      console.log("6");
      $('form#searchForm').on("submit", function(e) {
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
            view.render();
          })
        });
      });
    },
    render : function(){
      var htmlString = '';
      controller.getVideos().forEach(function(video){
        htmlString +=
          '<li class="video">' + 
            '<span class="video-title">' + 
              video.title + 
            '</span><br>' +
            '<img class="video-image" src="' + video.image + '">' + 
            '</img>' +
          '</li>' +
          '<li class="divider"></li>';
      });
      $('#videos').html(htmlString);
    }
  };
  
  controller.init();
}

function init() {
  console.log("1");
  localStorage.clear();
  mvc();
}
