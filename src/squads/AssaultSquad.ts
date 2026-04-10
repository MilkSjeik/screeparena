"use strict";

import { Creep } from "game/prototypes";
import { getObjectsByPrototype } from "game/utils";
import BaseSquad from "./BaseSquad";
import GameMemory from "../GameMemory";
import SpawnQueue from "../SpawnQueue";
import Soldier from "../creeps/Soldier";
import Ranged from "../creeps/Ranged";
import Healer from "../creeps/Healer";

class AssaultSquad extends BaseSquad {
  target: Creep | undefined;

  constructor(id: number, spawnQueue: SpawnQueue) {
    super(id, ["soldier" as any, "soldier" as any, "ranged" as any, "healer" as any], spawnQueue);
    this.inFormation = true;
  }

  run(memory: GameMemory) {
    const activeMembers = this.members.filter((member) => member.creep && member.creep.exists);
    if (activeMembers.length < this.members.length) return;

    if (!this.target || !this.target.exists) {
      const enemies = getObjectsByPrototype(Creep).filter((creep) => !creep.my);
      this.target = this.members[0].creep?.findClosestByRange(enemies) ?? undefined;
    }
    if (!this.target) return;

    const soldiers = this.members.filter((member): member is Soldier => member instanceof Soldier);
    const ranged = this.members.find((member): member is Ranged => member instanceof Ranged);
    const healer = this.members.find((member): member is Healer => member instanceof Healer);

    const lowestHp = this.members.reduce((lowest, current) => {
      if (!current.creep) return lowest;
      if (!lowest || !lowest.creep) return current;
      return current.creep.hits < lowest.creep.hits ? current : lowest;
    }, undefined as BaseSquad["members"][number] | undefined);

    if (soldiers[0]?.creep) {
      soldiers[0].target = this.target;
      soldiers[0].isLeader = true;
      soldiers[0].run();
    }

    if (soldiers[1]?.creep && soldiers[0]?.creep) {
      soldiers[1].target = this.target;
      soldiers[1].creep.moveTo(soldiers[0].creep);
      soldiers[1].run();
    }

    if (ranged) {
      ranged.target = this.target;
      ranged.run();
    }

    if (healer && lowestHp?.creep) {
      healer.target = lowestHp.creep;
      healer.run();
    }
  }
}

export default AssaultSquad;
