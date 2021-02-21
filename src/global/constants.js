const VALID_BLACK_KEYS = ['s', 'd', 'g', 'h', 'j', '3', '4', '6', '7', '8'];
const VALID_WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm', 'w', 'e', 'r', 't', 'y', 'u', 'i'];
const VALID_KEYS = ['z', 's', 'x', 'd', 'c', 'v', 'g', 'b', 'h', 'n', 'j', 'm', 'w', '3', 'e', '4', 'r', 't', '6', 'y', '7', 'u','8','i']
const notes = [
  'C', 'Db', 'D', 'Eb',
  'E', 'F', 'Gb', 'G',
  'Ab', 'A', 'Bb', 'B'
];
const POSITIONS = [0,1,2,3,4,6,7,8,9,10,11,12,14,15,16,17,18,20,21,22,23,24,25,26]

const SONGS = {
    doremi: [[4,5],['C4', 'D4', 'E4', 'F4', 'F4', 'F4', 'C4', 'D4', 'C4', 'D4', 'D4', 'D4', 'C4', 'G4', 'F4', 'E4', 'E4', 'E4', 'C4', 'D4', 'E4', 'F4', 'F4', 'F4']],
    maryhad: [[3,4],['E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'D4', 'D4', 'D4', 'E4', 'G4', 'G4', 'E4', 'D4', 'C4', 'D4', 'E4', 'E4', 'E4', 'E4', 'D4', 'D4', 'E4', 'D4', 'C4']],
    yesterday: [[3,4],['A3', 'G3', 'G3', 'B3', 'Db4', 'D4', 'E4', 'Gb4', 'G4', 'Gb4', 'E4', 'E4', 'E4', 'E4', 'D4', 'C4', 'B3', 'A3', 'C4', 'B3', 'B3', 'A3', 'G3', 'B3', 'A3', 'E3', 'G3', 'B3', 'B3']]
}

const instruments = {
accordion: 'accordion-mp3',
acoustic_bass: 'acoustic_bass-mp3',
acoustic_grand_piano: 'acoustic_grand_piano-mp3',
acoustic_guitar_nylon: 'acoustic_guitar_nylon-mp3',
acoustic_guitar_steel: 'acoustic_guitar_steel-mp3',
agogo: 'agogo-mp3',
alto_sax: 'alto_sax-mp3',
applause: 'applause-mp3',
bagpipe: 'bagpipe-mp3',
banjo: 'banjo-mp3',
baritone_sax: 'baritone_sax-mp3',
bassoon: 'bassoon-mp3',
bird_tweet: 'bird_tweet-mp3',
blown_bottle: 'blown_bottle-mp3',
brass_section: 'brass_section-mp3',
breath_noise: 'breath_noise-mp3',
bright_acoustic_piano: 'bright_acoustic_piano-mp3',
celesta: 'celesta-mp3',
cello: 'cello-mp3',
choir_aahs: 'choir_aahs-mp3',
church_organ: 'church_organ-mp3',
clarinet: 'clarinet-mp3',
clavinet: 'clavinet-mp3',
contrabass: 'contrabass-mp3',
distortion_guitar: 'distortion_guitar-mp3',
drawbar_organ: 'drawbar_organ-mp3',
dulcimer: 'dulcimer-mp3',
electric_bass_finger: 'electric_bass_finger-mp3',
electric_bass_pick: 'electric_bass_pick-mp3',
electric_grand_piano: 'electric_grand_piano-mp3',
electric_guitar_clean: 'electric_guitar_clean-mp3',
electric_guitar_jazz: 'electric_guitar_jazz-mp3',
electric_guitar_muted: 'electric_guitar_muted-mp3',
electric_piano_1: 'electric_piano_1-mp3',
electric_piano_2: 'electric_piano_2-mp3',
english_horn: 'english_horn-mp3',
fiddle: 'fiddle-mp3',
flute: 'flute-mp3',
french_horn: 'french_horn-mp3',
fretless_bass: 'fretless_bass-mp3',
fx_1_rain: 'fx_1_rain-mp3',
fx_2_soundtrack: 'fx_2_soundtrack-mp3',
fx_3_crystal: 'fx_3_crystal-mp3',
fx_4_atmosphere: 'fx_4_atmosphere-mp3',
fx_5_brightness: 'fx_5_brightness-mp3',
fx_6_goblins: 'fx_6_goblins-mp3',
fx_7_echoes: 'fx_7_echoes-mp3',
fx_8_scifi: 'fx_8_scifi-mp3',
glockenspiel: 'glockenspiel-mp3',
guitar_fret_noise: 'guitar_fret_noise-mp3',
guitar_harmonics: 'guitar_harmonics-mp3',
gunshot: 'gunshot-mp3',
harmonica: 'harmonica-mp3',
harpsichord: 'harpsichord-mp3',
helicopter: 'helicopter-mp3',
honkytonk_piano: 'honkytonk_piano-mp3',
kalimba: 'kalimba-mp3',
koto: 'koto-mp3',
lead_1_square: 'lead_1_square-mp3',
lead_2_sawtooth: 'lead_2_sawtooth-mp3',
lead_3_calliope: 'lead_3_calliope-mp3',
lead_4_chiff: 'lead_4_chiff-mp3',
lead_5_charang: 'lead_5_charang-mp3',
lead_6_voice: 'lead_6_voice-mp3',
lead_7_fifths: 'lead_7_fifths-mp3',
lead_8_bass__lead: 'lead_8_bass__lead-mp3',
marimba: 'marimba-mp3',
melodic_tom: 'melodic_tom-mp3',
music_box: 'music_box-mp3',
muted_trumpet: 'muted_trumpet-mp3',
oboe: 'oboe-mp3',
ocarina: 'ocarina-mp3',
orchestra_hit: 'orchestra_hit-mp3',
orchestral_harp: 'orchestral_harp-mp3',
overdriven_guitar: 'overdriven_guitar-mp3',
pad_1_new_age: 'pad_1_new_age-mp3',
pad_2_warm: 'pad_2_warm-mp3',
pad_3_polysynth: 'pad_3_polysynth-mp3',
pad_4_choir: 'pad_4_choir-mp3',
pad_5_bowed: 'pad_5_bowed-mp3',
pad_6_metallic: 'pad_6_metallic-mp3',
pad_7_halo: 'pad_7_halo-mp3',
pad_8_sweep: 'pad_8_sweep-mp3',
pan_flute: 'pan_flute-mp3',
percussive_organ: 'percussive_organ-mp3',
piccolo: 'piccolo-mp3',
pizzicato_strings: 'pizzicato_strings-mp3',
recorder: 'recorder-mp3',
reed_organ: 'reed_organ-mp3',
reverse_cymbal: 'reverse_cymbal-mp3',
rock_organ: 'rock_organ-mp3',
seashore: 'seashore-mp3',
shakuhachi: 'shakuhachi-mp3',
shamisen: 'shamisen-mp3',
shanai: 'shanai-mp3',
sitar: 'sitar-mp3',
slap_bass_1: 'slap_bass_1-mp3',
slap_bass_2: 'slap_bass_2-mp3',
soprano_sax: 'soprano_sax-mp3',
steel_drums: 'steel_drums-mp3',
string_ensemble_1: 'string_ensemble_1-mp3',
string_ensemble_2: 'string_ensemble_2-mp3',
synth_bass_1: 'synth_bass_1-mp3',
synth_bass_2: 'synth_bass_2-mp3',
synth_brass_1: 'synth_brass_1-mp3',
synth_brass_2: 'synth_brass_2-mp3',
synth_choir: 'synth_choir-mp3',
synth_drum: 'synth_drum-mp3',
synth_strings_1: 'synth_strings_1-mp3',
synth_strings_2: 'synth_strings_2-mp3',
taiko_drum: 'taiko_drum-mp3',
tango_accordion: 'tango_accordion-mp3',
telephone_ring: 'telephone_ring-mp3',
tenor_sax: 'tenor_sax-mp3',
timpani: 'timpani-mp3',
tinkle_bell: 'tinkle_bell-mp3',
tremolo_strings: 'tremolo_strings-mp3',
trombone: 'trombone-mp3',
trumpet: 'trumpet-mp3',
tuba: 'tuba-mp3',
tubular_bells: 'tubular_bells-mp3',
vibraphone: 'vibraphone-mp3',
viola: 'viola-mp3',
violin: 'violin-mp3',
voice_oohs: 'voice_oohs-mp3',
whistle: 'whistle-mp3',
woodblock: 'woodblock-mp3',
xylophone: 'xylophone-mp3',
}


const instrument_svgs = {"bass":"electric_bass_finger","piano":"acoustic_grand_piano","guitar":"acoustic_guitar_nylon","saxophone":"alto_sax","applause":"applause","cello":"cello","organ":"church_organ","electric-guitar":"electric_guitar_clean","violin":"violin"}

export {
  VALID_KEYS,
  instruments,
  SONGS,
  notes,
  POSITIONS,
  instrument_svgs
};
  