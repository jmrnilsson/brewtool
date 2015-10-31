var moment = require('moment');
var extend = require('extend')

function newGuid() {
  function seed() {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  }
  return seed() + seed() + '-' + seed() + '-' + seed() + '-' + seed() + '-' + seed() + seed() + seed();
}

function Memento(obj){
	var self = this;
	self.session = newGuid();
	self.timestamp = moment.utc().valueOf();

	['session', 'timestamp'].forEach(function(prop){
		if (obj.hasOwnProperty(prop)){
			throw new Error('Memento can not be extended with property ' + prop);
		}
	});
	extend(this, obj);
}

exports.utils = {
	guid: {'new': newGuid},
	Memento: Memento
};
