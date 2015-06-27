/*
  answer: {
  pollId: pollId, (string)
  decision: decision (0 or 1)
  }
*/

polls = new Mongo.Collection("polls");
votes = new Mongo.Collection("votes");

    // vote: function(){
    //     Meteor.cookie.set('mx', 'here!');
    //     console.log(Meteor.cookie.get('mx'));
    //     Meteor.call('vote'); 
    // }

if (Meteor.isClient) {
 
    Template.body.helpers({
        polls:function(){
            return polls.find({});
        },
        isOpen: function(status){
            return status == "open"
        }
    });
    ReactiveTabs.createInterface({
        template: 'basicTabs',
        onChange: function (slug, template) {
            // This callback runs every time a tab changes.
            // The `template` instance is unique per {{#basicTabs}} block.
            console.log('[tabs] Tab has changed! Current tab:', slug);
            console.log('[tabs] Template instance calling onChange:', template);
        }
    });

    Template.body.helpers({
        tabs: function () {
            // Every tab object MUST have a name and a slug!
            return [
                { name: 'Open polls', slug: 'openpolls' },
                { name: 'Closed polls', slug: 'closedpolls' },
                { name: 'My polls', slug: 'mypolls', onRender: function(template) {
                    // This callback runs every time this specific tab's content renders.
                    // As with `onChange`, the `template` instance is unique per block helper.
                    alert("[tabs] Things has been rendered!");
                }}
            ];
        },
        activeTab: function () {
            // Use this optional helper to reactively set the active tab.
            // All you have to do is return the slug of the tab.

            // You can set this using an Iron Router param if you want--
            // or a Session variable, or any reactive value from anywhere.

            // If you don't provide an active tab, the first one is selected by default.
            // See the `advanced use` section below to learn about dynamic tabs.
            return Session.get('activeTab'); // Returns "people", "places", or "things".
        }
    });

    Template.voteForm.events({
        'submit form': function(event){
            event.preventDefault();
            console.log("Form submitted");

            var pollId = event.target.pollId.value;
            var decision = event.target.decision.value; 
            var visited = Meteor.cookie.get(pollId);
            console.log(visited);
            if (visited != null) {
                console.log("You voted!");
                return;
            }
            var vote = {
                pollId: pollId,
                decision: decision
            };
            console.log(vote);
            Meteor.cookie.set(pollId, 1);
            // vote(event.target.decision);
        }
    });

}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}

// server methods
Meteor.methods({
    vote: function (answer) {
        
        // // Make sure the user is logged in before inserting a task
        // if (! Meteor.userId()) {
        //   throw new Meteor.Error("not-authorized");
        // }
        
        // Tasks.insert({
        //   text: text,
        //   createdAt: new Date(),
        //   owner: Meteor.userId(),
        //   username: Meteor.user().username
        // });
    }
});
