function c(){
    console.log(this);
}

class A{
    constructor() {
        c.call(this);
    }
}



console.log(new A());