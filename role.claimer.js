var roleRemoteClaimer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        goToRoom = creep.memory.targetLoc
        if (creep.room.name != creep.memory.targetLoc) {
            console.log(goToRoom)
            var exitDirection = creep.room.findExitTo(goToRoom)
            var nearestExit = creep.pos.findClosestByPath(exitDirection)
            creep.moveTo(nearestExit)
        }
/*	    if(creep.room.name == goToRoom) {
	        if(creep.signController(creep.room.controller, "im noob") == ERR_NOT_IN_RANGE) {
	            creep.moveTo(creep.room.controller)
	        }
*/	        
            if(creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE && creep.room.name == goToRoom) {
                console.log('working')
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
      }
    }

module.exports = roleRemoteClaimer;