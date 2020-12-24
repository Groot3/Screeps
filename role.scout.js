var roleScout = {

    /** @param {Creep} creep **/
    run: function(creep, goToRoom) {
        if (creep.room.name != goToRoom) {
            var exitDirection = creep.room.findExitTo(goToRoom)
            var nearestExit = creep.pos.findClosestByPath(exitDirection)
            creep.moveTo(nearestExit)
        }
        else {
	        if(creep.signController(creep.room.controller, "Groot's Influence") == ERR_NOT_IN_RANGE) {
	            creep.moveTo(creep.room.controller)
        }
      }
    }
}
module.exports = roleScout;