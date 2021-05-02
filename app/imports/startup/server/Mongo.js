import { Meteor } from 'meteor/meteor';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { Jams } from '../../api/profile/Jams';
import { AllInterests } from '../../api/interests/AllInterests';
import { FeaturedJam } from '../../api/profile/FeaturedJam';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addProfile(data) {
  console.log(`  Adding: ${data.name} (${data.email})`);
  Profiles.collection.insert(data);
}

function addInterest(data) {
  MusicInterests.collection.insert(data);
}

function addJam(data) {
  Jams.collection.insert(data);
}

function addFeaturedJam(data) {
  FeaturedJam.collection.insert(data);
}

function addPossibleInterest(data) {
  AllInterests.collection.insert(data);
}

if (Profiles.collection.find().count() === 0) {
  if (Meteor.settings.defaultProfiles) {
    console.log('Creating default profiles.');
    Meteor.settings.defaultProfiles.map(data => addProfile(data));
  }
}

if (MusicInterests.collection.find().count() === 0) {
  if (Meteor.settings.defaultMusicInterests) {
    console.log('Creating default Music Interests.');
    Meteor.settings.defaultMusicInterests.map(data => addInterest(data));
  }
}

if (Jams.collection.find().count() === 0) {
  if (Meteor.settings.defaultJams) {
    console.log('Creating default Jams.');
    Meteor.settings.defaultJams.map(data => addJam(data));
  }
}

if (FeaturedJam.collection.find().count() === 0) {
  if (Meteor.settings.defaultFeaturedJam) {
    console.log('Creating default Featured Jam.');
    Meteor.settings.defaultFeaturedJam.map(data => addFeaturedJam(data));
  }
}

if (AllInterests.collection.find().count() === 0) {
  if (Meteor.settings.allInterests) {
    console.log('Creating list of Possible interests.');
    Meteor.settings.allInterests.map(data => addPossibleInterest(data));
  }
}
