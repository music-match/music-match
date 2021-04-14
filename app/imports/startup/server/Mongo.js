import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profiles';
import { MusicInterests } from '../../api/profile/MusicInterests';
import { Jams } from '../../api/profile/Jams';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

function addProfile(data) {
  console.log(`  Adding: ${data.name} (${data.email})`);
  Profiles.collection.insert(data);
}

function addInterest(data) {
  console.log(`  Adding: ${data.type} (${data.email})`);
  MusicInterests.collection.insert(data);
}

function addJam(data) {
  console.log(`  Adding: ${data.title} (${data.email})`);
  Jams.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
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
