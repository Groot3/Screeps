function spawnRemoteHarvester (targetLoc) {
    const remoteHarvester = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == targetLoc && creep.memory.role == 'remoteharvester')
    if(remoteHarvester.length < 1) {
        const newName = `Remote Harvester ${targetLoc}` + ' ' + Game.time
        console.log('Spawning new ' + newName )
        Game.spawns['Delta'].spawnCreep([WORK,WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE,MOVE], newName,
            {memory: {role:'remoteharvester', targetLoc: targetLoc}})
    }
    
}
module.exports = spawnRemoteHarvester