import util from 'util';
import Pod from './pod';

var method = DropBoxPod.prototype;


function DropBoxPod(token) {
  Pod.apply(this, arguments);
}

//util.inherits(DropBoxPod, Pod);

method.createFolder = function(locationPath) {
   
};

method.createFile = function(locationPath,data) {
  
};

module.exports = DropBoxPod;