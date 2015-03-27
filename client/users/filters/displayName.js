angular.module("familyst").filter('displayName', function () {
  return function (user) {
    if (!user)
      return;
    if (user.profile && user.profile.name)
      return user.profile.name;
    else if (user.profile && user.profile.firstName)
      return user.profile.firstName + " " + user.profile.lastName
    else if (user.emails)
      return user.emails[0].address;
    else
      return user;
  }
});
