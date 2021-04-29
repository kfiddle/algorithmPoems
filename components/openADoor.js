
import { openContactBox } from './ContactForm.js';

const openARecursiveThing = () => {
    console.log('howdy cloudy fred');
}
const openNotes = () => {
    console.log('howdy doooooody fred');
}
const openSmokeAndMirrors = () => {
    console.log('howdy doooooody fred and tom');
}
const openProjects = () => {
    console.log('howdy mowdy fred');
}
const openAbout = () => {
    console.log('howdy doy fred toy');
}


let openingFunctions = [
    openARecursiveThing,
    openNotes,
    openSmokeAndMirrors,
    openProjects,
    openAbout,
    openContactBox,
]

export const OpenADoor = (aDoor) => {
    openingFunctions[aDoor]();
}