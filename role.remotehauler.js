var roleRemoteHauler = {
    run: function(creep, goToRoom, HomeLoc) {
        if(creep.store.getFreeCapacity() === 0) {
            creep.memory.working = false
        }
        if(creep.store.getUsedCapacity() === 0) {
            creep.memory.working = true
        }

        if (creep.memory.working == true && creep.room.name != goToRoom) {
            var exitDirection = creep.room.findExitTo(goToRoom)
            var nearestExit = creep.pos.findClosestByRange(exitDirection)
            creep.moveTo(nearestExit, {reusePath: 50})
        }


	    if(creep.memory.working == false && creep.room.name != HomeLoc) {
	        creep.moveTo(new RoomPosition(0, 0, HomeLoc), {reusePath: 50})
	    }
	     
	    if (creep.memory.working == false && creep.room.name == HomeLoc) {
	       var storagecontainer = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                filter: (r) => r.structureType == STRUCTURE_STORAGE &&
                r.store[RESOURCE_ENERGY] > 0
            });
            var storagestructure = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_STORAGE)
                }
            })
            
            if (creep.transfer(storagestructure[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(storagestructure[0])
            }
	    }
	    
	   if (creep.memory.working == true && creep.room.name == goToRoom) {
	       var droppedres = creep.room.find(FIND_DROPPED_RESOURCES)
	       if (creep.pickup(droppedres[0]) == ERR_NOT_IN_RANGE) {
	           creep.moveTo(droppedres[0], {reusePath: 50})
	       }
	       //var fullcontainers =
	   }
	}
}


module.exports = roleRemoteHauler;