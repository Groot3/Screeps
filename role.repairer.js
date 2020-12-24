var roleRepairer = {
    
    run: function(creep) {
        if (creep.store.getFreeCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = true
        }
        
        if (creep.store.getUsedCapacity(RESOURCE_ENERGY) == 0) {
            creep.memory.working = false
        }
        
        if (creep.memory.working == true) {
            var repairTargets = (creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => {
                    return (s.hits < s.hitsMax && s.hits < 1550000 //&&
                    //structure.hitsMax &&
                    //s.structureType != STRUCTURE_WALL //&& 
                    //structure.structureType != STRUCTURE_RAMPART
                    )
                }
            }))
            
            if (creep.repair(repairTargets) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(repairTargets)
            }
        }
        
        if (creep.memory.working == false) {
            var sourcecontainer = (creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == (STRUCTURE_CONTAINER))
                }
                
            }))
            
            if (creep.withdraw(sourcecontainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sourcecontainer)
            }
            
            if (sourcecontainer = null) {
                var droppedres = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES)
                if (creep.pickup(droppedres) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(droppedres)
                }
            }
        }
    }
}
module.exports = roleRepairer