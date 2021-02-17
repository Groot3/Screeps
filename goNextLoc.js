const goNextLoc = function (Waypoints,OriginalDest,NextDest) {
    // ToDo: Take more than 1 waypoint

    if (creep.room.name = OriginalDest) {
        creep.memory.firstWaypoint = true
    }
    if (creep.memory.firstWaypoint == true && creep.room.name != NextDest) {
        const exitDirection = creep.room.findExitTo(NextDest)
        const nearestExit = creep.pos.findClosestByPath(exitDirection)
        creep.moveTo(nearestExit, {reusePath: 10})
    }
}
module.exports = goNextLoc