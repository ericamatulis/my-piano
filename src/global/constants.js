const VALID_BLACK_KEYS = ['s', 'd', 'g', 'h', 'j', '3', '4', '6', '7', '8'];
const VALID_WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
const VALID_KEYS = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'w', '3', 'e', '4', 'r', 't', '6', 'y', '7', 'u','8','i']
const notes = [
  'C', 'Db', 'D', 'Eb',
  'E', 'F', 'Gb', 'G',
  'Ab', 'A', 'Bb', 'B'
];
const POSITIONS = [0,1,2,3,4,6,7,8,9,10,11,12,14,15,16,17,18,20,21,22,23,24,25,26]

var NOTES = [];
const NOTE_TO_KEY = {};
const KEY_TO_NOTE = {};
const NOTE_TO_POSITION = {};

for (var i=3; i<=4; i++) {
    NOTES = NOTES.concat(
        notes.map((note, index) => note+i)
    )
}
for (i = 0; i < VALID_KEYS.length; i++) {
    KEY_TO_NOTE[VALID_KEYS[i]]=NOTES[i];
    NOTE_TO_KEY[NOTES[i]]=VALID_KEYS[i];
    NOTE_TO_POSITION[NOTES[i]]=POSITIONS[i];
}

const SONGS = {
    doremi: ['C4', 'D4', 'E4', 'F4', 'F4', 'F4', 'C4', 'D4', 'C4', 'D4', 'D4', 'D4', 'C4', 'G4', 'F4', 'E4', 'E4', 'E4', 'C4', 'D4', 'E4', 'F4', 'F4', 'F4'],
    maryhad: ['E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'D4', 'D4', 'D4', 'E4', 'G4', 'G4', 'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'E4', 'D4', 'D4', 'E4', 'D4', 'C4'],
    yesterday: ['A4', 'G4', 'G4', 'B4', 'Db5', 'D5', 'E5', 'Gb5', 'G5', 'Gb5', 'E5', 'E5', 'E5', 'E5', 'D5', 'C5', 'B4', 'A4', 'C5', 'B4', 'B4', 'A4', 'G4', 'B4', 'A4', 'E4', 'G4', 'B4', 'B4']
}

export {
  NOTES,
  VALID_KEYS,
  NOTE_TO_KEY,
  KEY_TO_NOTE,
  NOTE_TO_POSITION,
  SONGS,
};
  