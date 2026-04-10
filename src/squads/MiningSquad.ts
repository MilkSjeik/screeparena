"use strict";

import BaseSquad from "./BaseSquad";
import SpawnQueue from "../SpawnQueue";
import GameMemory from "../GameMemory";
import { Role } from "../constants";
import Hauler from "creeps/Hauler";
import Miner from "creeps/Miner";
import Log from "utils/Logger";

class MiningSquad extends BaseSquad {
  /**
   * Creates a squad of creeps
   * @constructor
   * @param {Array} roles - An array of creep roles
   * @param {SpawnQueue} spawnQueue - Squad spawn location
   */
  constructor(id: number, spawnQueue: SpawnQueue) {
    super(id, [Role.MINER, Role.HAULER, Role.HAULER], spawnQueue);
  }

  // Methods
  /**
   * TODO
   */
  run(memory: GameMemory) {
    Log.info("MiningSquad", "Squad.run()");
    Log.debug("MiningSquad", "Squad members: " + JSON.stringify(this.members));
    // Verify if the squad is complete
    // If not, spawn member

    // Time for action
    // for each member in the squad
    this.members.forEach((member) => {
      Log.debug("MiningSquad", "Found member: " + JSON.stringify(member));
      if (member instanceof Hauler) {
        member.target = memory.mySpawn;
      } else if (member instanceof Miner) {
        if (member.creep && !member.source) {
          // Miner picks its source on demand.
          member.run();
          return;
        }
      }
      if (member.creep) {
        member.run();
      }
    });
  }

  #isSquadComplete() {
    // TODO
  }

  #spawnMember() {
    // TODO
  }
}

export default MiningSquad;
