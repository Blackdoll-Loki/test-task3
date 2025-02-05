class PowerStation {
  constructor(batteryCapacity, maximumInput, maximumOutput) {
    // Implement constructor
    this.batteryCapacity = batteryCapacity;
    this.maximumInput = maximumInput;
    this.maximumOutput = maximumOutput;
    this._input = 0;
    this._outputs = new Map();
    this._percentage = 100;
    this._capacity = batteryCapacity;
    this._outputIds = [];
    this._status = "idle"
  }

  updateInput(voltage, current) {
    // Implement this and other methods and getters
    let w = voltage * current;
    let newInput = this._input + w;
    this._input = Math.min(newInput, this.maximumInput);
    this._startTimer();
  }

  connectOutput(outputId) {
    if (!this._outputs.has(outputId)) {
      this._outputs.set(outputId, 0); 
    }
  }

  updateOutput(outputId, voltage, current) {
      let w = voltage * current;
      this._outputs.set(outputId, w); 
      this._startTimer();
  }

  disconnectOutput(outputId) {
    this._outputs.delete(outputId); 
    if (this._outputs.size === 0 && this._input === 0) {
      this._stopTimer();
    }
  }

  updateBatteryLevel(capacityLeft) {
    if (capacityLeft <= this.batteryCapacity) {
      this._capacity = capacityLeft;
      this._percentage = (this._capacity / this.batteryCapacity) * 100;
      this._updateStatus();
    }
  }

  get batteryPercentage() {
    return this._percentage;
  }

  get totalOutputPower() {
    return Array.from(this._outputs.values()).reduce((sum, power) => sum + power, 0);
  }

  get timeRemaining() {
    let totalOutput = this.totalOutputPower(); 
    let netPower = this._input - totalOutput; 
    
    if (totalOutput === 0) return "99:59"; 
  
    let remainingTime = netPower > 0 
      ? (this.batteryCapacity - this._capacity) / netPower
      : this._capacity / Math.abs(netPower); 
  
    let minutes = Math.ceil(remainingTime * 60);
    let hours = Math.floor(minutes / 60);
    minutes %= 60;
  
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  get status() {
    return this._status;
  }

  _updateStatus() {
    if (this._input > this.maximumInput || this._output > this.maximumOutput) {
      this._status = "overload";
    } else if (this._input > this._output) {
      this._status = "charging"; 
    } else if (this._input < this._output) {
      this._status = "discharging"; 
    } else {
      this._status = "idle";
    }
  }

  _startTimer() {
    if (this._timer) return; 

    this._lastUpdateTime = Date.now();
    this._timer = setInterval(() => {
      let now = Date.now();
      let deltaTime = (now - this._lastUpdateTime) / 3600000; 
      this._lastUpdateTime = now;

      let totalOutput = this.totalOutputPower();
      let capacityChange = (this._input - totalOutput) * deltaTime;
      let newCapacity = Math.max(0, Math.min(this.batteryCapacity, this._capacity + capacityChange));

      this.updateBatteryLevel(newCapacity); 

      if (this._input === 0 && this._output === 0) {
        this._stopTimer(); 
      }
    }, 1000);
  }

  _stopTimer() {
    if (this._timer) {
      clearInterval(this._timer);
      this._timer = null;
    }
  }
}