
var fn = {
    ready: function(){
        document.addEventListener("deviceready", fn.init(), false);
    },
    init: function(){   
        $("#CapturePicture").click(fn.ContinueCapture);
        $("#capture").click(fn.foto);
        $("#login").click(fn.login);
        $("#ListPictures").click(fn.ListPictures);
        $("#sendImage").click(fn.sendImage);
        $("#red").click(fn.StatusRed);
        
    },
    ContinueCapture: function(){
    var networkState = navigator.connection.type;
    var states = {};
    states[Connection.WIFI]= 'WiFi connection';
    if(states[networkState] != 'WiFi connection'){
      window.location.href="red.html";
    } else {
      window.location.href="tomar.html";
    }

    },
    foto: function(){
      navigator.camera.getPicture(fn.captureSuccess, fn.captureError, {
       quality: 50,
       saveToPhotoAlbum: true,   
       allowEdit: true,
       destinationType: navigator.camera.DestinationType.DATA_URL 
     });  
    },
    captureSuccess: function(imageData){
      var photo = document.getElementById('photo');  
      photo.style.display = 'block';  
      photo.src = "data:image/jpeg;base64," + imageData;
      
    }, 
    captureError: function(){
      alert("error");
    },
    login: function(){
      var usuario = $("#correo").val();
      var key = $("#contrasena").val();
    
      $.ajax({
        type: "POST",
        url:"http://localhost/YSN/public/login_app",
        data:{ correo: usuario, contrasena: key},
        cache: false,
        success: function(res){
          if(res == "success"){
            window.location.href="principal.html";
          } else {
            alert("Ingresa la informacion correcta");
          }
        },
        error: function(err){
          alert(err);
        }
      })
    },
    sendImage: function(){
     

      var nombre = $("#nombre").val();
      var descripcion = $("#descripcion").val();
      

      $.ajax({
        type: "POST",
        url:"http://localhost/YSN/public/uploadImage",
        data:{nombre: nombre, descripcion: descripcion},
        cache: false,
        success: function(res){
          alert(res);
        },
        error: function(err){
          alert(err);
        }
      })
    },
    StatusRed: function(){
       var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(states[networkState] == 'WiFi connection'){
      alert("Conectado por WIFI");
    }

    
    },
    ListPictures: function(){
      window.location.href="lista.html";
      
    }
};



$(fn.ready);




