$(document).ready(function(){


  // dichiarazione variabili
  var invio = $(".fa-telegram-plane");
  var scrivoMsg = $(".invio input");
  var infoMsgInviati = $(".msgInviatiTesto");
  var infoMsgRicevuti = $(".msgRicevutiTesto");
  var conversazioneAttuale = $(".rightActive .conversazione");
  var contattoAnteprima = $(".contattoAnteprima");
  var d = new Date();
  var ora = d.getHours();
  // var minuti = d.getMinutes();
  var minuti = (d.getMinutes()<10?'0':'') + d.getMinutes();//per avere 2 cifre ai minuti < 10
  //visualizzo solo il microfono e non il pulsante invio
  scrivoMsg.keydown(function() {
    var contenutoMsg = $(".invioShow input").val();
    // il tasto invio compare solo se è presente il msg
    if (contenutoMsg.length == 0) {
      $(".microfono").css('display', 'block');
      $(".invioIcon").css('display', 'none');
      console.log(contenutoMsg);
      // il tasto invio non compare se non cè il msg
    }else{
      $(".microfono").css('display', 'none');
      $(".invioIcon").css('display', 'block');
      console.log(contenutoMsg);
    }
  });
  // centralizzo la funzione per inviare msg al click
  function inviaMsg(){
    var contenutoMsg = $(".invioShow input").val();
    console.log(contenutoMsg);
    conversazioneAttuale.append("<div class='msgInviati'><p class='msgInviatiTesto'><span>" +  contenutoMsg  + "</span><span class='opzioniMsg'><i class='fas fa-chevron-down'></i></span><span class='ora oraDinamica'></span></p><div class='infoMsg'><div>Info messaggio</div><div>Cancella messaggio</div></div></div>");
    // aggiungo la data ai messaggi inviati
    $(".oraDinamica").html(ora + ":" + minuti);

    // cambio lo stato dell'utente mentre risponde (sta scrivendo)
    $(".nomeAccesso h4").hide();
    $(".nomeAccesso span").show();

    //risposta automatica del pc
    setTimeout(function(){
      console.log("ok");
      conversazioneAttuale.append("<div class='msgRicevuti'><p class='msgRicevutiTesto'><span>Ok</span><span class='opzioniMsg'><i class='fas fa-chevron-down'></i></span><span class='ora oraDinamica'></span></p><div class='infoMsg'><div>Info messaggio</div><div>Cancella messaggio</div></div></div>");
      // aggiungo la data ai messaggi inviati
      $(".oraDinamica").html(ora + ":" + minuti);

      // lo stato dell'utente torna di default (ultimo accesso)
      $(".nomeAccesso h4").show();
      $(".nomeAccesso .hide").hide();
    }, 1000);


    console.log($(this));
    $(".invio input").val("");
    $(".microfono").css('display', 'block');
    $(".invioIcon").css('display', 'none');

  }

  // invia il msg con tasto invio (tasto 13)
  $(".invio input").keydown(function(event) {
    var contenutoMsg = $(this).val();
    console.log(event);
    // si può inivare il msg solo se premendo invio e se il msg c'è
    if ((event.which == 13)&&(contenutoMsg.length != 0)) {
      console.log("invio");
      var contenutoMsg = $(this).val();
      conversazioneAttuale.append("<div class='msgInviati'><p class='msgInviatiTesto'><span>" +  contenutoMsg  + "</span><span class='opzioniMsg'><i class='fas fa-chevron-down'></i></span><span class='ora oraDinamica'></span></p><div class='infoMsg'><div>Info messaggio</div><div>Cancella messaggio</div></div></div>");
      // aggiungo la data ai messaggi inviati
      $(".oraDinamica").html(ora + ":" + minuti);

      // cambio lo stato dell'utente mentre risponde (sta scrivendo)
      $(".nomeAccesso h4").hide();
      $(".nomeAccesso span").show();

      //risposta automatica del pc

      setTimeout(function(){
        console.log("ok");
        conversazioneAttuale.append("<div class='msgRicevuti'><p class='msgRicevutiTesto'><span>Ok</span><span class='opzioniMsg'><i class='fas fa-chevron-down'></i></span><span class='ora oraDinamica'></span></p><div class='infoMsg'><div>Info messaggio</div><div>Cancella messaggio</div></div></div>");
        // aggiungo la data ai messaggi inviati
        $(".oraDinamica").html(ora + ":" + minuti);

        // lo stato dell'utente torna di default (ultimo accesso)
        $(".nomeAccesso h4").show();
        $(".nomeAccesso .hide").hide();
        // aggiungo la data ai messaggi inviati
        $(".oraDinamica").html(ora + ":" + minuti);

      }, 1000);
      $(this).val("");
      $(".microfono").css('display', 'block');
      $(".invioIcon").css('display', 'none');
    }
  });
  // invia il msg al click
  invio.click(inviaMsg);

  // informazioni msg
  // rendo visibile il div info al click dell'icona
  $("main").on("click",".opzioniMsg",
    function(){
      $(this).parent().parent().parent().find(".infoMsg").removeClass('infoMsgShow');
      if (!$(this).parent().siblings('.infoMsg').hasClass('infoMsgShow')) {
        $(this).parent().siblings('.infoMsg').addClass('infoMsgShow');
      }else {
        $(this).parent().siblings('.infoMsg').removeClass('infoMsgShow');
      }
    }
  );
  // rendo invisibile il div info quando esco con il mouse
  $("main").on("mouseleave",".infoMsg",
    function(){
      $(this).removeClass('infoMsgShow');
    }
  );
  // cancella il msg quando premo Cancella
  $("main").on("click",".infoMsg div:last-child",
    function(){
      $(this).parent().parent().hide();
    }
  );
  //Al click cambia colore il contatto selezionato e mostra la chat corrispondente
  contattoAnteprima.click(function(){
    $("p span:first-child").removeClass('color');
    $(".chatNontrovataHide").hide();
    $(".ricercaParoleChat").addClass('ricercaParoleChatHide');
    $(".right").removeClass('rightActive');
    $(".invio").removeClass('invioShow');
    contattoAnteprima.removeClass('contattoAnteprimaActive');
    $(this).addClass('contattoAnteprimaActive');
    var contattoSelezionato = $(this).data("chat");
    // console.log(contattoSelezionato);
    $(".right").each(function() {
      var chatSelezionata = $(this).data("chat");
      // console.log($(this).data("chat"));
      if (chatSelezionata == contattoSelezionato) {
        $(this).addClass('rightActive');
      }
    });
    $(".invio").each(function() {
      var invioShow = $(this).data("chat");
      if (invioShow == contattoSelezionato) {
        $(this).addClass('invioShow');
      }
    });

    conversazioneAttuale = $(".rightActive .conversazione");

  });

  // filtro contatti
  //gestirte evento su tastiera
  $(".ricercaContatto").keyup(function() {
    var contenutoRicercaContatto = $(".ricercaContatto").val().toLowerCase();
    $(".contattoAnteprima").each(function() {
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
    // se non viene trovato nessuno contatto
    if (!$(".nomeAnteprima h3").text().includes(contenutoRicercaContatto)) {
      $(".nonTrovatoHide").css('display', 'flex');
    }else {
      $(".nonTrovatoHide").hide();
    }
  });
  // rendo visibile la ricerca della chat nei messaggi
  $("main").on("click",".rightActive .cercaMessaggi",
    function(){
      $(this).siblings("input").val("");

      // se non è visibile rendila tale
      if ($(this).siblings("input").hasClass('ricercaParoleChatHide')) {
        $(this).siblings("input").removeClass('ricercaParoleChatHide');
        $("p span:first-child").removeClass('color');
      }else { //altrimenti nascondila
        $(this).siblings("input").addClass('ricercaParoleChatHide');
        $("p span:first-child").removeClass('color');
      }
    }
  );
  // filtro chat
  //gestirte evento su tastiera
  $(".ricercaParoleChat").keyup(function() {
    var contenutoRicercaParoleChat = $(".ricercaParoleChat").val().toLowerCase();
    // faccio un ciclo dei messaggi all'interno della chat
    $(".conversazione div").each(function() {
      var chatMsg = $("p span:first-child");
      // console.log($(this).find(chatMsg).text().toLowerCase());
      $(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat);
      console.log($(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat));
      // se il valore immesso matcha con il messaggio della chat lo evidenzio
      if ($(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat)) {
        $(this).find($(chatMsg)).addClass('color');
      }else{ //altrimenti lo lascio del colore di default
        $(this).find($(chatMsg)).removeClass('color');
      }
    });
    if (contenutoRicercaParoleChat.length == 0) {
      $("p span:first-child").removeClass('color');
    }
    // se non viene trovato nessuno messaggio
    if (!$("p span:first-child").text().includes(contenutoRicercaParoleChat)) {
      $(".chatNontrovataHide").css('display', 'block');
    }else {
      $(".chatNontrovataHide").hide();
    }
  });





}
);
