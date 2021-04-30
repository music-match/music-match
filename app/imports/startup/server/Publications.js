import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { Jams } from '../../api/profile/Jams';
import { AllInterests } from '../../api/interests/AllInterests';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { LikedJams } from '../../api/profile/LikedJams';
import { Comments } from '../../api/comment/Comments';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(MusicInterests.userPublicationName, () => MusicInterests.collection.find());

Meteor.publish(Jams.userPublicationName, () => Jams.collection.find());

Meteor.publish(FeaturedJam.userPublicationName, () => FeaturedJam.collection.find());

Meteor.publish(AllInterests.userPublicationName, () => AllInterests.collection.find());

Meteor.publish(LikedJams.userPublicationName, () => LikedJams.collection.find());

Meteor.publish(Comments.userPublicationName, () => Comments.collection.find());

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(Profiles.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Profiles.collection.find();
  }
  return this.ready();
});

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
