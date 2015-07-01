var door = require('./doorbell');
exports.doorbell = new door.bell(124, 'mykey');
exports.calendar = require('./calendar');