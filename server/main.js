import { Meteor } from "meteor/meteor";
import {
  setMinimumBrowserVersions
} from "meteor/modern-browsers";

import "../imports/startup/server/fixtures.js";
import "../imports/startup/server/fixEmptyAttributes.js";
import "../imports/startup/server/fixTaskNumber.js";
import "../imports/startup/server/permissions.js";
import "../imports/startup/server/userPresence.js";
import "../imports/api/organizations/organizations.js";
import "../imports/api/organizations/server/publications.js";
import "../imports/api/projects/projects.js";
import "../imports/api/tasks/server/helpers.js";
import "../imports/api/tasks/server/methods.js";
import "../imports/api/tasks/server/publications.js";
import "../imports/api/projects/server/publications.js";
import "../imports/api/projects/server/methods.js";
import "../imports/api/permissions/permissions.js";
import "../imports/api/permissions/server/methods.js";
import "../imports/api/users/server/users.js";
import "../imports/api/users/server/sso.js";
import "../imports/api/users/server/emailTemplates.js";
import "../imports/api/users/server/publications.js";
import "../imports/api/users/avatars.js";
import "../imports/api/users/server/avatars.js";
import "../imports/api/projectGroups/projectGroups.js";
import "../imports/api/projectGroups/server/publications.js";
import "../imports/api/labels/labels.js";
import "../imports/api/labels/server/publications.js";
import "../imports/api/canvas/canvas.js";
import "../imports/api/canvas/server/methods.js";
import "../imports/api/canvas/server/publications.js";
import "../imports/api/healthReports/healthReports.js";
import "../imports/api/healthReports/server/methods.js";
import "../imports/api/events/events.js";
import "../imports/api/events/server/methods.js";
import "../imports/api/backgrounds/startup/server/fixtures.js";
import "../imports/api/dashboards/dashboards.js";

import "../imports/api/attachments/attachments.js";
import "../imports/api/attachments/server/methods.js";

import "../imports/api/bpmn/processDiagrams";
import "../imports/api/bpmn/server/publications";
import "../imports/api/bpmn/examples/examples";
import "../imports/api/bpmn/examples/server/methods";

import "../imports/api/notifications/notifications.js";
import "../imports/api/notifications/server/methods.js";

import "../imports/api/search/server/methods.js";

import "../imports/api/digests/digests.js";
import "../imports/api/digests/server/methods.js";
import "../imports/api/digests/server/jobs.js";

import "./apm.js";

if (Meteor.isServer) {
  Inject.rawBody("loader", Assets.getText("loader.html"));
}

setMinimumBrowserVersions({
  firefox: 61
}, "async import");

if (Meteor.isDevelopment) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
}

Accounts.config({
  forbidClientAccountCreation: true,
  sendVerificationEmail: true
});

Meteor.startup(() => {
  Meteor.call("organizations.fixOrphanProjectGroups");
});
