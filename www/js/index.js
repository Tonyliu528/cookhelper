/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
    //    this.receivedEvent('deviceready');
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
        //var maxTArray=this.weatherData[12].time;
        for(var i=0;i<PArray.length;i++){
          
          var idd=this.weatherData[i].site_id;
          var li=$("<li>");
            li.append($("<h1>").text(idd));
          //var minT=this.weatherData[8].time[i].elementValue[0].value;
          //var maxT=this.weatherData[12].time[i].elementValue[0].value
          var density=this.weatherData[i].population_density;
          $("<span>").addClass("ui-li-count").text("人口密度: "+density).appendTo(li); 

          $("#weatherList").append(li);
      }
        $("#weatherList").listview("refresh");
    },
    /*  processTime: function(startstr, endstr){
    var idx1=startstr.indexOf('-');
    var idx2=startstr.indexOf(' ');

    if( startstr.substr(idx2+1, 2)=="06") {
        return startstr.substring(idx1+1, idx2)+ " 白天";  
    }else if (startstr.substr(idx2+1, 2)=="18"){
        return startstr.substring(idx1+1, idx2)+ " 晚上";  
    }else {   
        return "現在";
    }
},*/

    // Update DOM on a Received Event
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