Meteor.publish("lists", function () {
  return Lists.find({ "users._id": this.userId });
});
