class Command {

  constructor(key, description, action) {
    this.key = key;
    this.description = description;
    this.action = action;
  }

  execute() {
    this.action();
    console.log(this.description);
  }

}


module.exports = Command;
