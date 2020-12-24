var roleLinkBunny = {
    run: function(creep, isShufflingEnergy, AssignedLinkID) {
        if (creep.store.getFreeCapacity == 0) {
            creep.memory.working = true
        }
        if (creep.store.getUsedCapacity == 0) {
            creep.memory.working = false
        }
        var closestContainer = 
        // fill in variable
        if (creep.memory.working = false && creep.withdraw(AssignedLinkID, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(AssignedLinkID)
        }
        
    }
}