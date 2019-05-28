// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:  1. Titolo 2. Titolo Originale 3. Lingua 4. Voto

// Milestone 2: Trasformiamo il numero da 1 a 10 decimale in un numero intero da 1 a 5, così da permetterci di stampare a schermo un numero di stelle piene che vanno da 1 a 5, lasciando le restanti vuote (troviamo le icone in FontAwesome). Arrotondiamo sempre per eccesso all’unità successiva, non gestiamo icone mezze piene (o mezze vuote :P)  Trasformiamo poi la stringa statica della lingua in una vera e propria bandiera della nazione corrispondente, gestendo il caso in cui non abbiamo la bandiera della nazione ritornata dall’API (le flag non ci sono in FontAwesome).
//
// Allarghiamo poi la ricerca anche alle serie tv. Con la stessa azione di ricerca dovremo prendere sia i film che corrispondono alla query, sia le serie tv, stando attenti ad avere alla fine dei valori simili (le serie e i film hanno campi nel JSON di risposta diversi, simili ma non sempre identici) Qui un esempio di chiamata per le serie tv: https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d&la

$(document).ready(function(){
  // preparo il template handlebars

  // salvo il mio template in una variabile
  var template_html = $('#template_netflix').html();
  // passo al metodo compile di handlebars  il mio template html
  var template_function = Handlebars.compile(template_html);


  // var api_base = 'https://api.themoviedb.org/3';

  $('#bottone_ricerca').click(function(){
    $('.container_film').empty();
    var item_cercato = $('#cerca_film').val();

    chiamaFilm(item_cercato);

    chiamaSerie(item_cercato);
    //reset input
    $('#cerca_film').val('');
  });


// carico l'api per la ricerca del film e creo una funzione
function chiamaFilm(testo){
  $.ajax({
    'url':'https://api.themoviedb.org/3/search/movie',
    'method': 'GET',
    'data': {
      'api_key': '08ed7d443629b1584e6666060f8adca9',
      'query' : testo
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
function chiamaSerie(testo){
  $.ajax({
    'url':'https://api.themoviedb.org/3/search/tv',
    'method': 'GET',
    'data': {
      'api_key': '08ed7d443629b1584e6666060f8adca9',
      'query' : testo
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



function risultato_cerca_film(film){
  for(var i =0; i < film.length; i++){

   var risultato_cerca = film[i];

   var titolo = risultato_cerca.title;
   var titolo_originale = risultato_cerca.original_title;
   var lingua= risultato_cerca.original_language;
   var voto = risultato_cerca.vote_average;


   var variabili_finali={
     'titolo' :titolo,
     'titolo_originale': titolo_originale,
     'lingua': lingua,
     'voto': voto
   }
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
       'voto': voto
     }

     var html_locandina = template_function(variabili_finali);

     $('.container_film').append(html_locandina);
   }
  }
});
