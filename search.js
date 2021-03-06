function mvc() {
  var model = {
    localStorageReset : function() {
      localStorage.videos = JSON.stringify([]);
    },
    init : function() {
      console.log('4');
      if (!localStorage.videos)
        model.localStorageReset();
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
      gapi.client.setApiKey("AIzaSyD6Umoeicc_WecFsgk37zNQ89hXOUI1bkA");
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
    },
    clearLocalStorage : function(){
      model.localStorageReset();
    }
  };
  var  view = {
    init : function() {
      console.log('5');
      $('#search-button').attr('disabled', false);
      console.log("6");
      $('form#searchForm').on("submit", function(e) {
        e.preventDefault();
        controller.clearLocalStorage();
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
            '<span class="video-title hideOverflow text-success">' + 
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
  mvc();
}
