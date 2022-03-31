var app = {
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function() {
    var appthis=this;
    this.checkConnection();   
    var url="https://www.ris.gov.tw/rs-opendata/api/v1/datastore/ODRP048/106";
    $.getJSON(url, function(response){
         appthis.weatherData=response.responseData;
         appthis.updateWeather();
        console.log(response);
    })
    },

    weatherData:"",
    checkConnection: function() {
        var networkState = navigator.connection.type;
        if (networkState === Connection.NONE) {
            alert("沒有網路連線...");
            navigator.app.exitApp(); // 離開應用程式
        }
  },

      updateWeather:function(){
        var PArray=this.weatherData;
        for(var i=368;i<370;i++){
          
          var idd=this.weatherData[i].site_id;
          var li=$("<li>");
            li.append($("<h1>").text(idd));
          var density=this.weatherData[i].population_density;
          $("<span>").addClass("ui-li-count").text("人口密度: "+density).appendTo(li); 

          $("#weatherList").append(li);
      }
        $("#weatherList").listview("refresh");
    },
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();