$(document).ready(function(){



      var invio = $(".fa-telegram-plane");
      var msgInviati = $(".msgInviati ul");
      var scrivoMsg = $(".invio input");




      scrivoMsg.click(function(){
        $(".microfono").css('display', 'none');
        $(".invioIcon").css('display', 'block');

      });
      // centralizzo la funzione per inviare msg al click
      function inviaMsg(){
        var contenutoMsg = $(".invio input").val();
        msgInviati.append("<ul>" + '<li>' + contenutoMsg + '</li>' + "</ul>" );
        $(".invio input").val("");
        $(".microfono").css('display', 'block');
        $(".invioIcon").css('display', 'none');

      }

      $(".invio input").keydown(function(event) {

        console.log(event);
        /* Act on the event */
        if (event.which == 13) {
          console.log("invio");
          var contenutoMsg = $(".invio input").val();
          msgInviati.append('<li>' + contenutoMsg + '</li>');
          $(".invio input").val("");
          $(".microfono").css('display', 'block');
          $(".invioIcon").css('display', 'none');
        }
      });
      // invia il msg al click
      invio.click(inviaMsg);

      // invia il msg con tasto invio (tasto 13)








}
);
