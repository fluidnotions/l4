import { Publisher, Subscriber } from 'cote';
import * as uuid from 'uuid/v1'
/**
 * we result in a fully connected mesh, with a fair amount of redundant network traffic
 * but for less then 200 nodes on a LAN it's negliable 
 * 
 * @export
 * @class DicvoveryReplication
 */
export class DicvoveryReplication {

    randomSubscriber = new Subscriber({
        name: 'randomSub',
        // namespace:'rnd',
        subscribesTo: ['randomUpdate'],
    });

    randomPublisher = new Publisher({
        name: 'randomPub',
        // namespace: 'rnd',
        broadcasts: ['randomUpdate']
    });

    public origin: string = uuid();

    constructor(public name?: string) {
        this.randomSubscriber.on('randomUpdate', (msg: any) => {
           if(msg.origin !== this.origin) console.log(`I am ${this.name} recieving`,msg.val, ` from ${msg.name}`);
        });

       setTimeout(() => this.poll(), 5000);
       console.log('randomPublisher: ', this.randomPublisher, ' randomSubscriber: ', this.randomSubscriber)
    }

    poll(){
        setInterval(() => this.publishUpdate(), 3000);
    }

    publishUpdate() {
        let msg: any = {
            origin: this.origin,
            name: this.name || 'noname',
            val: ~~(Math.random() * 1000)
        };

        // console.log('emitting', msg);

        // publish an event with arbitrary data at any time
        this.randomPublisher.publish('randomUpdate', msg);

    }



}
