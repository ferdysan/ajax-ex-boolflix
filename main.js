// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:  1. Titolo 2. Titolo Originale 3. Lingua 4. Voto

$(document).ready(function(){
  // preparo il template handlebars

  // salvo il mio template in una variabile
  var template_html = $('#template_netflix').html();
  // passo al metodo compile di handlebars  il mio template html
  var template_fucntion = Handlebars.compile(template_html);


  // var api_base = 'https://api.themoviedb.org/3';

  $('#bottone_ricerca').click(function(){

    var item_cercato = $('#cerca_film').val();

    console.log(item_cercato);
   // carico l'api per la ricerca del film

    $.ajax({
      'url':'https://api.themoviedb.org/3/search/movie',
      'method': 'GET',
      'data': {
        'api_key': '08ed7d443629b1584e6666060f8adca9',
        'query' : item_cercato
      },
      'success': function(data){
        var risultato_cerca = data.response;
        console.log(risultato_cerca);
      },
      'error': function(){
        alert('qualcosa è andato storto');
      }
    });

    //reset input
    $('#cerca_film').val('');




  });

});
