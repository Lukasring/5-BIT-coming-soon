import { progressBarData } from './data/progressBarData.js';
import { renderProgressBar } from './components/progressBar/renderProgressBar.js';

import { socialsData } from './data/socialsData.js';
import { renderSocials } from './components/socials/renderSocials.js';


renderProgressBar('.left', progressBarData);

renderSocials('footer > .long', socialsData);