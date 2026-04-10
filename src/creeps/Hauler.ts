"use strict";

import BaseCreep from "./BaseCreep";
import { CARRY, MOVE, ERR_NOT_IN_RANGE, RESOURCE_ENERGY } from "game/constants";
import { Resource, StructureSpawn } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";
import { Role } from "../constants";
import SpawnQueue from "../SpawnQueue";
import BaseSquad from "squads/BaseSquad";

class Hauler extends BaseCreep {
  // Private
  #source: Resource | undefined;
  #target: StructureSpawn | undefined;

  /**
   * Hauler creep: retrieve (mined) energy and haul it to spawn
   * @constructor
   * @param {SpawnQueue} spawnQueue - My spawn location
   * @param {Number} squad - Squad
   * @param {Number} memberId - Member Id
   */
  constructor(spawnQueue: SpawnQueue, squad: BaseSquad, memberId: number) {
    super(squad.id, memberId, Role.HAULER);

    this.body = [CARRY, MOVE];
    this.queueSpawn(spawnQueue, squad);
  }

  // Getters
  get source() {
    return this.#source;
  }
  get target() {
    //console.log("[D] Getting target");
    return this.#target;
  }

  // Setters
  set source(source) {
    this.#source = source;
  }
  set target(target) {
    //console.log("[D] Setting target: " + JSON.stringify(target) + "for creep with id: " + this.creep.id);
    this.#target = target;
    //console.log("[D] Set target: " + JSON.stringify(this.#target) + "for creep with id: " + this.creep.id);
  }

  // Methods
  /**
   * Execute the default action for a hauler creep: haul energy ;)
   */
  run() {
    if (this.creep != undefined) {
      if (this.creep.store[RESOURCE_ENERGY] == 0) {
        if (!this.#source || !this.#source.exists) {
          const droppedEnergy = getObjectsByPrototype(Resource).filter(
            (resource) => resource.resourceType === RESOURCE_ENERGY && resource.amount > 0,
          );
          this.#source = this.creep.findClosestByRange(droppedEnergy) ?? undefined;
        }

        if (this.#source) {
          if (this.creep.pickup(this.#source) == ERR_NOT_IN_RANGE) {
            this.creep.moveTo(this.#source);
          }
        }
      } else if (this.#target) {
        this.#source = undefined;
        if (this.creep.transfer(this.#target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.#target);
        }
      }
    }
  }
}

export default Hauler;
