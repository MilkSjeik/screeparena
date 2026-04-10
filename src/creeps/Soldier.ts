"use strict";

import {
  ATTACK,
  MOVE,
  ERR_NOT_IN_RANGE,
  TOUGH,
} from "game/constants";
import { Creep } from "game/prototypes";
import BaseCreep from "./BaseCreep";
import { Role } from "../constants";
import SpawnQueue from "../SpawnQueue";
import BaseSquad from "squads/BaseSquad";

class Soldier extends BaseCreep {
  target: Creep | undefined;
  isLeader = false;

  constructor(spawnQueue: SpawnQueue, squad: BaseSquad, memberId: number) {
    super(squad.id, memberId, Role.SOLDIER);
    this.body = [TOUGH, TOUGH, ATTACK, MOVE];
    this.queueSpawn(spawnQueue, squad);
  }

  run() {
    if (!this.creep || !this.target) return;
    if (this.creep.attack(this.target) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.target);
    }
  }
}

export default Soldier;
