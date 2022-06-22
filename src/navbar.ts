export function setUpNavBar() {
  const container = document.querySelector('nav') as HTMLElement;
  const hamburguer = container.querySelector('i') as HTMLElement;
  const menu = container.querySelector('ul') as HTMLUListElement;
  const liItems = Array.from(menu.querySelectorAll('li')) as HTMLLIElement[];
  const aItems = liItems.map(liItem => liItem.firstChild) as HTMLAnchorElement[];

  aItems.forEach((item, _, array) => {
    item.addEventListener('click', () => { toggleActive(item, array); });
  });
}

function toggleActive(newActive: HTMLAnchorElement, all: HTMLAnchorElement[]): void {
  const previousActive = 
    all.find(item => item.classList.contains('active')) as HTMLAnchorElement;

  previousActive.classList.remove('active');
  newActive.classList.add('active');
}
