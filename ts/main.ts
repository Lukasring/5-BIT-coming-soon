import { renderProgressBar } from "./components/progressBar/renderProgressBar.js";
import { progressBarData } from "./data/progressBarData.js";
import { renderSocials } from "./components/socials/renderSocials.js";
import { socialsData } from "./data/socialsData.js";
import { Clock } from "./components/clock/Clock.js";
import { formValidation } from "./components/form/formValidation.js";

renderProgressBar(".left", progressBarData);
renderSocials("footer > .long", socialsData);

const clock = new Clock(".hero .clock");

clock.init();

formValidation();
