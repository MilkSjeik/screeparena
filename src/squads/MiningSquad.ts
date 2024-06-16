"use strict";

import BaseSquad from "./BaseSquad";
import SpawnQueue from "../SpawnQueue";
import GameMemory from "../GameMemory";
import { Role } from "../constants";
import { StructureContainer } from "game/prototypes";
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
  constructor(id: number, roles: Role[], spawnQueue: SpawnQueue) {
    super(id, roles, spawnQueue);
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
      // If hauler: set target to retrieve energy
      if (member instanceof Hauler) {
        // if (member.role === Role.HAULER) {
        if (member.creep) {
          // TODO: reimplement? -> move to Hauler class?
          const container: StructureContainer | null = memory.getCloseContainer(
            member.creep,
          );

          if (container !== null) {
            Log.debug(
              "MiningSquad",
              "Setting container as source" + JSON.stringify(container),
            );
            member.source = container;
            Log.debug(
              "MiningSquad",
              "Set container as source" + JSON.stringify(member.source),
            );
            member.target = memory.mySpawn;
          }
        }
      } else if (member instanceof Miner) {
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
