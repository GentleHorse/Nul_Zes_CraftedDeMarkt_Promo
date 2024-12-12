import Stats from 'three/examples/jsm/libs/stats.module';

export default class StatusMonitor {
    constructor(){
        this.setInstance();
    }

    setInstance(){
        this.instance = Stats();
        document.body.appendChild(this.instance.dom);
    }

    update(){
        this.instance.update();
    }
}