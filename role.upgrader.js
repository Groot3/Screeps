var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            //creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        //creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            var droppedres = creep.room.find(FIND_DROPPED_RESOURCES)
            const closestcontainer = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (i) => i.structureType == STRUCTURE_CONTAINER &&
                       i.store[RESOURCE_ENERGY] > 500
                       //checks to see if any containers have more than 500 energy, takes from them later
            });
	       
            if (creep.withdraw(closestcontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	            //console.log("TRying to pick from storage check wheelbarrows")
	            //debug
	            creep.moveTo(closestcontainer)
            }
            if(creep.pickup(droppedres[0]) == ERR_NOT_IN_RANGE && (!creep.withdraw(closestcontainer) == ERR_NOT_IN_RANGE)) {
                //console.log("getting dropped res")
                creep.moveTo(droppedres[0])
            };
            if(droppedres.length == 0 && creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
	}
};

module.exports = roleUpgrader;