angular.module('familyst', [
  'angular-meteor',
  'ui.router',
  'ionic']); //,
  // 'ngCordova.plugins.datePicker']);

AppUpdate.reload.preventReload();

Tracker.autorun(function () {
  if (AppUpdate.reload.hasNewUpdate()) {
    $(".update-prompt").fadeIn(function () {
      AppUpdate.reload.manualReload();
    });
  }
});

function onReady() {
  angular.bootstrap(document, ['familyst']);
}

document.addEventListener("deviceready", onDeviceReady, false);
function onDeviceReady() {
  if (localStorage.getItem("Meteor.loginToken") === null &&
      typeof(cordova) !== "undefined" &&
      typeof(cordova.file["Meteor.loginToken"]) !== "undefined") {
    localStorage.setItem("Meteor.loginToken", cordova.file["Meteor.loginToken"]);
    localStorage.setItem("Meteor.loginTokenExpires", cordova.file["Meteor.loginTokenExpires"]);
    localStorage.setItem("userId", cordova.file["userId"]);
  }
}

if (Meteor.isCordova) {
  angular.element(document).on("deviceready", onReady);
}
else {
  angular.element(document).ready(onReady);
}
