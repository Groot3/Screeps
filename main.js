const radar = require('radar')
const spawnClaimer = require('spawn.claim')
const rolehandler = require('role.handler')
const clearMemory = require('clearmemory');
const spawnRemoteHarvester = require('./spawn.remoteharvester');
const spawnRemoteHauler = require('./spawn.remotehauler');

module.exports.loop = function () {

clearMemory() // Clears dead creeps from memory
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
    var PriorityWalls = tower.pos.findClosestByRange(FIND_STRUCTURES, {
        filter: (s) => s.hits < s.hitsMax && s.hits < 200000 && s.structureType != STRUCTURE_WALL// && s.structureType != STRUCTURE_ROAD
    });
    var DamagedStruc = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL //&& s.structureType != STRUCTURE_ROAD
    });
    if(inSightHostiles.length > 0) {
        tower.attack(inSightHostiles[0])
    }
    if ((PriorityWalls) && (tower.energy > 800) && (!inSightHostiles)){
        tower.repair(PriorityWalls)
    }
};
    
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

    var robinhood = _.filter(Game.creeps, (creep) => creep.memory.role == 'robinhood')
    
    let scout = _.filter(Game.creeps, (creep) => creep.memory.role == 'scout')
    
    let scouto = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == 'E15N3' && creep.memory.role == 'scouto')
    
    let brute = _.filter(Game.creeps, (creep) => creep.memory.role == 'brute')
    
    rolehandler() // The ugliest thing you've ever seen. Thrown into a function to work with refactoring spawn code
    // TODO: massive cleanup, make a real role handler?
    
    if(harvesters.length < 2) {
        if(otherHarv.length < 1) {
            console.log('Spawning OtherHarvester')
            //some ting wrong aka not recognizing filter, fix later.
            var newName ='OtherHarvester' + Game.time;
            Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE], newName,
                {memory: {role: 'harvester', secondary:true}})
            }
        if(wheelbarrows.length == 0){
            //fail clause, helps revive starved colonies in case that spawning logic breaks.
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

    if(builders.length < 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE], newName,
            {memory: {role: 'builder'}}, {directions:TOP});
    }
    
        if(upgraders.length < 1 && wheelbarrows.length > 2) {
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
        
        //TODO: Package together; or automate remote-ops. Requires more brainpower. Coming back to this.

        //spawnClaimer("E13N4")
        spawnClaimer("E12N3")
        spawnClaimer("E12N5")
        //spawnRemoteHarvester("E13N4")
        spawnRemoteHarvester("E12N3")
        spawnRemoteHarvester("E12N5")
        //spawnRemoteHauler("E13N4")
        spawnRemoteHauler("E12N3")
        spawnRemoteHauler("E12N5")


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
                {memory: {role:'scout', targetLoc:'E6N7'}})
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
            Game.spawns['Spawn2'].spawnCreep([MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH,MOVE,ATTACK,TOUGH,MOVE,TOUGH,MOVE,TOUGH,TOUGH,MOVE,TOUGH,TOUGH], newName,
                {memory: {role:'brute'}})
        }
}
