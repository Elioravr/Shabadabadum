var updateItemsFields = function (fields) {
  if (fields.items) {
    fields.itemsCount = fields.items.length;
    fields.itemsLeft = getItemsLeft(fields.items);
  }
};

var getItemsLeft = function (items) {
  var left = _.filter(items, function (item) {
    return item.isDone === false;
  });

  return left.length;
};

// Same as the short version of returning cursor
Meteor.publish('lists', function () {
  var self = this;
  var handle = findListsForHomeServer(this.userId).observeChanges({
    added: function (id, fields) {
      updateItemsFields(fields);
      self.added('lists', id, fields);
    },
    changed: function (id, fields) {
      updateItemsFields(fields);
      self.changed('lists', id, fields);
    },
    removed: function (id) {
      self.removed('lists', id);
    }
  });
  self.ready();

  self.onStop(function () {
    handle.stop();
  })
});

Meteor.publish('list', findList);

Meteor.publish('listForChat', findListForChat);

Meteor.methods({
  insertNewItem: function (listId, item, message) {
    Lists.update(listId,
                 { $push: { 'items': item, 'messages': message } });
  },
  insertNewMessage: function (listId, message) {
    Lists.update(listId,
                 { $push: { 'messages': message } });
  },
  markAsDone: function (listId, createdAt, isDone) {
    Lists.update({ _id : listId , 'items.createdAt' : createdAt },
                 { $set : { 'items.$.isDone' : isDone } });
  },
  removeItemFromList: function (listId, createdAt, message) {
    Lists.update(listId,
                 { $pull: { 'items': { createdAt: createdAt } } });
    Lists.update(listId,
                 { $push: { 'messages': message } });
  },
  removeUserFromList: function (listId, userId, userFullName) {
    var newMessage = {
      content:   userFullName + ' has left the list.',
      createdAt: new Date()
    };

    Lists.update(listId,
                 { $pull: { 'users': { _id: userId } } });
    Lists.update(listId,
                 { $push: { 'messages': newMessage } });
  }
});


// // Reactivly update the 'lists' minimongo at the client
// // for the record set that match the query
// Meteor.publish('lists', function () {
//   return Lists.find({ public: true });
// });

// // We pupulate the 'lists' minimongo at the client
// // with the single query record set
// // THIS will not be updated if somthing added to the Lists collection
// Meteor.publish('lists', function () {
//   var self = this

//   var lists = Lists.find({ public: true }).forEach(function (list) {
//     self.added('lists', list._id, list);
//   });
//   self.ready();
// });



// // Same as the short version of returning cursor
// Meteor.publish('lists', function () {
//   var self = this

//   var handle = Lists.find({ public: true }).observeChanges({
//     added: function (id, fields) {
//       // self.added('itemsCount', id, fields);
//       self.added('lists', id, fields);
//     },
//     changed: function (id, fields) {
//       self.changed('lists', id, fields);
//     },
//     removed: function (id) {
//       self.removed('lists', id);
//     }
//   });
//   self.ready();

//   self.onStop(function () {
//     handle.stop();
//   })
// });




// Lists.find({ public: true })
