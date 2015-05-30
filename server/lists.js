Meteor.publish("lists", function () {
  lists = Lists.find({ "users._id": this.userId },
                     { fields: {
                         'name': 1,
                         'users.profile': 1,
                         'items.isDone': 1,
                         'updatedAt': 1
                       }
                     });

  return lists;
});

Meteor.publish("list", function (listId) {
  return Lists.find({ "_id": listId },
                    { fields: {
                        'name': 1,
                        'items.title': 1,
                        'items.isDone': 1,
                        'items.createdAt': 1,
                        'items.profile': 1
                      }
                    });
});

Meteor.publish("listForChat", function (listId) {
  return Lists.find({_id: listId}, { fields: { 'messages': 1 } });
});
