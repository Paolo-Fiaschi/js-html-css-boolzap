$(document).ready(function(){



  var invio = $(".fa-telegram-plane");
  var msgInviati = $(".conversazione");
  var scrivoMsg = $(".invio input");
  var opzioniMsg = $(".msgInviati");

  scrivoMsg.click(function(){
    $(".microfono").css('display', 'none');
    $(".invioIcon").css('display', 'block');

  });
  // centralizzo la funzione per inviare msg al click
  function inviaMsg(){
    var contenutoMsg = $(".invio input").val();
    msgInviati.append("<div class='msgInviati'>" + '<p class="msgInviatiTesto">' + contenutoMsg + '</p>' + "</div>");

    // msgInviati.append("<div class='msgInviati'>" + '<p class="msgInviatiTesto">'+ "<span>" +  contenutoMsg  + "</span>" + "<span class='opzioniMsg'" + "<i class='fas fa-chevron-down'>" + "</i>" + "</span>" + '</p>' + "</div>");
    console.log($(this));
    $(".invio input").val("");
    $(".microfono").css('display', 'block');
    $(".invioIcon").css('display', 'none');

  }
  //aggiungere la freccia in basso per il menu a tendina
  // opzioniMsg.mouseover(function(){
  //   $(".opzioniMsg").addClass('.opzioniMsgActive');
  // });
  // invia il msg con tasto invio (tasto 13)
  $(".invio input").keydown(function(event) {

    console.log(event);
    /* Act on the event */
    if (event.which == 13) {
      console.log("invio");
      var contenutoMsg = $(".invio input").val();
      msgInviati.append("<div class='msgInviati'>" + '<p class="msgInviatiTesto">' + contenutoMsg + '</p>' + "</div>");
      $(".invio input").val("");
      $(".microfono").css('display', 'block');
      $(".invioIcon").css('display', 'none');
    }
  });
  // invia il msg al click
  invio.click(inviaMsg);









}
);
