var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleWheelbarrow = require('role.wheelbarrow');
var roleRepairer = require('role.repairer');
var roleRemoteHarvester = require('role.remoteharvester')
var roleRemoteHauler = require('role.remotehauler')
var roleRemoteClaimer = require('role.claimer')
var roleRobinhood = require('role.robinhood')
const roleScout = require('role.scout')
const radar = require('radar')
const roleBrute = require('role.brute')
module.exports.loop = function () {

radar() // Scans for enemy hostiles and enemy hostile structures

var towers = _.filter(Game.structures, (s) => s.structureType == STRUCTURE_TOWER);
    
    for (let tower of towers) {
    //Automated Safemode adapted from Scott's version.
    //TODO: check for hostiles to safemode without a tower already built.
    var hostiles = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS, { filter: function (i) { return i.owner.username != 'Invader' } });
        if(hostiles != null) {
            Game.rooms[name].controller.activateSafeMode();
            console.log("Oh Shit Sum1 Hur!");
        }
    
    //
    var EnemyLoc = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    var PriorityWalls = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.hits < 200000 && s.structureType != STRUCTURE_WALL// && s.structureType != STRUCTURE_ROAD
    });
    var DamagedStruc = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL //&& s.structureType != STRUCTURE_ROAD
    });
    if(EnemyLoc) {
        tower.attack(EnemyLoc)
    }
    if ((PriorityWalls) && (tower.energy > 800) && (!EnemyLoc)){
        tower.repair(PriorityWalls)
    }
