import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { LikedJams } from '../../api/profile/LikedJams';
import { Jams } from '../../api/profile/Jams';

const updateProfileMethod = 'Profiles.update';
const addFeaturedJam = 'FeaturedJam.add';
const addProfile = 'Profile.add';
const updateLikedJam = 'LikedJam.update';

Meteor.methods({
  'Profiles.update'({ email, name, address, image, goals, phone, interests, instruments, skill }) {
    Profiles.collection.update({ email }, { $set: { name, address, image, goals, phone, instruments, skill } });
    MusicInterests.collection.remove({ email: email });
    interests.map((interest) => MusicInterests.collection.insert({ email: email, type: interest }));
  },
});

Meteor.methods({
  'FeaturedJam.add'({ title, id, description, email }) {
    FeaturedJam.collection.remove({});
    FeaturedJam.collection.insert({ title: title, id: id, description: description, email: email });
  },
});

Meteor.methods({
  'Profile.add'({ name, address, image, goals, email, phone, instruments, skill, interests }) {
    const registeredEmails = _.pluck(Profiles.collection.find().fetch(), 'email');
    if (_.contains(registeredEmails, email)) {
      throw new Meteor.Error('Profile already exists! Redirecting to Home Page...');
    } else {
      Profiles.collection.insert({ name, address, image, goals, email, phone, instruments, skill });
      if (_.size(interests) > 0) {
        interests.map((interest) => MusicInterests.collection.insert({ email: email, type: interest }));
      }
    }
  },
});

Meteor.methods({
  'LikedJam.update'({ jamID, profileID, oldLikes }) {
    let likes = oldLikes;
    const myLikedJams = LikedJams.collection.find({ profileID: profileID }).fetch();
    const thisLikedJam = _.filter(myLikedJams, function (jam) { return jam.jamID === jamID; });
    if (_.size(thisLikedJam) === 0) {
      LikedJams.collection.insert({ profileID: profileID, jamID: jamID });
      likes++;
    } else {
      LikedJams.collection.remove({ profileID: profileID, jamID: jamID });
      likes--;
    }
    Jams.collection.update(jamID, { $set: { likes } });
  },
});

export { updateProfileMethod, addFeaturedJam, addProfile, updateLikedJam };
