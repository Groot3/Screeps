const roleRemoteClaimer = require('role.claimer')

function spawnClaimer (targetLoc) {
    const claimer = _.filter(Game.creeps, (creep) => creep.memory.targetLoc == targetLoc && creep.memory.role == 'claimer')
    if(claimer.length < 1) {
        const newName = `Remote Claimer ${targetLoc}` + ' ' + Game.time
        console.log('Spawning new ' + newName )
        Game.spawns['Delta'].spawnCreep([MOVE,CLAIM], newName,
            {memory: {role:'claimer', targetLoc: targetLoc}})
    }
    
}
module.exports = spawnClaimer