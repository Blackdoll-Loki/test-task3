class PowerStation {
  constructor(batteryCapacity, maximumInput, maximumOutput) {
    // Implement constructor
    this.batteryCapacity = batteryCapacity;
    this.batteryPercentage = 100;
    this.maximumInput = maximumInput;
    this.maximumOutput = maximumOutput;
    this.input = 0;
    this.output = 0;
    this.outputIds = [];
    this.status = "idle"
  }

  updateInput(voltage, current) {
    // Implement this and other methods and getters
    let w = voltage * current;
    let newInput = this.input + w;
    if(newInput <= this.maximumInput){
      this.input = newInput
    } else {
      this.input = this.maximumInput
    }
  }

  connectOutput(outputId) {
    this.outputIds.push(outputId);
  }

  updateOutput(outputId, voltage, current) {
    let isConnected = this.outputIds.includes(outputId)
    let w = voltage * current;
    let newOutput = this.output + w;
    if(newOutput <= this.maximumOutput && isConnected){
      this.output = newOutput
    } else {
      this.output = this.maximumOutput
    }
  }

  disconnectOutput(outputId) {
    this.outputIds = this.outputIds.filter((el) => el !== outputId);
  }

  updateBatteryLevel(capacityLeft) {

  }

  get batteryPercentage() {

  }

  get totalOutputPower() {

  }

  get timeRemaining() {

  }

  get status() {

  }
}