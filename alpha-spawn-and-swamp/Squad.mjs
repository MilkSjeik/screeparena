'use strict'

//import { Creep } from '/game/prototypes';
import { HAULER } from '/user/constants';
import Hauler from '/user/creeps/Hauler';
import SpawnQueue from './SpawnQueue.mjs'

class Squad {
    #id;
    #members = [];
    #lastMemberId = 0;

    /**
     * Creates a squad of creeps
     * @constructor
     * @param {Array} roles - An array of creep roles
     * @param {SpawnQueue} spawnQueue - Squad spawn location
     */
    constructor(id, roles, spawnQueue) {
        console.log("[D] request received to create a squad with roles: " + JSON.stringify(roles));
        this.#id = id;
        roles.forEach(role => {
            this.#lastMemberId++;

            switch(role) {
                case HAULER:
                    const hauler = new Hauler(spawnQueue, this.#id, this.#lastMemberId);
                    this.#members.push(hauler);
                    break;
            }
        });
    }

// TODO: move spawning of creeps to spawn queue/manager

    // Methods
    /**
     * TODO
     */
     run() {
        console.log("[D] Squad members: " + JSON.stringify(this.#members));

        // Verify if the squad is complete
        // If not, spawn member

        // Time for action
        // for each member in the squad


        // Spawn hauler
        // if(!myHauler) {
        //     myHauler = new Hauler(myMemory.mySpawn);
        // }
        // else {
        //     console.log('[D] Hauler body: ' + JSON.stringify(myHauler.body));
        //     console.log('[D] Hauler creep: ' + JSON.stringify(myHauler.creep));
        //     myHauler.targetContainer = closeContainer;
        //     myHauler.run();
        // }
     }

     #isSquadComplete() {
        // TODO
     }

     #spawnMember() {
         // TODO
     }
}

export default Squad;