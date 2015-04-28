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
      } else if (this.isUpdate) {
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
  users: {
    type: [Object],
    optional: false
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
  messages: {
    type: [Object],
    optional: false,
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
  },
  'items.$.createdAt': {
    type: Date,
    optional: false
  },
  'items.$.profile': {
    type: Object,
    optional: true
  },
  'items.$.profile.firstName': {
    type: String,
    optional: true
  },
  'items.$.profile.lastName': {
    type: String,
    optional: true
  },
  'items.$.profile.name': {
    type: String,
    optional: true
  },
  'items.$.profile.picture': {
    type: String,
    optional: true
  },
  'users.$._id': {
    type: String
  },
  'users.$.profile': {
    type: Object
  },
  'users.$.profile.firstName': {
    type: String,
    optional: true
  },
  'users.$.profile.lastName': {
    type: String,
    optional: true
  },
  'users.$.profile.name': {
    type: String,
    optional: true
  },
  'users.$.profile.picture': {
    type: String,
    optional: true
  },
  'messages.$.content': {
    type: String
  },
  'messages.$.userId': {
    type: String,
    optional: true
  },
  'messages.$.createdAt': {
    type: Date,
    optional: false
  },
  'messages.$.profile': {
    type: Object,
    optional: true
  },
  'messages.$.profile.firstName': {
    type: String,
    optional: true
  },
  'messages.$.profile.lastName': {
    type: String,
    optional: true
  },
  'messages.$.profile.name': {
    type: String,
    optional: true
  },
  'messages.$.profile.picture': {
    type: String,
    optional: true
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
