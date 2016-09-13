$(document).ready(function(){
  'use strict';

  var link,url,name;
  newSearch();
  window.onload = googleClient;

  $('#searcher').on('mousedown', function(e){
    e.preventDefault();
    getResults();
  });

  $(document).keydown(function(x){
    if(x.keycode===13){
      getResults();
    }
  });

  function googleClient(){
    gapi.client.setApiKey('AIzaSyAArhYbIkYyTY5rYZBhlD3SWVHwgaHHCN4');
    gapi.client.load('youtube', 'v3', function(){
      console.log('ready');
    });
  }

  function getResults(){
    var query = $('input[type=text]').val();
    var search = gapi.client.youtube.search.list({
        part:'snippet',
        type: 'video',
        q: '"'+query+' acapella"',
        maxResults: 50
        //order: 'viewCount'
      });
      search.execute(function(get){
        var results = get.result;
        showResults(results);
      });
  }

  function showResults(x){
    $('input[type=text], textarea').val('');
    $('#search-results').html('');
    $.each(x.items, function(z,y){
       link = y.id.videoId;
       url = y.snippet.thumbnails.high.url;
       name=y.snippet.title;
      $('#search-results').append('<a href=https://www.youtube.com/watch?v='+link+
        ' target="_blank"><img src='+url+'></a>');
      $('#search-results').append('<div><p class="titles inner"><a href="http://www.youtubeinmp3.com/download/?video=https://www.youtube.com/watch?v='+link+'&autostart=1" target="_blank">'+name+'</a></p></div>')

    });
  }


    $('body').on('click', '.titles', function(){
      show($(this).text());
    });

  function show(track){
    $.ajax({
      url: 'https://kashyap32-youtubetomp3-v1.p.mashape.com/',
      type: 'GET',
      data: "'"+track+"'",
      dataType: 'text',
      success: function(data) { $('body').append('<div><p class="titles inner"><a href="'+data+'"</a></p></div>');},
      error: function(err) {console.log(err); },
      beforeSend: function(xhr) {
        xhr.setRequestHeader("X-Mashape-Authorization", 'NiAnfW53c4mshBu0PFGedd1RvMN1p1jp00Bjsn2LImX1wNdeJM');
      }
    });
  }

  function newSearch(){
    $('#search-results').html('');
    $("input[type=text], textarea").val("");
  }


});

/*
//href=https://www.youtube.com/watch?v='+link+' target="_blank"
//<div><p class="titles inner"><a href="#">'+name+'</a></p></div>
//'http://www.youtubeinmp3.com/download/?video='+'https://www.youtube.com/watch?v='+link+''
*/
