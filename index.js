class PowerStation {
  constructor(batteryCapacity, maximumInput, maximumOutput) {
    // Implement constructor
    this.batteryCapacity = batteryCapacity <= 2000 ? batteryCapacity : 2000;
    this.maximumInput = maximumInput || 500;
    this.maximumOutput = maximumOutput || 800;
  }

  updateInput(voltage, current) {
    // Implement this and other methods and getters
  }

  connectOutput(outputId) {

  }

  updateOutput(outputId, voltage, current) {

  }

  disconnectOutput(outputId) {

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