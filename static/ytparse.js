
ytApiKey = 'AIzaSyDPiXtTySH7HpuVQxD_UvP1TWgGqpcGjuA'
    // itemId = 'GtJEC2ECB1I'

    var q;
    function parseYTLink(link) {
        link = document.getElementById('input').value
        var vid = link.split('=')[1];
        return vid
    }
    // songData('box1', iter);

    function getTitle(func, id) {
         $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/videos?id='+ id +'&key='+ ytApiKey +'&fields=items(snippet(channelId,title,categoryId))&part=snippet',
      dataType: "jsonp",
      // console.log(id);
      success: function(data){
            func(name=data.items[0].snippet.title)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert (textStatus, + ' | ' + errorThrown);
        }
      });
     }

     function changeTitle(id, box) {
         $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/videos?id='+ id +'&key='+ ytApiKey +'&fields=items(snippet(channelId,title,categoryId))&part=snippet',
      dataType: "jsonp",
      // console.log(id);
      success: function(data){
            fbchangeTitle(box, name=data.items[0].snippet.title, id)
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert (textStatus, + ' | ' + errorThrown);
        }
      });
     }


     function updateTitle(str) {
        document.getElementById("song_title").innerHTML=str;
     }
