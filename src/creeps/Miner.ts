"use strict";

import BaseCreep from "./BaseCreep";
import {
  MOVE,
  WORK,
  ERR_NOT_IN_RANGE,
} from "game/constants";
import { Source } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";
import { Role } from "../constants";
import SpawnQueue from "../SpawnQueue";
import BaseSquad from "squads/BaseSquad";

class Miner extends BaseCreep {
  // Private
  #source: Source | undefined;

  /**
   * Miner creep: mine energy
   * @constructor
   * @param {SpawnQueue} spawnQueue - My spawn location
   * @param {Number} squad - Squad
   * @param {Number} memberId - Member Id
   */
  constructor(spawnQueue: SpawnQueue, squad: BaseSquad, memberId: number) {
    super(squad.id, memberId, Role.MINER);

    this.body = [WORK, MOVE];
    this.queueSpawn(spawnQueue, squad);
  }

  // Getters
  get source() {
    return this.#source;
  }

  // Setters
  set source(source) {
    this.#source = source;
  }

  // Methods
  /**
   * Execute the default action for a miner creep: mine resources
   */
  run() {
    if (this.creep != undefined) {
      if (!this.#source || !this.#source.exists) {
        const sources = getObjectsByPrototype(Source).filter((source) => source.energy > 0);
        this.#source = this.creep.findClosestByRange(sources) ?? undefined;
      }

      if (this.#source) {
        if (this.creep.harvest(this.#source) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(this.#source);
        }
      }
    }
  }
}

export default Miner;
