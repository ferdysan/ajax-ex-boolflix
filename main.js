// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:  1. Titolo 2. Titolo Originale 3. Lingua 4. Voto

// Milestone 2: Trasformiamo il numero da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome). Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)  Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici) Qui un esempio di chiamata per le serie tv: https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&la

// Milestone 3: In questa milestone come prima cosa aggiungiamo la copertina del film o della serie al nostro elenco. Ci viene passata dall’API solo la parte finale dell’URL, questo perché poi potremo generare da quella porzione di URL tante dimensioni diverse. Dovremo prendere quindi l’URL base delle immagini di TMDB: https://image.tmdb.org/t/p/​ per poi aggiungere la dimensione che vogliamo generare (troviamo tutte le dimensioni possibili a questo link: https://www.themoviedb.org/talk/53c11d4ec3a3684cf4006400​) per poi aggiungere la parte finale dell’URL passata dall’API. Esempio di URL che torna la copertina di BORIS: https://image.tmdb.org/t/p/w185/s2VDcsMh9ZhjFUxw77uCFDpTuXp.jpg

$(document).ready(function(){
  // preparo il template handlebars

  // salvo il mio template in una variabile
  var template_html = $('#template_netflix').html();
  // passo al metodo compile di handlebars  il mio template html
  var template_function = Handlebars.compile(template_html);

  //url base copertina

  var url_loc = 'https://image.tmdb.org/t/p/w185/';

  $('#bottone_ricerca').click(function(){
    $('.container_film').empty();
    chiamaFilm();

    chiamaSerie();
    //reset input
    $('#cerca_film').val('');
  });

  //intercetto il testo invio
  $("#cerca_film").keypress(function(event) {
     if (event.which==13) {
       $('.container_film').empty();

       chiamaFilm();

       chiamaSerie();
       //reset input
       $('#cerca_film').val('');
     }
  });

// carico l'api per la ricerca del film e creo una funzione
function chiamaFilm(){

  var item_cercato = $('#cerca_film').val();

  $.ajax({
    'url':'https://api.themoviedb.org/3/search/movie',
    'method': 'GET',
    'data': {
      'api_key': '08ed7d443629b1584e6666060f8adca9',
      'query' : item_cercato,
      'language' : 'it-IT'
    },
    'success': function(data){
     var film = data.results;
     risultato_cerca_film(film);
    },
    'error': function(){
      alert('qualcosa è andato storto');
    }
  });
};
// chiamo l'api per la ricerca delle serie e gli passo il parametro inserito dall'utente
function chiamaSerie(){

  var item_cercato = $('#cerca_film').val();

  $.ajax({
    'url':'https://api.themoviedb.org/3/search/tv',
    'method': 'GET',
    'data': {
      'api_key': '08ed7d443629b1584e6666060f8adca9',
      'query' : item_cercato,
      'language': 'it-IT'
    },
    'success': function(data){
     var serie = data.results;
     risultato_cerca_serie(serie);
    },
    'error': function(){
      alert('qualcosa è andato storto');
    }
  });

};



// funzioni per l'elaborazione dei risultati delle chiamate Ajax
function risultato_cerca_film(film){
  for(var i =0; i < film.length; i++){

   var risultato_cerca = film[i];

   var titolo = risultato_cerca.title;
   var titolo_originale = risultato_cerca.original_title;
   var lingua= risultato_cerca.original_language;
   var voto = risultato_cerca.vote_average;
   var copertina = risultato_cerca.poster_path;

  // cerco di fare un controllo per le copertine non esistenti
   if(! risultato_cerca.poster_path){
     copertina = 'img/null.png';
   }else{
     copertina = url_loc + risultato_cerca.poster_path;
   }

   var variabili_finali={
     'titolo' :titolo,
     'titolo_originale': titolo_originale,
     'lingua': lingua,
     'voto': numeroStelle,
     'copertina' : copertina
   }

   var numeroStelle = stelleVoto(voto);

   var html_locandina = template_function(variabili_finali);

   $('.container_film').append(html_locandina);
 }
}

function risultato_cerca_serie(serie){

    for(var i =0; i < serie.length; i++){

     var risultato_cerca = serie[i];

     var titolo = risultato_cerca.name;
     var titolo_originale = risultato_cerca.original_name;
     var lingua= risultato_cerca.original_language;
     var voto = risultato_cerca.vote_average;


     var variabili_finali={
       'titolo' :titolo,
       'titolo_originale': titolo_originale,
       'lingua': lingua,
       'voto': numeroStelle
     }

     var numeroStelle = stelleVoto(voto);

     var html_locandina = template_function(variabili_finali);

     $('.container_film').append(html_locandina);
   }
  }

  // funzione per l'inserimento delle stelle
  function stelleVoto(numero){
    var stelle = Math.ceil(numero)/2;
    var arrayStelle =[]

    for (var i = 0; i < 5; i++) {
      if(i < stelle){
        arrayStelle.push('<i class="fas fa-star"></i>')
      }else{
        arrayStelle.push('<i class="far fa-star"></i>')
      }
    }
    return arrayStelle.join(' ')
}

});
