"use strict";

import {
  WORK,
  MOVE,
  CARRY,
  ATTACK,
  RANGED_ATTACK,
  HEAL,
  TOUGH,
} from "game/constants";

// Squad types
const ASSAULT = "assault";
const MINING = "mining";

export { ASSAULT, MINING };

enum SquadType {
  ASSAULT = "assault",
  MINING = "mining",
}

export { SquadType };

// Creep roles
const HAULER = "hauler";
const MINER = "miner";
const SOLDIER = "soldier";
const RANGED = "ranged";
const HEALER = "healer";

export { HAULER, MINER, SOLDIER, RANGED, HEALER };

enum Role {
  HAULER = "hauler",
  MINER = "miner",
  SOLDIER = "soldier",
  RANGED = "ranged",
  HEALER = "healer",
}

export { Role };

// Creep body types
type CreepBody =
  | typeof WORK
  | typeof MOVE
  | typeof CARRY
  | typeof ATTACK
  | typeof RANGED_ATTACK
  | typeof HEAL
  | typeof TOUGH;

export { CreepBody };

// Creep tasks
// TODO: attack removed, (ab)using Screeps ATTACK constant
enum SoldierTask {
  GUARD = "GUARD",
  DEFENSIVE = "DEFENSIVE",
  OFFENSIVE = "OFFENSIVE",
}

export { SoldierTask };
