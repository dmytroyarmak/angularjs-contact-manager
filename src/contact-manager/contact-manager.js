contactManagerHtppConfig.$inject = ['$httpProvider'];
export function contactManagerHtppConfig($httpProvider) {
  $httpProvider.defaults.withCredentials = true;
}

contactManagerRouteConfig.$inject = ['$routeProvider'];
export function contactManagerRouteConfig($routeProvider) {
  $routeProvider
    .otherwise('/contacts');
}