//    if ((DamagedStruc) && (tower.energy > 900)){
//        tower.repair(DamagedStruc)
//    }
};


  for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    console.log('Harvesters: ' + harvesters.length);

    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Builders: ' + builders.length);

    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    console.log('Upgraders: ' + upgraders.length);
    
    var wheelbarrows = _.filter(Game.creeps, (creep) => creep.memory.role == 'wheelbarrow');
    console.log('Wheelbarrows: ' + wheelbarrows.length);
    
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == 'repairer');

    var otherHarv = _.filter(Game.creeps, (creep) => creep.memory.secondary == true);
    console.log('OtherHarv: ' + otherHarv.length);
    
    var minerOne = _.filter(Game.creeps, (creep) => creep.memory.minerone == true);
    console.log("Minerone: " + minerOne.length)
    
    var remoteHarvesterE12N5 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remoteharvester');

    var remoteHarvesterE13N4 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remoteharvester');
    
    var remoteHarvesterE12N3 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E12N3' && creep.memory.role == 'remoteharvester');
    
    var remoteHaulerE12N5 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remotehauler')
    
    var remoteHaulerE13N4 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remotehauler')

    var remoteHaulerE12N3 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E12N3' && creep.memory.role == 'remotehauler')
    
    var remoteClaimerE13N4 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'remoteclaimer')

    var remoteClaimerE12N5 = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E12N5' && creep.memory.role == 'remoteclaimer')

    var robinhood = _.filter(Game.creeps, (creep) => creep.memory.role == 'robinhood')
    
    let scout = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E13N4' && creep.memory.role == 'scout')
    
    let scouto = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E15N3' && creep.memory.role == 'scouto')
    
    let brute = _.filter(Game.creeps, (creep) => creep.memory.role == 'brute')
    
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
    }

    if(harvesters.length < 2) {
        if(otherHarv.length < 1) {
            console.log('Spawning OtherHarvester')
            //some ting wrong aka not recognizing filter, fix later.
            var newName ='OtherHarvester' + Game.time;
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE], newName,
                {memory: {role: 'harvester', secondary:true}})
            }
        if(wheelbarrows.length == 0){
            //fail clause
        var newName ='Wheelbarrow' + Game.time
        console.log('Spawning new wheelbarrow: ' + newName);
        Game.spawns['Delta'].spawnCreep([MOVE,CARRY,CARRY,CARRY], newName,
            {memory: {role: 'wheelbarrow'}})
        }    
        if(minerOne.length < 1) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE], newName,
            {memory: {role: 'harvester', minerone:true}});
            }
    }
    
    if(wheelbarrows.length < 5) {
        var newName ='Wheelbarrow' + Game.time
        console.log('Spawning new wheelbarrow: ' + newName);
        Game.spawns['Delta'].spawnCreep([MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY], newName,
            {memory: {role: 'wheelbarrow'}})
    }

    if(builders.length < 0) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}}, {directions:TOP});
    }
    
        if(upgraders.length < 1 && wheelbarrows.length > 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,], newName,
            {memory: {role: 'upgrader'}});
        }
        
        if(repairers.length < 1 && wheelbarrows.length > 1) {
            var newName = 'Repairer' + Game.time;
            console.log('Spawning new repairer: ' + newName);
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role:'repairer'}})
        }
        
        if(remoteHarvesterE12N5.length < 1 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Harvester ' + Game.time;
            console.log('Spawning new remoteharvester: ' + newName);
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role:'remoteharvester', targetLoc:'E12N5'}})
        }
        
        if(remoteHarvesterE13N4.length < 0 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Harvester ' + Game.time;
            console.log('Spawning new remoteharvester: ' + newName);
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role:'remoteharvester', targetLoc:'E13N4'}})
        }
        if(remoteHarvesterE12N3.length < 0 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Harvester ' + Game.time;
            console.log('Spawning new remoteharvester: ' + newName);
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
                {memory: {role:'remoteharvester', targetLoc:'E12N3'}})
        }
        if(remoteHaulerE12N5.length < 1 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Hauler E12 N5 ' + Game.time;
            console.log("Spawning new" + newName)
            Game.spawns['Delta'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role:'remotehauler', targetLoc:'E12N5', homeLoc:'E12N4'}})
        }
        if(remoteHaulerE13N4.length < 0 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Hauler E13 N4 ' + Game.time;
            console.log("Spawning new" + newName)
            Game.spawns['Delta'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role:'remotehauler', targetLoc:'E13N4', homeLoc:'E12N4'}})
        }
        if(remoteHaulerE12N3.length < 0 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Hauler E12 N3 ' + Game.time;
            console.log("Spawning new" + newName)
            Game.spawns['Delta'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName, 
                {memory: {role:'remotehauler', targetLoc:'E12N3', homeLoc:'E12N4'}})
        }
        if(remoteClaimerE13N4.length < 0 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Claimer E13 N4' + Game.time
            console.log('Spawning new ' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE,CLAIM], newName,
                {memory: {role:'remoteclaimer', targetLoc:'E13N4'}})
        }
        if(remoteClaimerE12N5.length < 1 && wheelbarrows.length > 1 && inSightHostiles.length == 0) {
            var newName = 'Remote Claimer E12 N5' + Game.time
            console.log('Spawning new ' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE,CLAIM], newName,
                {memory: {role:'remoteclaimer', targetLoc:'E12N5'}})
        }
        if(robinhood.length < 1 && inSightHostiles.length > 0) {
            var newName = 'Robinhood ' + Game.time
            console.log('Spawning new ' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE,MOVE,MOVE,MOVE,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK,RANGED_ATTACK], newName,
                {memory: {role:'robinhood'}})
        }
        if(scout.length < 0) {
            let newName = 'Scout' + Game.time
            console.log('Spawning new' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE], newName,
                {memory: {role:'scout', targetLoc:'E13N4'}})
        }
        if(scouto.length < 0) {
            let newName = 'Scout' + Game.time
            console.log('Spawning new' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE,MOVE,TOUGH,TOUGH,TOUGH,TOUGH], newName,
                {memory: {role:'scouto', targetLoc:'E15N3'}})
        }
        if(brute.length < 0) {
            let newName = 'Brute' + Game.time
            console.log('Spawning new ' + newName)
            Game.spawns['Delta'].spawnCreep([MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,ATTACK,TOUGH,MOVE,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH], newName,
                {memory: {role:'brute'}})
        }
    if(Game.spawns['Delta'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Delta'].spawning.name];
        Game.spawns['Delta'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Delta'].pos.x + 1,
            Game.spawns['Delta'].pos.y,
            {align: 'left', opacity: 0.8});
    }

}