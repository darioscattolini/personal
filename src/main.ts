import { setUpNavBar } from './navbar';
import { setUpAnimation } from './home-animation';
import { setUpPortfolio } from './portfolio';

window.addEventListener('DOMContentLoaded', async () => {
  setUpNavBar();
  setUpAnimation();
  await setUpPortfolio();
});
