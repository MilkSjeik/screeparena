"use strict";

import { getObjectsByPrototype } from "game/utils";
import { Creep, StructureSpawn } from "game/prototypes";
// TODO: Spawning isn't known by game/prototypes
// import { Creep, StructureSpawn, Spawning } from "game/prototypes";
import SquadController from "./SquadController";
import { CreepBody, Role } from "./constants";
//import _ from "./utils/lodash-4.17.21-es/lodash";
import _ from "lodash";
import BaseSquad from "squads/BaseSquad";
import BaseCreep from "creeps/BaseCreep";

// TODO: move to seperate file?
type SpawnRequest = {
  squad: BaseSquad;
  memberId: number;
  role: Role;
  body: CreepBody[];
};

class SpawnQueue {
  #mySpawn: StructureSpawn;
  #queue: SpawnRequest[] = [];

  constructor(spawn: StructureSpawn) {
    // try to find spawns
    this.#mySpawn = spawn;
  }

  // Getters
  get mySpawn() {
    return this.#mySpawn;
  }

  // Setters
  set mySpawn(spawn) {
    this.#mySpawn = spawn;
  }

  // Private methods

  // Public methods
  spawn() {
    // console.log(
    //   "[D] SpawnQueue - Current spawn queue: " + JSON.stringify(this.#queue),
    // );
    // Check if something is in queue
    if (this.#queue.length > 0) {
      const firstInQueue = this.#queue[0];
      // if yes: try to spawn
      const creep: Creep | undefined = this.mySpawn.spawnCreep(
        firstInQueue.body // body
     ).object;
    // TODO: add to memory?
        // firstInQueue.squad.id + "|" + firstInQueue.memberId,
        // { memory: { role: firstInQueue.role } }, // memory
       // check result:
      if (creep === undefined) {
        // undefined = already busy
      } else {
        console.log("[D] SpawnQueue - Spawned creep: " + creep.id);
        console.log("[D] SpawnQueue - Creep type: " + typeof creep);
        if (creep instanceof Object) {
          // creep is spawning, remove from queue
          console.log("[D] SpawnQueue - remove from queue");
          this.#queue = _.drop(this.#queue);
        }
        // TODO: find other way to identify creep type after spawning
        // else {
        // if (creep instanceof Creep) {
        //   // emtpy object = spawning creep
        //   // set creep properties
        //   creep.squadId = firstInQueue.squad.id;
        //   creep.memberId = firstInQueue.memberId;
        //   creep.role = firstInQueue.role;
        //
        //   // remove first from queue
        //   console.log("[D] SpawnQueue - remove first from queue");
        //   this.#queue = _.drop(this.#queue);
        //
        //   // add creep to squad
        //   firstInQueue.squad.updateMember(creep.memberId, creep);
        // }
        // }
      }
    }
  }

  add(squad: BaseSquad, memberId: number, role: Role, body: CreepBody[]) {
    this.#queue.push({
      squad: squad,
      memberId: memberId,
      role: role,
      body: body,
    });
  }

  remove() {}
}

export default SpawnQueue;
