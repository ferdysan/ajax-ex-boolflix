// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:  1. Titolo 2. Titolo Originale 3. Lingua 4. Voto

$(document).ready(function(){
  // preparo il template handlebars

  // salvo il mio template in una variabile
  var template_html = $('#template_netflix').html();
  // passo al metodo compile di handlebars  il mio template html
  var template_function = Handlebars.compile(template_html);


  // var api_base = 'https://api.themoviedb.org/3';

  $('#bottone_ricerca').click(function(){

    var item_cercato = $('#cerca_film').val();


   // carico l'api per la ricerca del film

    $.ajax({
      'url':'https://api.themoviedb.org/3/search/movie',
      'method': 'GET',
      'data': {
        'api_key': '08ed7d443629b1584e6666060f8adca9',
        'query' : item_cercato
      },
      'success': function(data){
       var film = data.results;
       risultato_cerca(film);
      },
      'error': function(){
        alert('qualcosa è andato storto');
      }
    });

    //reset input
    $('#cerca_film').val('');
  });


  function risultato_cerca(film){
    for(var i =0; i < film.length; i++){
     var risultato_cerca = film[i];
     console.log(risultato_cerca);

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
});
