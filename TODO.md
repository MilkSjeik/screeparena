- [x] Adjust `MiningSquad` to determine the correct creep type, e.g.: HAULER
- [x] Modify TypeScript config to:
  - [x] Build the right script that can be used by the game, see examples:
    - [Screeps Autonomous Framework](https://github.com/admon84/screeps-autonomous-framework)
    - [Screeps Arena Typescript Starter](https://github.com/screepers/screeps-arena-typescript-starter)
  - [x] Ignore dist folder
  - [x] Ignore node_modules folder
- [x] Add logging function
  - [x] Enable/disable logging levels
  - [x] Implement different logging levels
- Creep spawning
  - [ ] Find other way to identify creep type after spawning (`./src/SpawnQueue.ts`)
    - Verify documentation
    - Check if Typescript/types version is correct

```Typescript
    if (this.mySpawn.spawning istypeof Spawning) {
      return;
    }
```

- [ ] Add creep to Squad
