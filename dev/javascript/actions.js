// cors-anywhere used to bypass the cross origin limitation
var url = "http://cors-anywhere.herokuapp.com/https://morning-tundra-64741.herokuapp.com/users",
	actualPage = 0,
	totalPages,
	displayPage,
	totalEntries;

// Consulta / generación de html del listado
function listUsers(params){
	var jqxhrUsers = $.ajax({
		url: url + params,
		success: function(data){
			
			// Consulta de headers devueltos para implementar paginación
			displayPage = parseInt(jqxhrUsers.getResponseHeader('Pagination-Page')) + 1;
			totalEntries = jqxhrUsers.getResponseHeader('Pagination-Total');
			totalPages =  totalEntries/ jqxhrUsers.getResponseHeader('Pagination-Size');

			var htmlContent = '<ul>';
			
			// Listado de usuarios
			for (var i = 0; i < data.length; i++) {
				htmlContent += '<li><a href="#" data-id="' + data.indexOf(data[i]) + '">' + data[i].name + '</a></li>';
			}

			htmlContent += '</ul>';
			$('.inner-container').html(htmlContent); // Incorporación de contenido en el DOM

			// Impresión de paginación
			$('#pagination').html( 'Page ' + displayPage + ' of ' + totalPages );

			// Listener para clics a nombres de usuarios
			$('.inner-container').on('click', 'a', function(e){

				e.preventDefault();
				actualId = $(this).data('id');
				$('.address-city').html( data[actualId].address.city );
				$('.address-country').html( data[actualId].address.country );
				$('.geo-lat').html( data[actualId].address.geo.lat );
				$('.geo-long').html( data[actualId].address.geo.lng );
				$('.address-state').html( data[actualId].address.state );
				$('.address-zipcode').html( data[actualId].address.zipcode );
				$('.address-street').html( data[actualId].address.streetA + '<br>' + data[actualId].address.streetB + '<br>' + data[actualId].address.streetC + '<br>' + data[actualId].address.streetD );
				$('.company-bs').html( data[actualId].company.bs );
				$('.company-catchphrase').html( data[actualId].company.catchPhrase );
				$('.company-name').html( data[actualId].company.name );
				$('.personal-email').html( data[actualId].email );
				$('.personal-name').html( data[actualId].name );
				$('.personal-phone').html( data[actualId].phone );
				$('.personal-username').html( data[actualId].username );
				$('.data-personal').data('username', data[actualId].username);
				$('.personal-website').html( data[actualId].website );

				$('.data-posts div').html('');
				$('.data-history div').html('');
				$('.over-wrppr').show();
			});
		}
	});
} // listUsers END

// Consulta / generación de html de historial de posts y transacciones
function listPosts(theUser, listingType){
	var jqxhrPosts = $.ajax({
		url: url + theUser,
		success: function(data){
			var	postsHtml = '',
				historyHtml = '';
			for (var j = 0; j < data.length; j++) {
				console.log(data[j]);
				if (listingType == 'posts') {
					postsHtml += '<div class="log-entry">';
					postsHtml += '<span class="data-label">Paragraph</span>';
					postsHtml += '<span class="posts-paragraph">' + data[j].paragraph + '</span>';
					postsHtml += '<span class="data-label">Sentence</span>';
					postsHtml += '<span class="posts-sentence">' + data[j].sentence + '</span>';
					postsHtml += '<span class="data-label">Sentences</span>';
					postsHtml += '<span class="posts-sentences">' + data[j].sentences + '</span>';
					postsHtml += '<span class="data-label">Words</span>';
					postsHtml += '<span class="posts-words">' + data[j].words + '</span>';
					postsHtml += '</div>';
				} else {
					historyHtml += '<div class="log-entry">';
					historyHtml += '<span class="data-label">Account</span>';
					historyHtml += '<span class="history-account">' + data[j].account + '</span>';
					historyHtml += '<span class="data-label">Amount</span>';
					historyHtml += '<span class="history-amount">' + data[j].amount + '</span>';
					historyHtml += '<span class="data-label">Business</span>';
					historyHtml += '<span class="history-business">' + data[j].business + '</span>';
					historyHtml += '<span class="data-label">Date</span>';
					historyHtml += '<span class="history-date">' + data[j].date + '</span>';
					historyHtml += '<span class="data-label">Name</span>';
					historyHtml += '<span class="history-name">' + data[j].name + '</span>';
					historyHtml += '<span class="data-label">Type</span>';
					historyHtml += '<span class="history-type">' + data[j].type + '</span>';
					historyHtml += '</div>';
				}
			}
			$('.data-posts div').html(postsHtml);
			$('.data-history div').html(historyHtml);
		}
	});
} // list log entries END

// Listener para botones de logs
$('.data-posts, .data-history').on('click', 'a', function(e){
	e.preventDefault();
	consultQuery = '/' + $('.data-personal').data('username') + '/' +  $(this).data('type');
	listPosts(consultQuery, $(this).data('type'));
});

// Inicialización del listado
listUsers("?page=" + actualPage);

// Avanzar / retroceder navegación
$('.navig').on('click', 'a', function(e){
	e.preventDefault();

	if ( $(this).data('order') == 'next' && actualPage < totalPages - 1 ) {
		actualPage++;
		listUsers("?page=" + actualPage);
	} else if ( $(this).data('order') == 'prev' && actualPage > 0 ){
		actualPage--;
		listUsers("?page=" + actualPage);
	}

})

// Ocultar overlay
$(document).on('keyup', function(e){
	if ( e.keyCode == 27 ){
		$('.over-wrppr').hide();
	}
});
// Botón de cierre para overlay
$('.over-close').on('click', function(){
	$('.over-wrppr').hide();
});