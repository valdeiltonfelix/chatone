import React, { StrictMode, useState  } from 'react';
import ReactDOM from 'react-dom/client';
const domNode =document.getElementById('sessao_main');



document.getElementById('histcultura').addEventListener("click",function() {
   if(desmontar){
      root.unmount(document.getElementById('sessao_main')); 
      root    =ReactDOM.createRoot(domNode)
      root.render(<HistoriaEcultura nomeModulo={'História e Cultura'} 
      execBuscaEvento={'buscahistoriaecultura'}
      isLoaded={false}></HistoriaEcultura>);

   }else{
      root.render(<HistoriaEcultura nomeModulo={'História e Cultura'} 
      execBuscaEvento={'buscahistoriaecultura'}
      isLoaded={false}></HistoriaEcultura>);
      desmontar=true;
   }
   
})

document.getElementById('avoregeneologica').addEventListener("click",function(e) {
   
   if(desmontar){
      root.unmount(document.getElementById('sessao_main'));
      root    =ReactDOM.createRoot(domNode)
      root.render(<HistoriaEcultura nomeModulo={'Árvore genealógica'}
                                  execBuscaEvento={'buscaarvoregenealogica'}
                                  isLoaded={false}></HistoriaEcultura>);

   }else{
    root.render(<HistoriaEcultura nomeModulo={'Árvore genealógica'}
                                  execBuscaEvento={'buscaarvoregenealogica'}
                                  isLoaded={false}></HistoriaEcultura>);
    desmontar=true;
   }
  
});


document.getElementById('bancodesementes').addEventListener("click",function(e) {
   
    if(desmontar){
      root.unmount(document.getElementById('sessao_main'));
      root    =ReactDOM.createRoot(domNode)
      root.render(<HistoriaEcultura nomeModulo={'Banco de sementes'} 
                                 execBuscaEvento={'bancosementes'}
                           isLoaded={false} ></HistoriaEcultura>);
     }else{

       root.render(<HistoriaEcultura nomeModulo={'Banco de sementes'} 
                                 execBuscaEvento={'bancosementes'}
                           isLoaded={false} ></HistoriaEcultura>);
      desmontar=true;
   }
     
});

const SpinComponete = () => {
  return (
    <div className="overlay-wrapper" id="spin1">
      <div className="overlay">
         <i className="fas fa-3x fa-sync-alt fa-spin"></i>
         <div className="text-bold pt-2">Loading...</div>
      </div>
   </div>
  );
};

class HistoriaEcultura extends React.Component {

    constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: this.props.isLoaded,
      items: [],
      selectedValue:"",
      aldeias:"",
      isLoadedSpin:false,
      DataTable:null,
      DataTableInit:false,
      nomeModulo:""
    };
  }



componentDidMount() {
 const formData = {
 exec:"buscaAldeia",
};

 fetch("php/buscas.php",{
    method: "POST",
 headers: {
     'Content-Type': 'application/x-www-form-urlencoded'
  },
    body:JSON.stringify(formData)

 }).then(res => res.json()).then(
        (result) => {
          
      if(result.status!=200){
            Swal.fire({
           icon: "error",
           text: result.menssagem,
         });

        this.setState({
               isLoaded: true
          });
           
        }else{

         this.setState({
            isLoaded: true,
            items: result.data
            });
           }
        
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )


  }

  componentWillUnmount() {
   
  }

componentDidUpdate(prevProps, prevState) {
  

if (this.state.DataTableInit==false) {

this.state.DataTable=$('#numregistro').DataTable({
  lengthMenu: [ 5, 10,20,30,40,50],
   scrollY: 150,
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
this.state.DataTableInit=true

}

  }

  processar(event){
    event.preventDefault(); 
    this.state.selectedValue =$("#select_1 option:selected").val();
    const buscaModelo = {
    exec:this.props.execBuscaEvento,
    idaldeia:this.state.selectedValue,
    nomealdeia:$("#select_1 option:selected").text()
   };

this.setState({isLoadedSpin: true});
fetch("php/buscas.php",{
    method: "POST",
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
     },
    body:JSON.stringify(buscaModelo)

 }).then(res => res.json()).then(
        (result) => {
         
         this.state.DataTable.rows().remove().draw();
          var dt1=[];
          var linhaTable=[];
         if(result.data!=undefined){
         result.data.forEach(function(value,indx){
            var elemento=value.split("/");
                dt1=[indx,
               elemento[3],
              `<button type="button" onclick="salvadocumento('${value}');" class="btn btn-outline-info btn-block btn-sm">
                                    <i class="fa fa-save"></i> Salvar</button>`]
            linhaTable.push(dt1);
         })
         }else{
            Swal.fire({
           icon: "info",
           text: result.menssagem,
         });
         }
      
         this.state.DataTable.rows.add(linhaTable).draw();
         this.setState({isLoadedSpin: false});
        },(error) => {

         Swal.fire({
           icon: "error",
           text: "Erro ao tentar buscar arquivos",
         });

          this.setState({isLoadedSpin: false});
          
        });
   
  }

  render() {
    const { error, items } = this.state;
    const {isLoaded} = this.state;
    const { valorselect}             = this.state;
    const {isLoadedSpin}             = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {

    return <div className="overlay-wrapper" id="spin1">
      <div className="overlay">
         <i className="fas fa-3x fa-sync-alt fa-spin"></i>
         <div className="text-bold pt-2">Loading...</div>
      </div>
   </div>

    } else {
     
    return (
  
  <section className="content" id="formaldeiahistoria">

   <div className="container-fluid">
    {isLoadedSpin && <SpinComponete/>}
      <div className="row">
         <div className="col-md-12">
            <div className="card card-info">
               <div className="card-header" >
                  <h3 className="card-title">{this.props.nomeModulo} </h3>
               </div>

               <form className="form-horizontal">
                  <div className="card-body">
                     <div className="form-group">
                        <label>Escolha uma aldeia</label>
                        <select className="custom-select"  name="valorselect" id="select_1" onChange={this.handleSelectChange} >
                           {items.map(item => (
                               <option  key={item.id} value={item.id}> {item.nome}</option>
                           ))

                           }
                        </select>
                     </div>
                  </div>
                  <div className="col-md-12">

                     <div className="card">
                        <div className="card-header">
                           <h3 className="card-title">Arquivo aldeia</h3>
                        </div>
                        <div className="card-body">
                           <table className="table table-bordered table-hover" id="numregistro">
                              <thead>
                                 <tr>
                                    <th className="text-center">id aldeia</th>
                                    <th className="text-center">Arquivo</th>
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
                     <button  className="btn btn-info" onClick={this.processar.bind(this)}> Visualizar </button>   
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
 );
  }
}}


export default HistoriaEcultura;

