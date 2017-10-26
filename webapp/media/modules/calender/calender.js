window[appName].controller('calender',function($scope,$rootScope){




    var vm = this;


    vm.calendarView = 'month';
    vm.viewDate = new Date();


     $scope.boxShow = false;
    $scope.eventcreate=function(){
     $scope.boxShow = true;
}


//    vm.cellIsOpen = false;
//    $scope.eventcreate=function(){
//    console.log('hiiii');
//
//    }






  });