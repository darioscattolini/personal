export function setUpAnimation() {
  if (document.visibilityState === 'hidden') {
    document.addEventListener('visibilitychange', () => {
      runOnLoadAnimation();
    });
  } else {
    runOnLoadAnimation();
  }
}

function runOnLoadAnimation() {
  const container = document.querySelector('#home-header') as HTMLDivElement;
  const heading = container.querySelector('h1') as HTMLHeadingElement;
  const subheading = container.querySelector('h2') as HTMLHeadingElement;
  const homeContent = document.querySelector('#home-content') as HTMLDivElement;
  const navBar = document.querySelector('nav') as HTMLElement;
  const homeMenuItem = Array.from(navBar.querySelectorAll('ul a'))
    .find(anchor => anchor.getAttribute('href') === '#home') as HTMLAnchorElement;

  container.style.position = 'relative';
  heading.style.visibility = 'hidden';
  subheading.style.visibility = 'hidden';
  homeContent.style.visibility = 'hidden';
  homeContent.style.opacity = '0';
  navBar.style.visibility = 'hidden';
  navBar.style.opacity = '0';

  const headingVisible = heading.cloneNode(true) as HTMLHeadingElement;
  const subheadingVisible = subheading.cloneNode(true) as HTMLHeadingElement;
  heading.style.position = 'absolute';
  subheading.style.position = 'absolute';

  headingVisible.style.position = 'static';
  subheadingVisible.style.position = "static";
  container.appendChild(headingVisible);
  container.appendChild(subheadingVisible);

  headingVisible.innerHTML = separateCharacters(headingVisible);
  subheadingVisible.innerHTML = separateCharacters(subheadingVisible);
  headingVisible.style.visibility = 'visible';
  subheadingVisible.style.visibility = 'visible';

  const start = headingVisible.childNodes[0] as HTMLSpanElement;
  addCursorEffect(start);

  const firstCall: Call = {
    text: headingVisible,
    currentPosition: start
  };

  const secondCall: Call = {
    text: subheadingVisible,
    currentPosition: headingVisible.lastChild as HTMLSpanElement
  };

  const showAll = () => {
    setTimeout(() => { 
      homeContent.style.visibility = 'visible';
      homeContent.style.opacity = '1';
      navBar.style.visibility = 'visible';
      navBar.style.opacity = '1';
      homeMenuItem.classList.add('active');
    }, 150);
  }

  write([firstCall, secondCall], 2500, showAll);
}

interface Call {
  text: HTMLHeadingElement;
  currentPosition: HTMLSpanElement;
}

function write(calls: Call[], startingPause: number, end: Function) {
  const text = calls[0].text;
  const currentPosition = calls[0].currentPosition;
  const nodes = text.childNodes as NodeListOf<HTMLSpanElement>;

  for (let i = 0; i < nodes.length; i++) {
    const timer = i === 0 ? startingPause : (i * 80 + startingPause);
    setTimeout(() => {
      if (i === 0) {
        currentPosition.style.animation = '';
        nodes[i].style.backgroundColor = 'var(--medium)';
        nodes[i].style.visibility = 'visible';
        return;
      }

      if (i === nodes.length - 1) {
        addCursorEffect(nodes[i]);
        nodes[i - 1].style.backgroundColor = 'transparent';

        if (calls.length > 1) {
          calls.splice(0, 1);
          write(calls, 1300, end);
        } else {
          end();
        }

        return;
      }

      nodes[i].style.visibility = 'visible';
      nodes[i].style.backgroundColor = 'var(--medium)';
      nodes[i - 1].style.backgroundColor = 'transparent';
    }, timer);
  }
}

function separateCharacters(element: HTMLHeadingElement) {
  let separated = '';
  const content = element.innerHTML;
  for (let i = 0; i < content.length; i++) {
    separated += `<span style="visibility: hidden;">${content[i]}</span>`;
  }
  separated += '<span style="visibility: hidden;">&nbsp;</span>';
  return separated;
}

function addCursorEffect(element: HTMLSpanElement) {
  element.style.animation = 'cursor-effect .75s step-end infinite';
  element.style.visibility = 'visible';
}
