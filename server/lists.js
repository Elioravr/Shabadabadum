Meteor.publish("lists", function () {
  return Lists.find({ "users._id": this.userId });
});

Meteor.publish("list", function (listId) {
  return Lists.find({ "_id": listId });
});
