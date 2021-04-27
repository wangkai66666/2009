function  ajax(obj){
      //设置传参为get方式
       var type = obj.type || "get" ;
      var dataType = obj.dataType || "json"
      var url = obj.url
      var data = obj.data || {}
      var success = obj.success;
 //    把data拼接成字符串
    var dataStr = "";
    for (var key in data){
        dataStr+=key+"="+data[key]+"&"
    }
    dataStr = dataStr.slice(0,-1);
    if(dataType=="json"){
        var xhr  =  new XMLHttpRequest();
        if(type=="get"){
            xhr.open("get",url+"?"+dataStr)
            xhr.send(null)
        }else if(type=="post"){
            xhr.open("post",'url')
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(dataStr)
        }
        xhr.onreadystatechange=function(){
            if(xhr.status==200&&xhr.readyState==4){
                var json = xhr.responseText;
                success(json);
            }
        }
    }else if(dataType=="jsonp"){
        var data = new Data();
        var cbname = "myJsonp"+date.getTime()+Math.random().toString().slice(2)
        window[cbname] = function (data) {
              success(data)
        }
        var newScript = document.createElement("script")
        if(dataStr==""){
            newScript.src = url+"&callback="+cbname
        }  else{
            newScript.src = url+"?"+dataStr+"&callback="+cbname
        }
    document.body.appendChild(newScript)
    }
 }
