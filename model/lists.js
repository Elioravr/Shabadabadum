Lists = new Mongo.Collection("lists");

var Schemas = {};

Schemas.List = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 200
    },
    createdAt: {
      type: Date
    }
});

Schemas.Item = new SimpleSchema({
    title: {
        type: String,
        label: "Title",
        max: 200
    },
    createdAt: {
      type: Date
    },
    is_done: {
      type: Boolean
    },
    list: {
      type: Schemas.List
    }
});

Lists.attachSchema(Schemas.List);
Items.attachSchema(Schemas.Item);

Lists.allow({
  insert: function (userId, item) {
    // return userId && item.owner === userId;
    return (true);
  },
  update: function (userId, item, fields, modifier) {
    // if (userId !== item.owner)
    //   return false;

    // return true;
    return (true);
  },
  remove: function (userId, item) {
    // if (userId !== item.owner)
    //   return false;

    // return true;
    return (true);
  }
});
