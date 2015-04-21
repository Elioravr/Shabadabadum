Accounts.onCreateUser(function(options, user) {
  if (user.services.facebook) {
    options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
  }
  user.profile = options.profile;
  return user;
});

Meteor.publish("users", function () {
  return Users.find({}, {fields: {profile: 1}});
});

Meteor.publish("usersForNewListForm", function () {
  return Users.find({ "_id": { $ne: this.userId } });
});

Meteor.publishComposite('UsersForNewList', {
  find: function() {
    return Users.find({}, { _id: { $ne: Meteor.userId() } });
  },
  children: [
    {
      find: function(list) {
        return Meteor.users.find(
          { _id: { $in: list.users } },
          { fields: { profile: 1 } });
      }
    }
  ]
});
