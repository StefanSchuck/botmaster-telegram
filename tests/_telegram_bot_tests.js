// 'use strict';

// const app = require('express')();
// const assert = require('chai').assert;
// const expect = require('chai').expect;
// const request = require('request-promise');
// require('chai').should();
// const _ = require('lodash');
// const TelegramBot = require('../../lib').botTypes.TelegramBot;
// const config = require('../config.js');

// const credentials = config.telegramCredentials;
// const userId = config.telegramUserId;


// describe('Telegram Bot tests', function() {
//   const telegramSettings = {
//     credentials,
//     webhookEndpoint: '/telegram/webhook'
//   };


//   describe('telegram #__formatUpdate(rawUpdate)', function() {

//     this.retries(2);

//     // TODO at some point:
//     // Not too sure these filIds will work with other bots than mine because
//     // I made the request. Ask someone to verify
//     const attachmentsInfo = {
//       "audio": {
//         "duration": 233,
//         "mime_type": "audio/mp3",
//         "title": "40 Day Dream",
//         "performer": "Edward Sharpe & The Magnetic Zeros",
//         "file_id": "BQADBAADCAADut_4CSHXUotBWaigAg",
//         "file_size": 7808710
//       },
//       "voice": {
//         "duration": 2,
//         "mime_type": "audio/ogg",
//         "file_id": "AwADBAADCQADut_4CQn6ffh8-EVYAg",
//         "file_size": 6012
//       },
//       "document": {
//         "file_name": "blog.pdf",
//         "mime_type": "application/pdf",
//         "file_id": "BQADBAADBQAD04oDCB9FixWtNqdSAg",
//         "file_size": 70304
//       },
//       "photo": [
//         {
//           "file_id": "AgADBAADqqcxG9OKAwilfpTK31YbwTF3WBkABKBSDnZ0jJU9z6UBAAEC",
//           "file_size": 1476,
//           "width": 90,
//           "height": 68
//         },
//         {
//           "file_id": "AgADBAADqqcxG9OKAwilfpTK31YbwTF3WBkABFp82PuMHFIJ0KUBAAEC",
//           "file_size": 9401,
//           "width": 320,
//           "height": 241
//         },
//         {
//           "file_id": "AgADBAADqqcxG9OKAwilfpTK31YbwTF3WBkABB-k8xVfo6xyzqUBAAEC",
//           "file_size": 13354,
//           "width": 450,
//           "height": 339
//         }
//       ],
//       "sticker": {
//         "width": 354,
//         "height": 512,
//         "emoji": "😑",
//         "thumb": {
//           "file_id": "AAQEABMGbGMwAARSZNANBNBQvBkxAQABAg",
//           "file_size": 2176,
//           "width": 62,
//           "height": 90
//         },
//         "file_id": "BQADBAADOQADyIsGAAEn0bvAsmlYhAI",
//         "file_size": 34714
//       },
//       "video": {
//         "duration": 1,
//         "width": 480,
//         "height": 720,
//         "thumb": {
//           "file_id": "AAQEABMRumQZAASITqE_NHfHG9sFAAIC",
//           "file_size": 1793,
//           "width": 59,
//           "height": 90
//         },
//         "file_id": "BAADBAADCgADut_4CRewGd5pvd37Ag",
//         "file_size": 68673
//       },
//       "location": {
//         "latitude": 51.524498,
//         "longitude": -0.076595
//       },
//       "venue": {
//         "location": {
//           "latitude": 51.524498,
//           "longitude": -0.076595
//         },
//         "title": "The Albion",
//         "address": "2-4 Boundary St",
//         "foursquare_id": "4aeffc1ef964a5206eda21e3"
//       }
//     };

//     it('should format a text message update in the expected way', function() {
//       const rawUpdate = incomingTextUpdate;

//       return bot.__formatUpdate(rawUpdate)
//       .then(function(update) {
//         const expectedUpdate = {
//           raw: rawUpdate,
//           sender: {
//             id: rawUpdate.message.from.id
//           },
//           recipient: {
//             id: config.telegramBotId
//           },
//           timestamp: rawUpdate.message.date * 1000,
//           message: {
//             mid: rawUpdate.update_id,
//             seq: rawUpdate.message.message_id,
//             text: rawUpdate.message.text
//           }
//         };
//         expect(update).to.deep.equal(expectedUpdate);
//       });
//     });

