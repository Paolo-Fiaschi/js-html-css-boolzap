$(document).ready(function(){


  // dichiarazione variabili
  var invio = $(".invioIcon");
  var scrivoMsg = $(".invio input");
  var infoMsgInviati = $(".msgInviatiTesto");
  var infoMsgRicevuti = $(".msgRicevutiTesto");
  var conversazioneAttuale = $(".rightActive .conversazione");
  var contattoAnteprima = $(".contattoAnteprima");
  var microfono = $(".microfono");
  var ultimoAccesso = $(".nomeAccesso h4");
  var staScrivendo = $(".hide");
  var filtraContatto = $(".ricercaContatto").val("");
  var contenutoMsg = $(".invioShow input").val("");

  //visualizzo solo il microfono e non il pulsante invio
  scrivoMsg.keydown(invioMsgShow);

  // invia il msg al click
  invio.click(inviaMsg);

  // invia il msg con tasto invio (tasto 13)
  scrivoMsg.keydown(inviaMsgTastiera);

  // informazioni msg
  // rendo visibile il div info al click dell'icona
  $("main").on("click",".opzioniMsg",infoMsgShow);

  // rendo invisibile il div info quando esco con il mouse
  $("main").on("mouseleave",".infoMsg",infoMsgHide);

  // cancella il msg quando premo Cancella
  $("main").on("click",".infoMsg div:last-child",cancellaMsg);

  //Al click cambia colore il contatto selezionato e mostra la chat corrispondente
  contattoAnteprima.click(contattoSelezionato);

  // filtro contatti
  //gestirte evento su tastiera
  filtraContatto.keyup(cercareContatto);

  // rendo visibile la ricerca della chat nei messaggi
  $("main").on("click",".rightActive .cercaMessaggi",ricercaChatInput);

  // filtro chat
  //gestire evento su tastiera della ricerca dei msg nella chat
  $(".rightActive .ricercaParoleChat").keyup(ricercaMsgChat);

  //FUNZIONI-----------------------------------------------

  //visualizzo solo il microfono e non il pulsante invio
  function invioMsgShow() {
    var contenutoMsg = $(".invioShow input").val();
    // il tasto invio compare solo se è presente il msg
    if (contenutoMsg.length == 0) {
      microfono.css('display', 'block');
      invio.css('display', 'none');
      console.log(contenutoMsg);
      // il tasto invio non compare se non cè il msg
    }else{
      microfono.css('display', 'none');
      invio.css('display', 'block');
      console.log(contenutoMsg);
    }
  }

  // centralizzo la funzione per inviare msg al click
  function inviaMsg(){
    var d = new Date();
    var ora = d.getHours();
    var minuti = (d.getMinutes()<10?'0':'') + d.getMinutes();//per avere 2 cifre ai minuti < 10
    var contenutoMsg = $(".invioShow input").val();
    console.log(contenutoMsg);

    // template handlebars
    var source = $("#msg-template").html();
    var template = Handlebars.compile(source);
    var context = {
      "msgChatPH": "msgInviati",
      "msgChatTestoPH": "msgInviatiTesto",
      "msgPH": contenutoMsg,
      "oraPH": ora + ":" + minuti
    };
    var messaggioDaAggiungere = template(context);

    conversazioneAttuale.append(messaggioDaAggiungere);

    // cambio lo stato dell'utente mentre risponde (sta scrivendo)
    ultimoAccesso.hide();
    staScrivendo.show();

    //risposta automatica del pc
    setTimeout(
      function(){
        console.log("ok");

        // template handlebars
        var context = {
          "msgChatPH": "msgRicevuti",
          "msgChatTestoPH": "msgRicevutiTesto",
          "msgPH": "Ok",
          "oraPH": ora + ":" + minuti
        };
        var messaggioDaAggiungere = template(context);
        conversazioneAttuale.append(messaggioDaAggiungere);

        // lo stato dell'utente torna di default (ultimo accesso)
        ultimoAccesso.show();
        staScrivendo.hide();

        // far scrollare la pagina fino al msg più recente
        var altezzaFinestra = $(".rightActive").innerHeight();//considero l'altezza della conversazione attiva
        $(".conversazione").animate({//aggiungo l'animazione di scroll alla conversazione
          scrollTop: altezzaFinestra//faccio scrollare dal top all'allatezza della conversazione attiva
      },0);
    }, 1000);
    console.log($(this));
    scrivoMsg.val("");
    microfono.css('display', 'block');
    invio.css('display', 'none');
  }

  // richiamo la funzione invia msg al click per l'evento della tastiera
  function inviaMsgTastiera(event){
    if ((event.which == 13)&&(contenutoMsg.length > 0)) {
      inviaMsg();
    }
  }

  // rendo visibile il div info al click dell'icona
  function infoMsgShow(){
    $(this).closest().find(".infoMsg").removeClass('infoMsgShow');
    if (!$(this).parent().siblings('.infoMsg').hasClass('infoMsgShow')) {
      $(this).parent().siblings('.infoMsg').addClass('infoMsgShow');
    }else {
      $(this).parent().siblings('.infoMsg').removeClass('infoMsgShow');
    }
  }

  // rendo invisibile il div info quando esco con il mouse
  function infoMsgHide(){
    $(this).removeClass('infoMsgShow');
  }

  // cancella il msg quando premo Cancella
  function cancellaMsg(){
    $(this).parent().parent().hide();
  }

  //Al click cambia colore il contatto selezionato e mostra la chat corrispondente
  function contattoSelezionato(){
    $("p span:first-child").removeClass('color');
    $(".chatNontrovataHide").hide();
    $(".ricercaParoleChat").addClass('ricercaParoleChatHide');
    $(".right").removeClass('rightActive');
    $(".invio").removeClass('invioShow');
    contattoAnteprima.removeClass('contattoAnteprimaActive');
    $(this).addClass('contattoAnteprimaActive');
    var contattoSelezionato = $(this).data("chat");
    // console.log(contattoSelezionato);
    $(".right").each(
      function() {
        var chatSelezionata = $(this).data("chat");
        // console.log($(this).data("chat"));
        if (chatSelezionata == contattoSelezionato) {
          $(this).addClass('rightActive');
        }
      }
    );
    $(".invio").each(
      function() {
        var invioShow = $(this).data("chat");
        if (invioShow == contattoSelezionato) {
          $(this).addClass('invioShow');
        }
      }
    );
    conversazioneAttuale = $(".rightActive .conversazione");
  }

  // filtro contatti
  //gestirte evento su tastiera
  function cercareContatto() {
    var contenutoRicercaContatto = $(".ricercaContatto").val().toLowerCase();
    $(".contattoAnteprima").each(
      function() {
        var nomeContatto = $(".nomeAnteprima h3");
        console.log($(this).find(nomeContatto).text().toLowerCase());
        $(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto);
        console.log($(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto));
        if ($(this).find(nomeContatto).text().toLowerCase().includes(contenutoRicercaContatto)) {
          $(this).show();
        }else {
          $(this).hide();
        }
      }
    );

    // se non viene trovato nessuno contatto
    if (!$(".nomeAnteprima h3").text().toLowerCase().includes(contenutoRicercaContatto)) {
      $(".nonTrovatoHide").css('display', 'flex');
    }else {
      $(".nonTrovatoHide").hide();
    }
  }

  // rendo visibile la ricerca della chat nei messaggi
  function ricercaChatInput(){
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

  // filtro chat
  //gestire evento su tastiera della ricerca dei msg nella chat
  function ricercaMsgChat() {
    var contenutoRicercaParoleChat = $(".ricercaParoleChat").val().toLowerCase();
    // faccio un ciclo dei messaggi all'interno della chat
    $(".rightActive .conversazione div").each(
      function() {
        var chatMsg = $("p span:first-child");
        // console.log($(this).find(chatMsg).text().toLowerCase());
        $(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat);
        console.log($(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat));
        // se il valore immesso matcha con il messaggio della chat lo evidenzio
        if ($(this).find(chatMsg).text().toLowerCase().includes(contenutoRicercaParoleChat)) {
          $(this).find(chatMsg).addClass('color');
        }else{ //altrimenti lo lascio del colore di default
          $(this).find(chatMsg).removeClass('color');
        }
      }
    );
    //se la ricerca è vuota ritorna al colore di default
    if (contenutoRicercaParoleChat.length == 0) {
      $("p span:first-child").removeClass('color');
    }
    // se non viene trovato nessuno messaggio "msg non trovato"
    if (!$("p span:first-child").text().includes(contenutoRicercaParoleChat)) {
      $(".chatNontrovataHide").css('display', 'block');
    }else {
      $(".chatNontrovataHide").hide();
    }
  }

}
);
