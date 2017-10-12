window[appName].controller('calender',function($scope,$rootscope){
$scope.toaday=new Date();



//  function TableController(){
//    var c=this,
//        fecha=new Date(),
//        dias=[31,28,31,30,31,30,31,31,30,31,30,31],
//        meses=['Enero', 'Febrero','Marzo','Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
//    ;
//    c.mes_actual=fecha.getMonth();
//    c.mes_nombre=meses[c.mes_actual];
//    c.anio=fecha.getFullYear();
//    c.hoy=fecha.getDate();
//    var primero_de_mes=new Date(fecha.getFullYear(), c.mes_actual,1);
//    c.primer_dia_mes=primero_de_mes.getDay();
//    var num_semanas =Math.floor((dias[c.mes_actual]+fecha.getDay())/7);
//    dias[1]+=CheckLeapYear(c.anio)?1:0;
//
//    c.semanas=[];
//    dia_numero=1;
//    for(i=0; i<num_semanas; i++){
//      c.semanas[i]=[];
//      for(j=0; j<7; j++){
//        if(i==0 && j<c.primer_dia_mes){ // Primera semana del mes, incompleta
//          c.semanas[i][j]="";
//        }else{
//          if(dia_numero<=dias[c.mes_actual]){
//            c.semanas[i][j]=dia_numero;
//            dia_numero++;
//          }
//        }
//      }// end for dias semana
//    }// end for semanas
//
//    function CheckLeapYear(year){
//      return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
//    }
//
//
//  }
//})();
//
//})
})