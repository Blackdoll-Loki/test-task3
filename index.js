class PowerStation {
  constructor(batteryCapacity, maximumInput, maximumOutput) {
    // Implement constructor
    this.batteryCapacity = batteryCapacity;
    this.maximumInput = maximumInput;
    this.maximumOutput = maximumOutput;
    this._input = 0;
    this._output = 0;
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
    this._updateStatus();
    this._startTimer();
  }

  connectOutput(outputId) {
    this._outputIds.push(outputId);
  }

  updateOutput(outputId, voltage, current) {
    let isConnected = this._outputIds.includes(outputId)
    let w = voltage * current;
    let newOutput = this._output + w;
    if( isConnected){
      this._output = Math.min(newOutput, this.maximumOutput);
      this._updateStatus();
      this._startTimer();
    }
  }

  disconnectOutput(outputId) {
    this._outputIds = this._outputIds.filter((el) => el !== outputId);
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
    
  }

  get timeRemaining() {
    if (this._output === 0) return Infinity;
    return this._capacity / this._output; 
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

      let capacityChange = (this._input - this._output) * deltaTime;
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