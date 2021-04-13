import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Profiles } from '../../api/profile/Profiles';

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
