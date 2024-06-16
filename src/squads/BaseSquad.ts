"use strict";

import { Creep } from "game/prototypes";
import BaseCreep from "creeps/BaseCreep";
//import { Creep } from '/game/prototypes';
import { HAULER, SOLDIER, SNIPER, HEALER, Role, MINER } from "../constants";
import Hauler from "../creeps/Hauler";
import Miner from "../creeps/Miner";
import Soldier from "../creeps/Soldier";
import SpawnQueue from "../SpawnQueue";
import GameMemory from "../GameMemory";

class BaseSquad {
  id: number;

  members: BaseCreep[] = [];
  lastMemberId: number = 0;
  // formation = [];
  inFormation: boolean = false;

  /**
   * Creates a squad of creeps
   * @constructor
   * @param {Array} roles - An array of creep roles
   * @param {SpawnQueue} spawnQueue - Squad spawn location
   */
  constructor(id: number, roles: Role[], spawnQueue: SpawnQueue) {
    // TODO: import roles as a multidimension table for the formation
    // let formationLine = [];

    console.log(
      "[D] Request received to create a squad with roles: " +
        JSON.stringify(roles),
    );
    this.id = id;
    roles.forEach((role: Role) => {
      let member;

      switch (role) {
        case HAULER:
          member = new Hauler(spawnQueue, this, this.lastMemberId);
          break;
        case MINER:
          member = new Miner(spawnQueue, this, this.lastMemberId);
          break;
        // case SOLDIER:
        //   member = new Soldier(spawnQueue, this, this.lastMemberId);
        //   break;
        // case SNIPER:
        //   break;
        // case HEALER:
        //   break;
      }

      if (member) {
        this.members.push(member);
        // TODO: make a multidimension table for the formation
        // formationLine.push(this.lastMemberId);

        this.lastMemberId++;
      }
    });

    // this.formation.push(formationLine);

    //console.log("[D] Squad created with formation: " + JSON.stringify(this.formation));
  }

  // Methods
  /**
   * TODO
   */
  run(memory: GameMemory) {
    console.log("[W] Implement run() in the child class!");
  }

  #isSquadComplete() {
    // TODO
  }

  #spawnMember() {
    // TODO
  }

  updateMember(memberId: number, creep: Creep) {
    //console.log("[D] Squad.updateMember()");
    //console.log("[D]  - memberId: " + memberId);
    //console.log("[D]  - creep: " + creep);

    this.members[memberId].creep = creep;
  }
}

export default BaseSquad;
