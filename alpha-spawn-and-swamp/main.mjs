'use strict'

import { findInRange, getObjectsByPrototype } from '/game/utils';
import { Creep, StructureContainer, StructureSpawn } from '/game/prototypes';
import { ATTACK, CARRY, MOVE, WORK, ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { } from '/arena';
import GameMemory from '/user/GameMemory';
import Squad from './Squad.mjs';
import { HAULER } from '/user/constants';
import SpawnQueue from './SpawnQueue.mjs';


let aMiners = [];
let aKnights = [];
let aMyContainers = [];
let myMemory;
let myHauler;
let mySquad;
let mySpawnQueue;


export function loop() {
    // Determine objects:
    const creeps = getObjectsByPrototype(Creep);
    const myCreeps = creeps.filter(creep => creep.my);
    const enemyCreeps = creeps.filter(creep => !creep.my);

    // Memory = 1 time only
    if(!myMemory) {
        myMemory = new GameMemory();
        console.log("[D] Saved my spawn: " + JSON.stringify(myMemory.mySpawn));
    }
    else {
        console.log("[D] My spawn in memory: " + JSON.stringify(myMemory.mySpawn));
    }

    if(!mySpawnQueue) {
        if(myMemory.mySpawn) {
            mySpawnQueue = new SpawnQueue(myMemory.mySpawn);
            console.log("[D} Spawnqueue created")
        }
        else {
            console.log("[E] No spawn found to create queue");
        }
    }
    else {
        console.log("[D] Main - Current spawn queue: " + JSON.stringify(mySpawnQueue));
    }

    // const closeContainer = myMemory.getCloseContainer(myMemory.mySpawn);

    // console.log("[D] First target container: " + JSON.stringify(closeContainer));


    // Create first squad
    if (!mySquad) {
        mySquad = new Squad(1, [HAULER,HAULER], mySpawnQueue);
    }

    mySpawnQueue.spawn();


    mySquad.run();

    myCreeps.forEach(creep => {
        console.log("[D] Found creep: " + JSON.stringify(creep));
    });

     

    // // Find containers nearby mySpawn
    // if(aMyContainers.length == 0) {
    //     const containers = getObjectsByPrototype(StructureContainer);
    //     const myContainers = findInRange(myMemory.mySpawn, containers, 10);

    //     myContainers.forEach(container => {
    //         // TODO: extend container class instead of this...
    //         aMyContainers.push({
    //             "object": container,
    //             "creep": false
    //         })
    //     });
    //     console.log("Initialized aMyContainers:" + JSON.stringify(aMyContainers));
    // }
    // else {
    //     console.log("Memory aMyContainers:" + JSON.stringify(aMyContainers));
    // }

    // if (myContainers) {
    //     myContainers.forEach(container => {
    //         console.log("Found container: " + JSON.stringify(container) + "\n");
    //     });
    // }
    // else {
    //     console.log("Found containers: " + JSON.stringify(containers) + "\n");
    // }

    // Spawn creep(s)
    // if (aMiners.length < 2) {
    //     if(myMemory.mySpawn.store[RESOURCE_ENERGY] >= 250) {
    //         console.log("[D] Try to spawn creep");
    //         const creep = myMemory.mySpawn.spawnCreep([WORK, CARRY, MOVE]).object;
    //         console.log("[D] Spawn return object: " + JSON.stringify(creep));
    //         if (creep) {
    //             console.log("[D] creep exists: " + JSON.stringify(creep));
    //             // // assign container
    //             // const container = aMyContainers.find(container => !container.creep);
    //             // container.creep = true;
    //             // console.log("Found container target: " + JSON.stringify(container));
    //             // // TODO: extend container class instead of this...
    //             // creep.targetContainer = container.object;
    //             // console.log("Set creep target: " + JSON.stringify(creep.targetContainer));
                
    //             // creep.role = "miner";
    //             aMiners.push(creep);
    //             console.log("[D] Added to miners array: " + JSON.stringify(aMiners));
    //         }
    //     }
    // }
    // console.log("[D] Miners array: " + JSON.stringify(aMiners));
    // aMiners.forEach(miner => {
    //     console.log("\n[D] Miner(id=" + miner.id + ").exists: " + miner.exists);
    // });
    // // just spawn attackers
    // else if(mySpawn.store[RESOURCE_ENERGY] >= 210) {
    //     const creep = mySpawn.spawnCreep([ATTACK, ATTACK, MOVE]).object;
    //     if (creep) {
    //         creep.role = "knight";
    //         aKnights.push(creep);
    //     }
    // }

    // // Handle creeps
    // myCreeps.forEach(myCreep => {
    // //     console.log("Handle creep: " + myCreep.role);
    //     if (myCreep.role == "miner") {
    //         // Transfer energy from containers to spawn
    //         // container is walkable structure => go stand on top
    //         // if (myCreep.x != myCreep.targetContainer.x || myCreep.y != myCreep.targetContainer.y) {
    //         //     console.log("Moving to target: " + JSON.stringify(myCreep.targetContainer));
    //         //     myCreep.moveTo(myCreep.targetContainer);
    //         // }
    //         console.log("Harvest container: " + JSON.stringify(myCreep.targetContainer));
    //         if(myCreep.store[RESOURCE_ENERGY] == 0) {
    //             if (myCreep.withdraw(myCreep.targetContainer, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 myCreep.moveTo(myCreep.targetContainer);
    //             }
    //         }
    //         else { // on top of container = transfer energy
    //             if (myCreep.transfer(mySpawn, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
    //                 myCreep.moveTo(mySpawn); 
    //             }
    //         }
    //     }
    //     else if (myCreep.role == "knight") {
    //         // if enemycreep nearby
    //         const closeTargets = findInRange(myCreep, enemyCreeps, 3);
    //         if(closeTargets.length >= 1) {
    //             // attack first enemy creep
    //             const enemyCreep = closeTargets[0];
    //             if(myCreep.attack(enemyCreep) == ERR_NOT_IN_RANGE) {
    //                 myCreep.moveTo(enemyCreep);
    //             }
    //         }
    //         else {
    //             if(myCreep.attack(enemySpawn) == ERR_NOT_IN_RANGE) {
    //                 // Move to attack enemySpawn
    //                 myCreep.moveTo(enemySpawn);
    //             }
    //         }
    //     }
    // });
}