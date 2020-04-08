$(document).ready(function(){


  // dichiarazione variabili
  var invio = $(".fa-telegram-plane");
  var msgInviati = $(".conversazione");
  var scrivoMsg = $(".invio input");
  var opzioniMsg = $(".msgInviati");
  var msgRicevuti = $(".conversazione");
  var contattoAnteprima = $(".contattoAnteprima");

  //visualizzo solo il microfono e non il pulsante invio
  scrivoMsg.click(function(){
    $(".microfono").css('display', 'none');
    $(".invioIcon").css('display', 'block');

  });

  // centralizzo la funzione per inviare msg al click
  function inviaMsg(){
    var contenutoMsg = $(".invio input").val();
    msgInviati.append("<div class='msgInviati'><p class='msgInviatiTesto'><span>" +  contenutoMsg  + "</span><span class='opzioniMsg'<i class='fas fa-chevron-down'></i></span></p></div>");
    // cambio lo stato dell'utente mentre risponde (sta scrivendo)
    $(".nomeAccesso h4").hide();
    $(".nomeAccesso span").show();

    //risposta automatica del pc
    setTimeout(inviaMsg, 1000);
    function inviaMsg(){
      console.log("ok");
      msgRicevuti.append("<div class='msgRicevuti'><p class='msgRicevutiTesto'>" + "ok" + "</p></div>");
      // lo stato dell'utente torna di default (ultimo accesso)
      $(".nomeAccesso h4").show();
      $(".nomeAccesso span").hide();

    }
    console.log($(this));
    $(".invio input").val("");
    $(".microfono").css('display', 'block');
    $(".invioIcon").css('display', 'none');

  }
  //aggiungere la freccia in basso per il menu a tendina

  // opzioniMsg.mouseover(function(){
  //   $(this).addClass('opzioniMsgActive');
  // });


  // invia il msg con tasto invio (tasto 13)
  $(".invio input").keydown(function(event) {

    console.log(event);
    if (event.which == 13) {
      console.log("invio");
      var contenutoMsg = $(".invio input").val();
      msgInviati.append("<div class='msgInviati'><p class='msgInviatiTesto'><span>" +  contenutoMsg  + "</span><span class='opzioniMsg'<i class='fas fa-chevron-down'></i></span></p></div>");
      // cambio lo stato dell'utente mentre risponde (sta scrivendo)
      $(".nomeAccesso h4").hide();
      $(".nomeAccesso span").show();

      //risposta automatica del pc

      setTimeout(inviaMsg, 1000);
      function inviaMsg(){
        console.log("ok");
        msgRicevuti.append("<div class='msgRicevuti'><p class='msgRicevutiTesto'>" + "ok" + "</p></div>");
        // lo stato dell'utente torna di default (ultimo accesso)
        $(".nomeAccesso h4").show();
        $(".nomeAccesso span").hide();

      }
      $(".invio input").val("");
      $(".microfono").css('display', 'block');
      $(".invioIcon").css('display', 'none');
    }
  });
  // invia il msg al click
  invio.click(inviaMsg);

  //Al click cambia colore il contatto selezionato
  contattoAnteprima.click(function(){
    contattoAnteprima.removeClass('contattoAnteprimaActive');
    $(this).addClass('contattoAnteprimaActive');
  });
  // filtro contatti
  //gestirte evento su tastiera (oppure su click di bottone di input ricerca)
  $(".ricercaContatto").keyup(function(e) {
    var c = String.fromCharCode(e.which);
    console.log(c);
    // salvarmi input utente in campo del filtro (stringa1)
    var contenutoRicercaContatto = $(".ricercaContatto").val().toLowerCase();
    // selezionare tutti i blocchi di contatto e ciclare tra di essi (each())
    //salvo in una var il valore del testo del nome nel contatto (stringa2)
    $(".contattoAnteprima").each(function(index) {
      var nomeContatto = $(".nomeAnteprima h3");
      console.log($(this).find(nomeContatto).text().toLowerCase());
      $(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto);
      console.log($(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto));
      if ($(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto)) {
        $(this).show();
      }else {
        $(this).hide();
      }
    });

  });


// RICERCA AL CLICK FUNZIONANTE

  // $(".fa-search").click(
  //   function(){
  //
  //     // salvarmi input utente in campo del filtro (stringa1)
  //     var contenutoRicercaContatto = $(".ricercaContatto").val();
  //     // selezionare tutti i blocchi di contatto e ciclare tra di essi (each())
  //     //salvo in una var il valore del testo del nome nel contatto (stringa2)
  //     $(".contattoAnteprima").each(function(index) {
  //       // console.log(index + ":" + $( this ).text());
  //       var nomeContatto = $(".nomeAnteprima h3");
  //       console.log($(this).find(nomeContatto).text().toLowerCase());
  //       $(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto);
  //       console.log($(this).find(nomeContatto).text().includes(contenutoRicercaContatto));
  //       if ($(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto)) {
  //         $(this).show();
  //       }else {
  //         $(this).hide();
  //       }
  //     });
  //   }
  // );







}
);
