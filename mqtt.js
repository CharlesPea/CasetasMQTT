
//CODIGO PARA LA FECHA
const currentDate = new Date().toDateString();

function startConnect(){

  clientID = "clientID - "+parseInt(Math.random() * 100);

  host = "test.mosquitto.org";
  port = 8080;

  document.getElementById("consola").innerHTML += currentDate + " " + "<span> Conectando a " + host + "en el puerto " +port+"</span><br>";
  document.getElementById("consola").innerHTML += currentDate + " " +"<span> El id de cliente es " + clientID +" </span><br>";

  client = new Paho.MQTT.Client(host,Number(port),clientID);

  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  client.connect({
      onSuccess: onConnect
  });


}


function onConnect(){
  topic =  document.getElementById("topicIPT").value;

  document.getElementById("consola").innerHTML += currentDate + " " + "<span> Suscribiendo a topic "+topic + "</span><br>";

  client.subscribe(topic);
}



function onConnectionLost(responseObject){
  document.getElementById("consola").innerHTML += currentDate + " " + "<span> ERROR: Se ha perdido la conexión.</span><br>";
  if(responseObject !=0){
      document.getElementById("consola").innerHTML += currentDate + " " + "<span> ERROR:"+ responseObject.errorMessage +"</span><br>";
  }
}

function onMessageArrived(message){
  console.log("OnMessageArrived: "+message.payloadString);
  document.getElementById("consola").innerHTML += currentDate + " " + "<span> Topic:"+message.destinationName+"| Mensaje : "+message.payloadString + "</span><br>";
}

function startDisconnect(){
  client.disconnect();
  document.getElementById("consola").innerHTML += currentDate + " " + "<span> Desconectado por el usuario </span><br>";




}

function publishMessage(){
msg = document.getElementById("messageIPT").value;
topic = document.getElementById("topicIPT").value;

Message = new Paho.MQTT.Message(msg);
Message.destinationName = topic;

client.send(Message);
document.getElementById("consola").innerHTML += currentDate + " " + "<span> Mensaje enviado por topic "+topic+"</span><br>";


}

function cleanConsole() {
  document.getElementById("consola").innerHTML = null
}