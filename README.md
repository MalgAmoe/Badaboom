# Badaboom
A Web Drum Machine allowing polyrhythms of synthesized sounds.

This is the code of the alpha version, a new version is in development and can be tested at http://badaboom.flexyvoid.com/sound

## Idea
Having a simple interface for rapidly creating intricate rhythms.

## Components

### Sequencer

3 custom sequencers have separated controls for the division of the loop in steps and the length of the loop in bars.
When changing those parameters the sequencer selected is retriggered, this way it is possible to easily achieve a human groove.
A sync button is provided in case things get out of hand.

### Sound

3 synthesis engine provide the sound for each sequencer, the alteration of those sounds is made with a XY pad to easily vary between usable sounds.

## How it is made

The UI is made using React, custom components are made as controls and buttons for interacting with the sequencers and the sound engine.
A scheduler calls the sequencers to control when a sound must be created by the AudioContext, it needs to maintain a good balance between tight sequencing of the sounds and reactivity of user controls.
A function calculates the delay between the kick sequencer(master) and the 2 others for keeping the groove when the app is stopped and restarted.
