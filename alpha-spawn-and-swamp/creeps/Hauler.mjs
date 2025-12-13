'use strict'

import BaseCreep from '/user/creeps/BaseCreep';
import { CARRY, MOVE, ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from '/game/constants';
import { HAULER } from '/user/constants';
import SpawnQueue from '../SpawnQueue.mjs'

class Hauler extends BaseCreep {
    // Private
    #source;
    #target;

    /**
     * Hauler creep: retrieve (mined) energy and haul it to spawn
     * @constructor
     * @param {SpawnQueue} spawnQueue - My spawn location
     * @param {Number} squadId - Squad Id
     * @param {Number} memberId - Member Id
     */
    constructor(spawnQueue, squadId, memberId) {
        super(squadId, memberId, HAULER);

        this.body = [CARRY,MOVE];
        //spawnQueue.addCreep(squadId, memberId);
//        this.#mySpawn = spawn;
        this.queueSpawn(spawnQueue);
    }

    // Getters
    get source() {
        return this.#source;
    }
    get target() {
        return this.#target;
    }

    // Setters
    set source(source) {
        this.#source = source;
    }
    set target(target) {
        this.#target = target;
    }

    // Methods
    /**
     * Execute the default action for a hauler creep: haul energy ;)
     */
    run() {
        if(!this.target) {
            console.log("[E] Energy target not defined for creep " + this.creep.id);
        }
        else if (!this.#source) {
            console.log("[E] Energy source not defined for creep " + this.creep.id);
        }
        else {
            console.log("[D] Source: " + JSON.stringify(this.target));
            if(this.creep.store[RESOURCE_ENERGY] == 0) {
                if (this.creep.withdraw(this.source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(this.source);
                }
            }
            else { // on top of container = transfer energy
                if(this.creep.transfer(this.target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    this.creep.moveTo(this.target);
                }
            }
        }
    }
}

export default Hauler;