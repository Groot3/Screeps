var roleBrute = {

    /** @param {Creep} creep **/
    run: function(creep, goToRoom) {
        if (creep.room.name != goToRoom) {
            var exitDirection = creep.room.findExitTo(goToRoom)
            var nearestExit = creep.pos.findClosestByPath(exitDirection)
            creep.moveTo(nearestExit, {reusePath: 10})
        }
        else {
            const nearestEnemy = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
            const priorityStructures = creep.pos.findClosestByPath(FIND_HOSTILE_SPAWNS)
	        if(creep.attack(nearestEnemy) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(nearestEnemy, {reusePath: 10})
	        }
	        if(creep.attack(priorityStructures) == ERR_NOT_IN_RANGE) {
	            creep.moveTo(priorityStructures, {reusePath: 10})
	        }
        }
      }
}
module.exports = roleBrute;