var roleUpgrader = require('role.upgrader');

var roleWheelbarrow = {

    /** @param {Creep} creep **/
    //TODO: When colony is dead and no enemies in sight, refill spawner+extensions as priority
    run: function(creep) {
        var SurplusEnergyBaseline = 120000
        
            var EnemyLoc = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var priorityTargets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER ||
                    structure.structureType == STRUCTURE_SPAWN ||
                    structure.structureType == STRUCTURE_EXTENSION ||
                    structure.structureType == STRUCTURE_CONTAINER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
                }
            })
            var storagecontainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (r) => r.structureType == STRUCTURE_STORAGE &&
                r.store[RESOURCE_ENERGY] > 0
            });
            var storagestructure = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                }
            })
            var targets = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 350 ||
                    structure.structureType == STRUCTURE_TOWER) && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 190
                    }
            });

        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.working = true
        }
        if(creep.store.getUsedCapacity() === 0) {
            creep.memory.working = false
        }
	    if(creep.memory.role === "wheelbarrow" && creep.memory.working === false) {
	        var droppedres = creep.room.find(FIND_DROPPED_RESOURCES)
	        var storagecontainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (r) => r.structureType == STRUCTURE_STORAGE &&
                       r.store[RESOURCE_ENERGY] > 0
            });
            const closestcontainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                       i.store[RESOURCE_ENERGY] > 500
            });

	        if (creep.memory.working == false) {
	            if (storagecontainer.store.getUsedCapacity(RESOURCE_ENERGY) > SurplusEnergyBaseline && !EnemyLoc && priorityTargets) {
	                if (creep.withdraw(storagecontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    creep.moveTo(storagecontainer,{reusePath: 10})
	                }
	            }
	            //console.log("wheelbarrow debuggery")
	            if (EnemyLoc) {
	                console.log("Battle Storage")
	                if (creep.withdraw(storagecontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	                    //debug
	                    creep.moveTo(storagecontainer)
	                }
	            }
	       	    if (!EnemyLoc && creep.pickup(droppedres[0]) == ERR_NOT_IN_RANGE && !priorityTargets || storagecontainer.store.getUsedCapacity(RESOURCE_ENERGY > SurplusEnergyBaseline)) {
	           // console.log("no storage avail")
	                creep.moveTo(droppedres[0], {reusePath: 10})
	            }
         }
	   }
        if (EnemyLoc && creep.memory.working == true) {
            var DefenseStructures = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.store.getFreeCapacity(RESOURCE_ENERGY > 100) ||
                    structure.structureType == STRUCTURE_EXTENSION && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0)}})
            if(creep.transfer(DefenseStructures, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(DefenseStructures)
                console.log("Wheelbarrows Defending.")
            }            
        }
            
        
    

        else {
            if(priorityTargets && creep.memory.working == true && !EnemyLoc) {
                if(creep.transfer(priorityTargets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(priorityTargets, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            if(targets && !priorityTargets && creep.memory.working == true && !EnemyLoc) {
                if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets, {reusePath: 10}, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
           if (!targets && !priorityTargets && creep.memory.working == true && !EnemyLoc) {
               console.log("verify wheelbarrows")
               //wheelbarrows should transfer to storage now
               if (creep.transfer(storagestructure[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storagestructure[0])
                }
            }
        }
	}
};

module.exports = roleWheelbarrow;