import React, { StrictMode } from 'react';
$('#processar').click(function(e){
   e.preventDefault();
});
function processar(){
 $("#spin1").show();
  $.ajax({
  method: "POST",
  url: "php/buscas.php",
  data: { exec:"bancosementes",
          idaldeia: $("#select_1 option:selected").val(),
          nomealdeia:$("#select_1 option:selected").text()
        },
}).done(function( dados ) { 

$("#spin1").hide();
     if(/{"menssagem"/.test(dados)){
        var result=JSON.parse(dados);
        alert(result.menssagem)
      }else{
        var bj=JSON.parse(dados);
        var html1=[];
        var  dt1 =[]

 bj.data.forEach(function(element,index){
       dt1=[index,
            element.split("/")[3],
              `<button type="button" onclick="salvadocumento('${element}');" class="btn btn-outline-info btn-block btn-sm">
                                    <i class="fa fa-save"></i> Salvar</button>`]
      html1.push(dt1);
  });

 $('#table-bancosementes').DataTable({
  lengthMenu: [ 5, 10,20,30,40,50],
   data :html1,
   scrollY: 300,
   ordering:  false,
   language: {
         info:           "Mostrando _START_ de _END_ de um total _TOTAL_ ",
         infoEmpty:      "Mostrando _START_ de _END_ entradas",
         emptyTable:     "Nenhum dado encontrado",
         paginate: {
            first: '«',
            previous: '‹',
            next: '›',
            last: '»'
        },
        "lengthMenu":     "Mostrando _MENU_ Entradas",
        aria: {
            paginate: {
                first: 'First',
                previous: 'Previous',
                next: 'Next',
                last: 'Last'
            }
        },
    },
  

 });
 
  //$("#body1").html(html1);
        //  frameborder="0" width="100%" height="500px">`) 
        // $('#modal-default').modal('show'); 
  }
})

}


document.getElementById('bancodesementes').addEventListener("click",function() {
 $( "#table-bancosementes" ).find("tr:gt(0)").remove();

var campoaldeia;
$.ajax({
  method: "GET",
  url: "php/buscas.php",
  data: { exec: "buscaAldeia"},
}).done(function( dados ) { 
    campoaldeia=JSON.parse(dados);
    var innerHTM="";
       campoaldeia.map((valor,index)=>{
       innerHTM+=`<option value="${valor.id}"> ${valor.nome}</option>`
    });

    $("#select_1").html(innerHTM);
    $("#spin1").css("display", "none");


})

root.render(
  <section className="content" id="formaldeiahistoria">


   <div className="overlay-wrapper" id="spin1">
      <div className="overlay">
         <i className="fas fa-3x fa-sync-alt fa-spin"></i>
         <div className="text-bold pt-2">Loading...</div>
      </div>
   </div>

   <div className="container-fluid">
      <div className="row">

         <div className="col-md-12">
            <div className="card card-info">
               <div className="card-header" >
                  <h3 className="card-title">Banco de sementes</h3>
               </div>

               <form className="form-horizontal" >
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
                  <div className="col-md-12">

                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">Arquivo aldeia</h3>
                        </div>
                        <div className="card-body">
                           <table className="table table-bordered table-hover" id="table-bancosementes">
                              <thead>
                                 <tr>
                                    <th className="text-center">id aldeia</th>
                                    <th className="text-center">Nome aldeia</th>
                                    <th className="text-center">Baixar arquivo</th>
                                 </tr>
                              </thead>
                              <tbody id="body1">

                              </tbody>
                           </table>
                        </div>

                     </div>

                  </div>
                  <div className="card-footer">
                     <button type="button" id="processar" className="btn btn-info" onClick={processar}> Visualizar </button>   
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
});