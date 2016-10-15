angular.module('transferApp', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/', {
        templateUrl: 'frontend/templates/main.html'
      }).
      when('/transferencia', {
        templateUrl: 'frontend/templates/transferencia.html',
        controller: 'TransferenciaCtrl'
      }).
      otherwise({redirectTo: '/'});
}]);