angular.module("familyst").filter('displayShortName', function () {
  return function (user) {
    if (!user)
      return;
    if (user.profile && user.profile.name) {
      firstName = user.profile.name.split(" ")[0];
      return firstName;
    }
    else if (user.profile && user.profile.firstName)
      return user.profile.firstName;
    else if (user.emails)
      return user.emails[0].address;
    else
      return user;
  }
});
