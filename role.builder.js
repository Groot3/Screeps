var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    
	    if(creep.store.getUsedCapacity() == 0) {
	        creep.memory.working = false
	    }
	    
	    if(creep.store.getFreeCapacity() == 0) {
	        creep.memory.working = true
	    }
	    
	    if(creep.store.getUsedCapacity() != 0 && creep.memory.working == true) {
          var targets = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
          var walls = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_WALL && structure.hits > 500000)
                }
            });
            
            if(creep.build(targets) == ERR_NOT_IN_RANGE) {
               creep.moveTo(targets), {visualizePathStyle: {stroke: '#ffaa00'}}}
               console.log('Finding Construction Sites / Moving to them')
//          if(targets.length == 0 && creep.repair(walls[0] == ERR_NOT_IN_RANGE) {
//                creep.moveTo(walls[0])
 //               }
            
        }
	    if(creep.store.getFreeCapacity() > 0 && creep.memory.working == false){
                var sources = creep.room.find(FIND_SOURCES);
                var droppedres = creep.room.find(FIND_DROPPED_RESOURCES)
                var storagecontainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
	                return (structure.structureType == STRUCTURE_CONTAINER && structure.store.getUsedCapacity > 0)
	            }})
	            if(creep.withdraw(storagecontainer[0]) == ERR_NOT_IN_RANGE){
	                creep.moveTo(storagecontainer[0])
	                }
	            
                if(creep.pickup(droppedres[0]) == ERR_NOT_IN_RANGE){
                    creep.moveTo(droppedres[0])
            };
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE && creep.pickup(droppedres[0]) == ERR_INVALID_TARGET) {
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}})
               }}
	}
};
module.exports = roleBuilder