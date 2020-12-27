var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWheelbarrow = require('role.wheelbarrow');
var roleRepairer = require('role.repairer');
var roleRemoteHarvester = require('role.remoteharvester')
var roleRemoteHauler = require('role.remotehauler')
var roleRemoteClaimer = require('role.claimer')
var roleRobinhood = require('role.robinhood')

function roleHandler() {
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'wheelbarrow') {
            roleWheelbarrow.run(creep);
        }
        if(creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if(creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remoteharvester') {
            roleRemoteHarvester.run(creep,"E12N5");
        }
        if(creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remoteharvester') {
            roleRemoteHarvester.run(creep,"E13N4");
        }
        if(creep.memory.targetLoc == 'E12N3' && creep.memory.role == 'remoteharvester') {
            roleRemoteHarvester.run(creep,"E12N3");
        }
        if(creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remotehauler') {
            roleRemoteHauler.run(creep,'E12N5','E12N4')
        }
        if(creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remotehauler') {
            roleRemoteHauler.run(creep,'E13N4','E12N4')
        }
        if(creep.memory.targetLoc == 'E12N3' && creep.memory.role == 'remotehauler') {
            roleRemoteHauler.run(creep,'E12N3','E12N4')
        }
        if(creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remoteclaimer') {
            roleRemoteClaimer.run(creep,'E13N4')
        }
        if(creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remoteclaimer') {
            roleRemoteClaimer.run(creep,'E12N5')
        }
        if(creep.memory.role == 'robinhood') {
            roleRobinhood.run(creep)
        }
        if(creep.memory.role == 'scout' &&  creep.memory.targetLoc == 'E13N4' ) {
            roleScout.run(creep,'E13N4')
        }
        if(creep.memory.role == 'scouto' &&  creep.memory.targetLoc == 'E15N3' ) {
            roleScout.run(creep,'E15N3')
        }
        if(creep.memory.role == 'brute') {
            roleBrute.run(creep, 'E15N3')
        }
        if(creep.memory.role == 'claimer') {
            roleRemoteClaimer.run(creep)
        }
    }
}

module.exports = roleHandler