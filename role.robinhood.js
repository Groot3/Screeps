var roleRobinhood = {

    /** @param {Creep} creep **/
    run: function(creep, HomeLoc) {
        for (var name in Game.rooms) {
            hostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS)
            if (hostiles.length == 0) {
                hostiles = false
                hostilestructures = Game.rooms[name].find(FIND_HOSTILE_STRUCTURES)
            }
            if (hostiles.length > 0) {
                console.log("robinhood detecting intruders, attempting to attack")
                if (creep.rangedAttack(hostiles[0]) != OK) {
                    creep.moveTo(hostiles[0])
                }
            }
            if (hostiles == false) { // no enemy creeps, enemy buildings?? 
                if (creep.rangedAttack(hostilestructures[0]) != OK) {
                    //console.log('RH going to buildings')
                    const BestRoute = creep.pos.findPathTo(hostilestructures)
                        creep.moveTo(hostilestructures[0])
                }
            }
        }
    }
}

module.exports = roleRobinhood;