Pools = new Mongo.Collection("pools");


if (Meteor.isClient) {
  Template.body.helpers({
    pools:function(){
      return Pools.find({});
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
