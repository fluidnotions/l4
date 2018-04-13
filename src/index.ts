var argv = require('minimist')(process.argv.slice(2));
console.dir(argv);
import { DicvoveryReplication } from './discovery';


new DicvoveryReplication(argv.name);