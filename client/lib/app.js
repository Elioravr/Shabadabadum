angular.module('familyst', [
  'angular-meteor',
  'ui.router',
  'ionic']); //,
  // 'ngCordova.plugins.datePicker']);

function onReady() {
  angular.bootstrap(document, ['familyst']);
}

if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
}
else {
  angular.element(document).ready(onReady);
}
