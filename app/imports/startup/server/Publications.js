import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { Jams } from '../../api/profile/Jams';
import { AllInterests } from '../../api/interests/AllInterests';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { LikedJams } from '../../api/profile/LikedJams';
import { Comments } from '../../api/comment/Comments';

Meteor.publish(Profiles.userPublicationName, () => Profiles.collection.find());

Meteor.publish(MusicInterests.userPublicationName, () => MusicInterests.collection.find());

Meteor.publish(Jams.userPublicationName, () => Jams.collection.find());

Meteor.publish(FeaturedJam.userPublicationName, () => FeaturedJam.collection.find());

Meteor.publish(AllInterests.userPublicationName, () => AllInterests.collection.find());

Meteor.publish(LikedJams.userPublicationName, () => LikedJams.collection.find());

Meteor.publish(Comments.userPublicationName, () => Comments.collection.find());

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
