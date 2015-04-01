Lists = new Mongo.Collection("lists");

var Schemas = {};

Schemas.List = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    max: 200
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      if (this.isInsert) {
        return new Date;
      } else if (this.isUpsert) {
        return {$setOnInsert: new Date};
      } else {
        this.unset();
      }
    }
  },
  updatedAt: {
    type: Date,
    autoValue: function() {
      if (this.isUpdate) {
        return new Date();
      }
    },
    denyInsert: true,
    optional: true
  },
  items: {
    type: [Object],
    optional: true,
    autoValue: function () {
      if (this.isUpdate) {
        // return this.field("content");
      }
      else {
        return [];
      }
    }
  },
  'items.$.title': {
    type: String
  },
  'items.$.isDone': {
    type: Boolean
  }
});

Lists.attachSchema(Schemas.List);

Lists.allow({
  insert: function (userId, item) {
    // return userId && item.owner === userId;
    return true;
  },
  update: function (userId, item, fields, modifier) {
    // if (userId !== item.owner)
    //   return false;

    // return true;
    return true;
  },
  remove: function (userId, item) {
    // if (userId !== item.owner)
    //   return false;

    // return true;
    return true;
  }
});
