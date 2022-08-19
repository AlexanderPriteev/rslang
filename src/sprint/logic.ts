import { renderWindowGame } from './renderGame';

export function startSprint() {
  const container = document.querySelector('div.sprint-container');

  renderWindowGame('body');
  container?.classList.add('hidden');
}
