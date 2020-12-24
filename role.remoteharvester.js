var roleRemoteHarvester = {

    /** @param {Creep} creep **/
    run: function(creep, goToRoom) {
        //console.log(goToRoom)
        //console.log(creep.room.name)
        if (creep.room.name != goToRoom) {
            var exitDirection = creep.room.findExitTo(goToRoom)
            var nearestExit = creep.pos.findClosestByPath(exitDirection)
            creep.moveTo(nearestExit, {reusePath: 50})
        }
	    if(creep.room.name == goToRoom) {
            var sources = creep.pos.findClosestByRange(FIND_SOURCES);
            if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources, {reusePath: 50}, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}

module.exports = roleRemoteHarvester;