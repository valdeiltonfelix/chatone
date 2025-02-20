 import React, { StrictMode } from 'react';
 import ReactDOM from 'react-dom/client';
 const domNode =document.getElementById('sessao_main');

function processar(){
 $("#spin1").show();
  $.ajax({
  method: "POST",
  url: "php/gerarrelatorioindigina.php",
  data: { idaldeia: $("#select_1 option:selected").val()},
}).done(function( dados ) { 
$("#spin1").hide();
     if(/{"menssagem"/.test(dados)){
        var result=JSON.parse(dados);
       Swal.fire({
           icon: "info",
           text:result.menssagem,
         });
      }else{
        $(".modal-body").html(`<embed src="reports/relatorioindigina.pdf"
         frameborder="0" width="100%" height="500px">`) 
        $('#modal-default').modal('show'); 
      }
})

}


document.getElementById('rela').addEventListener("click",function() {


var campoaldeia;
$.ajax({
  method: "GET",
  url: "php/buscas.php",
  data:{
        exec:"buscaAldeia",
      },
  headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
     },

}).done(function( dados ) { 


if(isJson( dados)){



  var verifica=JSON.parse(dados);
  if(verifica.status==200){
    campoaldeia=JSON.parse(dados);
    var innerHTM="";
       campoaldeia.data.map((valor,index)=>{
       innerHTM+=`<option value="${valor.id}"> ${valor.nome}</option>`
    });
    $("#select_1").html(innerHTM);
    $("#spin1").css("display", "none");
  }else{
   dados=JSON.parse(dados);
   if(dados.status==500){
     Swal.fire({
           icon: "error",
           text:dados.menssagem,
         });
   }else{ 
      Swal.fire({
           icon: "info",
           text:dados.menssagem,
         });
   }
        
  $("#spin1").css("display", "none");
  
  }
}else{

     Swal.fire({
           icon: "error",
           text:"Erro ao tentar converte valores",
  });

  $("#spin1").css("display", "none");
}


})

if(desmontar){
      root.unmount(document.getElementById('sessao_main')); 
      root    =ReactDOM.createRoot(domNode)
      root.render(
        <section className="content" id="formaldeiarelatorios">

            <div className="overlay-wrapper" id="spin1">
                              <div className="overlay">
                                <i className="fas fa-3x fa-sync-alt fa-spin"></i>
                                <div className="text-bold pt-2">Loading...</div>
                              </div>
          </div>
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-10">
                    <div className="card card-info">
                      <div className="card-header" >
                        <h3 className="card-title">Relatório indigina</h3>
                      </div>
                      <form className="form-horizontal">
                      
                        <div className="card-body">
                                <div className="form-group">
                                <label>Escolha uma aldeia</label>
                                <select className="custom-select" id="select_1">
                                   <option disabled defaultValue>
                                    Selecione
                                   </option>
                                      

                                </select>
                              </div>
                        </div>

                         <div className="card-footer">
                          <button  type="button"  className="btn btn-info" onClick={processar}>Processar relatório</button>
                       
                        </div>
                
                      </form>
                    </div>
           
                    </div>
                    </div>
                  </div>

        <div  id="modal-default" className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h4 className="modal-title">Relatório</h4>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      
                    </div>
                    <div className="modal-footer justify-content-between">
                      <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
                    </div>
                  </div>
                </div>
              </div>


            </section>
         


          )


    }else{

 root.render(
<section className="content" id="formaldeiarelatorios">

    <div className="overlay-wrapper" id="spin1">
                      <div className="overlay">
                        <i className="fas fa-3x fa-sync-alt fa-spin"></i>
                        <div className="text-bold pt-2">Loading...</div>
                      </div>
  </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <div className="card card-info">
              <div className="card-header" >
                <h3 className="card-title">Relatório indigina</h3>
              </div>
              <form className="form-horizontal">
              
                <div className="card-body">
                        <div className="form-group">
                        <label>Escolha uma aldeia</label>
                        <select className="custom-select" id="select_1">
                           <option disabled defaultValue>
                            Selecione
                           </option>
                              

                        </select>
                      </div>
                </div>

                 <div className="card-footer">
                  <button  type="button"  className="btn btn-info" onClick={processar}>Processar relatório</button>
               
                </div>
        
              </form>
            </div>
   
            </div>
            </div>
          </div>

<div  id="modal-default" className="modal fade bd-example-modal-xl" tabIndex="-1" role="dialog" aria-labelledby="myExtraLargeModalLabel" aria-hidden="true">
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Relatório</h4>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              
            </div>
            <div className="modal-footer justify-content-between">
              <button type="button" className="btn btn-default" data-dismiss="modal">Fechar</button>
            </div>
          </div>
        </div>
      </div>


    </section>
 


  )
   desmontar=true;
}


});






