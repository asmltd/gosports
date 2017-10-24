window[appName].controller('calender',function($scope,$rootScope,$modal,$uibModal,$modalInstance){




    var vm = this;


    vm.calendarView = 'month';
    vm.viewDate = new Date();



    vm.cellIsOpen = false;

    $scope.eventcreate=function(){
    console.log('hiiiiii');

/*$scope.modalInstance=$modal.open({
        templateUrl: 'popup.html',
        scope:$scope
    });*/





    }





  });



