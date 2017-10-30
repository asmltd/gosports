window[appName].controller('calender',function($scope,$rootScope,http){


    function processTheData(method, action, url, parameter) {

        http.Requests(method, url, parameter).success(function (response) {


            switch (action) {

                case 'events':
                    vm.events = [];
                    for(i=0;i<response.length;i++){
                        var event = {};
                        event['title'] = response[i]['event'];
                        event['startsAt'] = response[i]['event_date_time'];
                        vm.events.push(event);

                    }
                    break;




            }
        });
    }

    processTheData("get", "events", "/api/calendar/all/", {});

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