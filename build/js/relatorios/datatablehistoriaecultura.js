 datatable=$('#numregistro').DataTable({
  lengthMenu: [ 5, 10,20,30,40,50],
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


