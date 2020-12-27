function radar() {
        for (var name in Game.rooms) {
            inSightHostiles = Game.rooms[name].find(FIND_HOSTILE_CREEPS)
            inSightStructures = Game.rooms[name].find(FIND_HOSTILE_STRUCTURES)  
                if (inSightHostiles.length > 0) {
                    console.log("HOSTILES IN SIGHT")
                    console.log(inSightHostiles[0])
                    return inSightHostiles
                }
                if (inSightStructures.length > 0) {
                    console.log("HOSTILE STRUCTURES IN SIGHT")
                    console.log(inSightStructures[0])
                    return inSightStructures
                }
        }
        
};
module.exports = radar