function spawnRemoteHauler (targetLoc) {
    const remoteHauler = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == targetLoc && creep.memory.role == 'remotehauler')
    if(remoteHauler.length < 1) {
        const newName = `Remote Hauler ${targetLoc}` + ' ' + Game.time
        console.log('Spawning new ' + newName )
        Game.spawns['Delta'].spawnCreep([CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role:'remotehauler', targetLoc: targetLoc}})
    }
    
}
module.exports = spawnRemoteHauler