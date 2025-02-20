

function salvadocumento(arquivo){
	$(".modal-body").html(`<embed src="${arquivo}" frameborder="0" width="100%" height="500px">`) 
  $('#modal-default').modal('show'); 
}