//     it('should format a telegram audio message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.audio = attachmentsInfo.audio;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         const expectedUpdate = {
//           raw: rawUpdate,
//           sender: {
//             id: rawUpdate.message.from.id
//           },
//           recipient: {
//             id: config.telegramBotId
//           },
//           timestamp: rawUpdate.message.date * 1000,
//           message: {
//             mid: rawUpdate.update_id,
//             seq: rawUpdate.message.message_id,
//             attachments: [
//               {
//                 type: 'audio',
//                 payload: {
//                   url: update.message.attachments[0].payload.url
//                 }
//               }
//             ]
//           }
//         };

//         expect(update).to.deep.equal(expectedUpdate);
//       });
//     });

//     it('should format a telegram voice message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.voice = attachmentsInfo.voice;

//       // the format is already agreed upon in the other tests. What we are
//       // testing here is just this really
//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.attachments[0].type).to.equal('audio');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a telegram document message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.document = attachmentsInfo.document;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.attachments[0].type).to.equal('file');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a telegram photo message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.photo = attachmentsInfo.photo;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.attachments[0].type).to.equal('image');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a telegram sticker message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.sticker = attachmentsInfo.sticker;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.attachments[0].type).to.equal('image');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a telegram video message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.video = attachmentsInfo.video;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.attachments[0].type).to.equal('video');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a telegram image with text message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(incomingTextUpdate);
//       rawUpdate.message.photo = attachmentsInfo.photo;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         expect(update.message.text).to.equal("Party & Bullshit");
//         expect(update.message.attachments[0].type).to.equal('image');
//         expect(update.message.attachments[0].payload.url).to.not.equal(undefined);
//       });
//     });

//     it('should format a location message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.location = attachmentsInfo.location;

//       const lat = attachmentsInfo.location.latitude;
//       const long = attachmentsInfo.location.longitude;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         const expectedUpdate = {
//           raw: rawUpdate,
//           sender: {
//             id: rawUpdate.message.from.id
//           },
//           recipient: {
//             id: config.telegramBotId
//           },
//           timestamp: rawUpdate.message.date * 1000,
//           message: {
//             mid: rawUpdate.update_id,
//             seq: rawUpdate.message.message_id,
//             attachments: [
//               {
//                 title: 'Pinned Location',
//                 url: `https://maps.google.com/?q=${lat},${long}`,
//                 type: 'location',
//                 payload: {
//                   coordinates: {
//                     lat: lat,
//                     long: long
//                   }
//                 }
//               }
//             ]
//           }
//         };
//         expect(update).to.deep.equal(expectedUpdate);
//       });
//     });

//     it('should format a venue message update in the expected way', function() {
//       const rawUpdate = _.cloneDeep(baseIncomingUpdate);
//       rawUpdate.message.location = attachmentsInfo.location;
//       rawUpdate.message.venue = attachmentsInfo.venue;

//       const lat = attachmentsInfo.venue.location.latitude;
//       const long = attachmentsInfo.venue.location.longitude;

//       return bot.__formatUpdate(rawUpdate)

//       .then(function(update) {
//         const expectedUpdate = {
//           raw: rawUpdate,
//           sender: {
//             id: rawUpdate.message.from.id
//           },
//           recipient: {
//             id: config.telegramBotId
//           },
//           timestamp: rawUpdate.message.date * 1000,
//           message: {
//             mid: rawUpdate.update_id,
//             seq: rawUpdate.message.message_id,
//             attachments: [
//               {
//                 title: 'The Albion',
//                 url: `https://maps.google.com/?q=${lat},${long}`,
//                 type: 'location',
//                 payload: {
//                   coordinates: {
//                     lat: lat,
//                     long: long
//                   }
//                 }
//               }
//             ]
//           }
//         };
//         expect(update).to.deep.equal(expectedUpdate);
//       });
//     });
//   // end of describe(formatUpdate)
//   });

//   after(function(done) {
//     this.retries(4);
//     server.close(function() { done(); });
//   });
// });
