abstract class Employee {
    private readonly name : string;
    private readonly age : number;
    public salary : number;
    public tasks : Array<string>;

    protected constructor(name : string, age : number) {
        this.name = name;
        this.age = age;
        this.salary = 0;
        this.tasks = [];
    }

    work() : void {
        const currentTask : string = this.tasks.shift();
        console.log(this.name + currentTask);
        this.tasks.push(currentTask);
    }

    getSalary() : number {
        return this.salary;
    }

    collectSalary() : void {
        console.log(`${this.name} received ${this.getSalary()} this month.`);
    }
}

class Junior extends Employee {
    constructor(name : string, age : number) {
        super(name, age);
        this.tasks.push(' is working on a simple task.');
    }
}

class Senior extends Employee {
    constructor(name : string, age : number) {
        super(name, age);
        this.tasks.push(' is working on a complicated task.');
        this.tasks.push(' is taking time off work.');
        this.tasks.push(' is supervising junior work.');
    }
}

class Manager extends Employee {
    private devidend : number;

    constructor(name : string, age : number) {
        super(name, age);
        this.devidend = 0;
        this.tasks.push(' scheduled a meeting.');
        this.tasks.push(' is preparing a quarterly report.');
    }

    getSalary() : number {
        return this.salary + this.devidend;
    }
}
