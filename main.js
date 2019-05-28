// Milestone 1: Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film.
// Possiamo, cliccando il bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:  1. Titolo 2. Titolo Originale 3. Lingua 4. Voto



var api_base = 'https://api.themoviedb.org/3';

$('#bottone_ricerca').click(function(){

  var item_cercato = $('#cerca_film').val();

  //reset input
  $('#cerca_film').val(' ');

  $.ajax({
    'url':'https://api.themoviedb.org/3/search/movie',
    'method': 'GET',
    'data':{
      'api_key': '08ed7d443629b1584e6666060f8adca9',
      'query': item_cercato
    },
    'success': function(data){
      var item_cercato = data.response;
      console.log(item_cercato);
    },
    'error': function(){
      alert('qualcosa è andato storto');
    }
  });


  console.log(item_cercato);


});
