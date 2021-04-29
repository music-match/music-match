import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import swal from 'sweetalert';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { FeaturedJam } from '../../api/profile/FeaturedJam';
import { LikedJams } from '../../api/profile/LikedJams';
import { Jams } from '../../api/profile/Jams';

/**
 * In Bowfolios, insecure mode is enabled, so it is possible to update the server's Mongo database by making
 * changes to the client MiniMongo DB.
 *
 * However, updating the database via client-side calls can be inconvenient for two reasons:
 *   1. If we want to update multiple collections, we need to use nested callbacks in order to trap errors, leading to
 *      the dreaded "callback hell".
 *   2. For update and removal, we can only provide a docID as the selector on the client-side, making bulk deletes
 *      hard to do via nested callbacks.
 *
 * A simple solution to this is to use Meteor Methods (https://guide.meteor.com/methods.html). By defining and
 * calling a Meteor Method, we can specify code to be run on the server-side but invoked by clients. We don't need
 * to use callbacks, because any errors are thrown and sent back to the client. Also, the restrictions on the selectors
 * are removed for server-side code.
 *
 * Meteor Methods are commonly introduced as the necessary approach to updating the DB once the insecure package is
 * removed, and that is definitely true, but Bowfolios illustrates that they can simplify your code significantly
 * even when prototyping. It turns out that we can remove insecure mode if we want, as we use Meteor methods to update
 * the database.
 *
 * Note that it would be even better if each method was wrapped in a transaction so that the database would be rolled
 * back if any of the intermediate updates failed. Left as an exercise to the reader.
 */

const updateProfileMethod = 'Profiles.update';
const addFeaturedJam = 'FeaturedJam.add';
const addProfile = 'Profile.add';
const updateLikedJam = 'LikedJam.update';

/**
 * The server-side Profiles.update Meteor Method is called by the client-side Home page after pushing the update button.
 * Its purpose is to update the Profiles, ProfilesInterests, and ProfilesProjects collections to reflect the
 * updated situation specified by the user.
 */
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
      swal('Error', 'Profile already exists! Please return to Home Page.', 'error');
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
