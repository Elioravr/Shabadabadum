findListsForHomeServer = function (userId) {
  var lists = Lists.find({ 'users._id': userId },
                         { fields: {
                             'name': 1,
                             'users._id': 1,
                             'users.profile': 1,
                             'items': 1,
                             'updatedAt': 1
                         }

  });
  return lists;
};

findListsForHomeClient = function (userId) {
  var lists = Lists.find({ 'users._id': userId },
                         { fields: {
                             'name': 1,
                             'users._id': 1,
                             'users.profile': 1,
                             'itemsCount': 1,
                             'itemsLeft': 1,
                             'updatedAt': 1
                         }

  });
  return lists;
};

findList = function (listId) {
  return Lists.find({ '_id': listId },
                    { fields: {
                        'name': 1,
                        'messages': 1,
                        'items': 1
                      }
                    });
};

findListForChat = function (listId) {
  return Lists.find({_id: listId}, { fields: { 'messages': 1 } });
};
