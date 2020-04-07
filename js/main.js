$(document).ready(function(){


    var invio = $(".fa-telegram-plane");
    var contenutoMsg = $(".invio input").val();
    var msgInviati = $(".msgInviati ul");
    var inputValdopoClick;

    // invia il msg al click
    invio.click(function(){

      msgInviati.append('<li>' + contenutoMsg + '</li>');
      inputValdopoClick = $(".invio input").val("");
      }
    );








}
);
