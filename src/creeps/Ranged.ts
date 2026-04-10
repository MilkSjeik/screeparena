"use strict";

import BaseCreep from "./BaseCreep";
import { MOVE, RANGED_ATTACK, ERR_NOT_IN_RANGE } from "game/constants";
import { Creep } from "game/prototypes";
import { Role } from "../constants";
import SpawnQueue from "../SpawnQueue";
import BaseSquad from "squads/BaseSquad";

class Ranged extends BaseCreep {
  target: Creep | undefined;

  constructor(spawnQueue: SpawnQueue, squad: BaseSquad, memberId: number) {
    super(squad.id, memberId, Role.RANGED);
    this.body = [MOVE, RANGED_ATTACK];
    this.queueSpawn(spawnQueue, squad);
  }

  run() {
    if (!this.creep || !this.target) return;
    if (this.creep.rangedAttack(this.target) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(this.target);
    }
  }
}

export default Ranged;
