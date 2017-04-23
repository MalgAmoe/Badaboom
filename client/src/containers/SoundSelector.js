import React, { Component } from 'react'

class SoundSelector extends Component {
  render() {
    this.state = {
      selectedOption: 'option1'
    }
    return(
      <form>
        <div className="radio">
          <label>
            <input type="radio" value="option1" checked={this.state.selectedOption === 'option1'} />
            Option 1
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option2" checked={this.state.selectedOption === 'option2'} />
            Option 2
          </label>
        </div>
        <div className="radio">
          <label>
            <input type="radio" value="option3" checked={this.state.selectedOption === 'option3'} />
            Option 3
          </label>
        </div>
      </form>
    )
  }
}

export default SoundSelector
