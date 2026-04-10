"use strict";

import { getObjectsByPrototype } from "game/utils";
import { StructureSpawn } from "game/prototypes";
//import _ from "./utils/lodash-4.17.21-es/lodash";
import _ from "lodash";

import MiningSquad from "./squads/MiningSquad";
import AssaultSquad from "./squads/AssaultSquad";
import { ASSAULT, MINING, SquadType } from "./constants";
import { Role, HAULER, SOLDIER, RANGED, HEALER } from "./constants";
import SpawnQueue from "SpawnQueue";
import BaseSquad from "squads/BaseSquad";
import GameMemory from "GameMemory";
import Log from "utils/Logger";

class SquadController {
  squadCounter = 1;
  #squads: BaseSquad[] = [];

  constructor() {}

  // Getters

  // Setters

  // Create squad
  createSquad(spawnQueue: SpawnQueue, squadType: SquadType) {
    let mySquad: BaseSquad | undefined;

    switch (squadType) {
      case MINING:
        mySquad = new MiningSquad(this.squadCounter, spawnQueue);
        break;
      case ASSAULT:
        mySquad = new AssaultSquad(this.squadCounter, spawnQueue);
        break;
      default:
        break;
    }

    if (mySquad) {
      this.#squads.push(mySquad);
      this.squadCounter++;
    }
  }

  run(memory: GameMemory) {
    Log.debug("SquadController", "SquadController.run()");
    this.#squads.forEach((squad: BaseSquad) => {
      squad.run(memory);
    });
  }
}

export default SquadController;
