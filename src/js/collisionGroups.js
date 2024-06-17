import { CollisionGroupManager } from 'excalibur';
import * as ex from 'excalibur';

const enemyGroup = ex.CollisionGroupManager.create('enemyGroup');

// enemyGroup.canCollide(otherGroup)

// otherGroup.canCollide(enemyGroup)
// otherGroup.canCollide(otherGroup)

export { enemyGroup };

