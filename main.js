(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpAnimation = void 0;
function setUpAnimation() {
    if (document.visibilityState === 'hidden') {
        document.addEventListener('visibilitychange', () => {
            runOnLoadAnimation();
        });
    }
    else {
        runOnLoadAnimation();
    }
}
exports.setUpAnimation = setUpAnimation;
function runOnLoadAnimation() {
    const container = document.querySelector('#home-header');
    const heading = container.querySelector('h1');
    const subheading = container.querySelector('h2');
    const homeContent = document.querySelector('#home-content');
    const navBar = document.querySelector('nav');
    const homeMenuItem = Array.from(navBar.querySelectorAll('ul a'))
        .find(anchor => anchor.getAttribute('href') === '#home');
    container.style.position = 'relative';
    heading.style.visibility = 'hidden';
    subheading.style.visibility = 'hidden';
    homeContent.style.visibility = 'hidden';
    homeContent.style.opacity = '0';
    navBar.style.visibility = 'hidden';
    navBar.style.opacity = '0';
    const headingVisible = heading.cloneNode(true);
    const subheadingVisible = subheading.cloneNode(true);
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
    const start = headingVisible.childNodes[0];
    addCursorEffect(start);
    const firstCall = {
        text: headingVisible,
        currentPosition: start
    };
    const secondCall = {
        text: subheadingVisible,
        currentPosition: headingVisible.lastChild
    };
    const showAll = () => {
        setTimeout(() => {
            homeContent.style.visibility = 'visible';
            homeContent.style.opacity = '1';
            navBar.style.visibility = 'visible';
            navBar.style.opacity = '1';
            homeMenuItem.classList.add('active');
        }, 150);
    };
    write([firstCall, secondCall], 2500, showAll);
}
function write(calls, startingPause, end) {
    const text = calls[0].text;
    const currentPosition = calls[0].currentPosition;
    const nodes = text.childNodes;
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
                }
                else {
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
function separateCharacters(element) {
    let separated = '';
    const content = element.innerHTML;
    for (let i = 0; i < content.length; i++) {
        separated += `<span style="visibility: hidden;">${content[i]}</span>`;
    }
    separated += '<span style="visibility: hidden;">&nbsp;</span>';
    return separated;
}
function addCursorEffect(element) {
    element.style.animation = 'cursor-effect .75s step-end infinite';
    element.style.visibility = 'visible';
}
},{}],2:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const navbar_1 = require("./navbar");
const home_animation_1 = require("./home-animation");
const portfolio_1 = require("./portfolio");
window.addEventListener('DOMContentLoaded', () => __awaiter(void 0, void 0, void 0, function* () {
    navbar_1.setUpNavBar();
    home_animation_1.setUpAnimation();
    yield portfolio_1.setUpPortfolio();
}));
},{"./home-animation":1,"./navbar":3,"./portfolio":4}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpNavBar = void 0;
function setUpNavBar() {
    const container = document.querySelector('nav');
    const hamburguer = container.querySelector('i');
    const menu = container.querySelector('ul');
    const liItems = Array.from(menu.querySelectorAll('li'));
    const aItems = liItems.map(liItem => liItem.firstChild);
    aItems.forEach((item, _, array) => {
        item.addEventListener('click', () => { toggleActive(item, array); });
    });
}
exports.setUpNavBar = setUpNavBar;
function toggleActive(newActive, all) {
    const previousActive = all.find(item => item.classList.contains('active'));
    previousActive.classList.remove('active');
    newActive.classList.add('active');
}
},{}],4:[function(require,module,exports){
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUpPortfolio = void 0;
class PorfolioPage {
    constructor() {
        this.fields = this.getPageFields();
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new PorfolioPage();
        return this.instance;
    }
    fillPage(project) {
        const fields = Object.keys(project);
        for (const field of fields) {
            this.fillField(field, project[field]);
        }
    }
    getPageFields() {
        return {
            title: document.getElementById('project-title'),
            img: document.getElementById('project-img'),
            description: document.getElementById('project-description'),
            date: document.getElementById('project-date'),
            technologies: document.getElementById('project-technologies'),
            source: document.getElementById('project-source'),
            deployed: document.getElementById('project-deployed'),
        };
    }
    fillField(field, content) {
        switch (field) {
            case 'title':
            case 'description':
            case 'date':
            case 'technologies':
                this.fields[field].innerHTML = content;
                if (field === 'title') {
                    this.fields[field].alt = content;
                }
                break;
            case 'img':
                this.fields[field].src = content;
                break;
            case 'deployed':
            case 'source':
                this.fields[field].href = content;
        }
    }
}
function fetchProjects() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('./projects.json');
        if (!response.ok) {
            throw new Error('Could not fetch portfolio projects data.');
        }
        else {
            const projects = yield response.json();
            return projects;
        }
    });
}
function setUpPortfolio() {
    return __awaiter(this, void 0, void 0, function* () {
        const projects = yield fetchProjects();
        const page = PorfolioPage.getInstance();
        page.fillPage(projects[0]);
    });
}
exports.setUpPortfolio = setUpPortfolio;
},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvaG9tZS1hbmltYXRpb24udHMiLCJzcmMvbWFpbi50cyIsInNyYy9uYXZiYXIudHMiLCJzcmMvcG9ydGZvbGlvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7O0FDQUEsU0FBZ0IsY0FBYztJQUM1QixJQUFJLFFBQVEsQ0FBQyxlQUFlLEtBQUssUUFBUSxFQUFFO1FBQ3pDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLEVBQUU7WUFDakQsa0JBQWtCLEVBQUUsQ0FBQztRQUN2QixDQUFDLENBQUMsQ0FBQztLQUNKO1NBQU07UUFDTCxrQkFBa0IsRUFBRSxDQUFDO0tBQ3RCO0FBQ0gsQ0FBQztBQVJELHdDQVFDO0FBRUQsU0FBUyxrQkFBa0I7SUFDekIsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxjQUFjLENBQW1CLENBQUM7SUFDM0UsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQXVCLENBQUM7SUFDcEUsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQXVCLENBQUM7SUFDdkUsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQW1CLENBQUM7SUFDOUUsTUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQWdCLENBQUM7SUFDNUQsTUFBTSxZQUFZLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDN0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsS0FBSyxPQUFPLENBQXNCLENBQUM7SUFFaEYsU0FBUyxDQUFDLEtBQUssQ0FBQyxRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RDLE9B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QyxHQUFHLEdBQUcsT0FBTyxDQUFDO2dCQUN2RCxNQUFNO1lBQ1IsS0FBSyxVQUFVLENBQUM7WUFDaEIsS0FBSyxRQUFRO2dCQUNWLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUF1QixDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7U0FDNUQ7SUFDSCxDQUFDO0NBQ0Y7QUFFRCxTQUFlLGFBQWE7O1FBQzFCLE1BQU0sUUFBUSxHQUFHLE1BQU0sS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQywwQ0FBMEMsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxNQUFNLFFBQVEsR0FBRyxNQUFNLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN2QyxPQUFPLFFBQVEsQ0FBQztTQUNqQjtJQUNILENBQUM7Q0FBQTtBQUVELFNBQWUsY0FBYzs7UUFDM0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxhQUFhLEVBQUUsQ0FBQztRQUN2QyxNQUFNLElBQUksR0FBRyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0NBQUE7QUFFUSx3Q0FBYyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImV4cG9ydCBmdW5jdGlvbiBzZXRVcEFuaW1hdGlvbigpIHtcclxuICBpZiAoZG9jdW1lbnQudmlzaWJpbGl0eVN0YXRlID09PSAnaGlkZGVuJykge1xyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsICgpID0+IHtcclxuICAgICAgcnVuT25Mb2FkQW5pbWF0aW9uKCk7XHJcbiAgICB9KTtcclxuICB9IGVsc2Uge1xyXG4gICAgcnVuT25Mb2FkQW5pbWF0aW9uKCk7XHJcbiAgfVxyXG59XHJcblxyXG5mdW5jdGlvbiBydW5PbkxvYWRBbmltYXRpb24oKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUtaGVhZGVyJykgYXMgSFRNTERpdkVsZW1lbnQ7XHJcbiAgY29uc3QgaGVhZGluZyA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdoMScpIGFzIEhUTUxIZWFkaW5nRWxlbWVudDtcclxuICBjb25zdCBzdWJoZWFkaW5nID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ2gyJykgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gIGNvbnN0IGhvbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2hvbWUtY29udGVudCcpIGFzIEhUTUxEaXZFbGVtZW50O1xyXG4gIGNvbnN0IG5hdkJhciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ25hdicpIGFzIEhUTUxFbGVtZW50O1xyXG4gIGNvbnN0IGhvbWVNZW51SXRlbSA9IEFycmF5LmZyb20obmF2QmFyLnF1ZXJ5U2VsZWN0b3JBbGwoJ3VsIGEnKSlcclxuICAgIC5maW5kKGFuY2hvciA9PiBhbmNob3IuZ2V0QXR0cmlidXRlKCdocmVmJykgPT09ICcjaG9tZScpIGFzIEhUTUxBbmNob3JFbGVtZW50O1xyXG5cclxuICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xyXG4gIGhlYWRpbmcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gIHN1YmhlYWRpbmcuc3R5bGUudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xyXG4gIGhvbWVDb250ZW50LnN0eWxlLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcclxuICBob21lQ29udGVudC5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gIG5hdkJhci5zdHlsZS52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XHJcbiAgbmF2QmFyLnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcblxyXG4gIGNvbnN0IGhlYWRpbmdWaXNpYmxlID0gaGVhZGluZy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gIGNvbnN0IHN1YmhlYWRpbmdWaXNpYmxlID0gc3ViaGVhZGluZy5jbG9uZU5vZGUodHJ1ZSkgYXMgSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gIGhlYWRpbmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG4gIHN1YmhlYWRpbmcuc3R5bGUucG9zaXRpb24gPSAnYWJzb2x1dGUnO1xyXG5cclxuICBoZWFkaW5nVmlzaWJsZS5zdHlsZS5wb3NpdGlvbiA9ICdzdGF0aWMnO1xyXG4gIHN1YmhlYWRpbmdWaXNpYmxlLnN0eWxlLnBvc2l0aW9uID0gXCJzdGF0aWNcIjtcclxuICBjb250YWluZXIuYXBwZW5kQ2hpbGQoaGVhZGluZ1Zpc2libGUpO1xyXG4gIGNvbnRhaW5lci5hcHBlbmRDaGlsZChzdWJoZWFkaW5nVmlzaWJsZSk7XHJcblxyXG4gIGhlYWRpbmdWaXNpYmxlLmlubmVySFRNTCA9IHNlcGFyYXRlQ2hhcmFjdGVycyhoZWFkaW5nVmlzaWJsZSk7XHJcbiAgc3ViaGVhZGluZ1Zpc2libGUuaW5uZXJIVE1MID0gc2VwYXJhdGVDaGFyYWN0ZXJzKHN1YmhlYWRpbmdWaXNpYmxlKTtcclxuICBoZWFkaW5nVmlzaWJsZS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gIHN1YmhlYWRpbmdWaXNpYmxlLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcblxyXG4gIGNvbnN0IHN0YXJ0ID0gaGVhZGluZ1Zpc2libGUuY2hpbGROb2Rlc1swXSBhcyBIVE1MU3BhbkVsZW1lbnQ7XHJcbiAgYWRkQ3Vyc29yRWZmZWN0KHN0YXJ0KTtcclxuXHJcbiAgY29uc3QgZmlyc3RDYWxsOiBDYWxsID0ge1xyXG4gICAgdGV4dDogaGVhZGluZ1Zpc2libGUsXHJcbiAgICBjdXJyZW50UG9zaXRpb246IHN0YXJ0XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2Vjb25kQ2FsbDogQ2FsbCA9IHtcclxuICAgIHRleHQ6IHN1YmhlYWRpbmdWaXNpYmxlLFxyXG4gICAgY3VycmVudFBvc2l0aW9uOiBoZWFkaW5nVmlzaWJsZS5sYXN0Q2hpbGQgYXMgSFRNTFNwYW5FbGVtZW50XHJcbiAgfTtcclxuXHJcbiAgY29uc3Qgc2hvd0FsbCA9ICgpID0+IHtcclxuICAgIHNldFRpbWVvdXQoKCkgPT4geyBcclxuICAgICAgaG9tZUNvbnRlbnQuc3R5bGUudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcclxuICAgICAgaG9tZUNvbnRlbnQuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgbmF2QmFyLnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbiAgICAgIG5hdkJhci5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICBob21lTWVudUl0ZW0uY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9LCAxNTApO1xyXG4gIH1cclxuXHJcbiAgd3JpdGUoW2ZpcnN0Q2FsbCwgc2Vjb25kQ2FsbF0sIDI1MDAsIHNob3dBbGwpO1xyXG59XHJcblxyXG5pbnRlcmZhY2UgQ2FsbCB7XHJcbiAgdGV4dDogSFRNTEhlYWRpbmdFbGVtZW50O1xyXG4gIGN1cnJlbnRQb3NpdGlvbjogSFRNTFNwYW5FbGVtZW50O1xyXG59XHJcblxyXG5mdW5jdGlvbiB3cml0ZShjYWxsczogQ2FsbFtdLCBzdGFydGluZ1BhdXNlOiBudW1iZXIsIGVuZDogRnVuY3Rpb24pIHtcclxuICBjb25zdCB0ZXh0ID0gY2FsbHNbMF0udGV4dDtcclxuICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSBjYWxsc1swXS5jdXJyZW50UG9zaXRpb247XHJcbiAgY29uc3Qgbm9kZXMgPSB0ZXh0LmNoaWxkTm9kZXMgYXMgTm9kZUxpc3RPZjxIVE1MU3BhbkVsZW1lbnQ+O1xyXG5cclxuICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBjb25zdCB0aW1lciA9IGkgPT09IDAgPyBzdGFydGluZ1BhdXNlIDogKGkgKiA4MCArIHN0YXJ0aW5nUGF1c2UpO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgIGlmIChpID09PSAwKSB7XHJcbiAgICAgICAgY3VycmVudFBvc2l0aW9uLnN0eWxlLmFuaW1hdGlvbiA9ICcnO1xyXG4gICAgICAgIG5vZGVzW2ldLnN0eWxlLmJhY2tncm91bmRDb2xvciA9ICd2YXIoLS1tZWRpdW0pJztcclxuICAgICAgICBub2Rlc1tpXS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICAgIHJldHVybjtcclxuICAgICAgfVxyXG5cclxuICAgICAgaWYgKGkgPT09IG5vZGVzLmxlbmd0aCAtIDEpIHtcclxuICAgICAgICBhZGRDdXJzb3JFZmZlY3Qobm9kZXNbaV0pO1xyXG4gICAgICAgIG5vZGVzW2kgLSAxXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG5cclxuICAgICAgICBpZiAoY2FsbHMubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgY2FsbHMuc3BsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgd3JpdGUoY2FsbHMsIDEzMDAsIGVuZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIGVuZCgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBub2Rlc1tpXS5zdHlsZS52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xyXG4gICAgICBub2Rlc1tpXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndmFyKC0tbWVkaXVtKSc7XHJcbiAgICAgIG5vZGVzW2kgLSAxXS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xyXG4gICAgfSwgdGltZXIpO1xyXG4gIH1cclxufVxyXG5cclxuZnVuY3Rpb24gc2VwYXJhdGVDaGFyYWN0ZXJzKGVsZW1lbnQ6IEhUTUxIZWFkaW5nRWxlbWVudCkge1xyXG4gIGxldCBzZXBhcmF0ZWQgPSAnJztcclxuICBjb25zdCBjb250ZW50ID0gZWxlbWVudC5pbm5lckhUTUw7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb250ZW50Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICBzZXBhcmF0ZWQgKz0gYDxzcGFuIHN0eWxlPVwidmlzaWJpbGl0eTogaGlkZGVuO1wiPiR7Y29udGVudFtpXX08L3NwYW4+YDtcclxuICB9XHJcbiAgc2VwYXJhdGVkICs9ICc8c3BhbiBzdHlsZT1cInZpc2liaWxpdHk6IGhpZGRlbjtcIj4mbmJzcDs8L3NwYW4+JztcclxuICByZXR1cm4gc2VwYXJhdGVkO1xyXG59XHJcblxyXG5mdW5jdGlvbiBhZGRDdXJzb3JFZmZlY3QoZWxlbWVudDogSFRNTFNwYW5FbGVtZW50KSB7XHJcbiAgZWxlbWVudC5zdHlsZS5hbmltYXRpb24gPSAnY3Vyc29yLWVmZmVjdCAuNzVzIHN0ZXAtZW5kIGluZmluaXRlJztcclxuICBlbGVtZW50LnN0eWxlLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XHJcbn1cclxuIiwiaW1wb3J0IHsgc2V0VXBOYXZCYXIgfSBmcm9tICcuL25hdmJhcic7XHJcbmltcG9ydCB7IHNldFVwQW5pbWF0aW9uIH0gZnJvbSAnLi9ob21lLWFuaW1hdGlvbic7XHJcbmltcG9ydCB7IHNldFVwUG9ydGZvbGlvIH0gZnJvbSAnLi9wb3J0Zm9saW8nO1xyXG5cclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBhc3luYyAoKSA9PiB7XHJcbiAgc2V0VXBOYXZCYXIoKTtcclxuICBzZXRVcEFuaW1hdGlvbigpO1xyXG4gIGF3YWl0IHNldFVwUG9ydGZvbGlvKCk7XHJcbn0pO1xyXG4iLCJleHBvcnQgZnVuY3Rpb24gc2V0VXBOYXZCYXIoKSB7XHJcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbmF2JykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3QgaGFtYnVyZ3VlciA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdpJykgYXMgSFRNTEVsZW1lbnQ7XHJcbiAgY29uc3QgbWVudSA9IGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCd1bCcpIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XHJcbiAgY29uc3QgbGlJdGVtcyA9IEFycmF5LmZyb20obWVudS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKSBhcyBIVE1MTElFbGVtZW50W107XHJcbiAgY29uc3QgYUl0ZW1zID0gbGlJdGVtcy5tYXAobGlJdGVtID0+IGxpSXRlbS5maXJzdENoaWxkKSBhcyBIVE1MQW5jaG9yRWxlbWVudFtdO1xyXG5cclxuICBhSXRlbXMuZm9yRWFjaCgoaXRlbSwgXywgYXJyYXkpID0+IHtcclxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7IHRvZ2dsZUFjdGl2ZShpdGVtLCBhcnJheSk7IH0pO1xyXG4gIH0pO1xyXG59XHJcblxyXG5mdW5jdGlvbiB0b2dnbGVBY3RpdmUobmV3QWN0aXZlOiBIVE1MQW5jaG9yRWxlbWVudCwgYWxsOiBIVE1MQW5jaG9yRWxlbWVudFtdKTogdm9pZCB7XHJcbiAgY29uc3QgcHJldmlvdXNBY3RpdmUgPSBcclxuICAgIGFsbC5maW5kKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcclxuXHJcbiAgcHJldmlvdXNBY3RpdmUuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XHJcbiAgbmV3QWN0aXZlLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG59XHJcbiIsImludGVyZmFjZSBQcm9qZWN0IHtcclxuICB0aXRsZTogc3RyaW5nO1xyXG4gIGltZzogc3RyaW5nO1xyXG4gIGRlc2NyaXB0aW9uOiBzdHJpbmc7XHJcbiAgZGF0ZTogc3RyaW5nO1xyXG4gIHRlY2hub2xvZ2llczogc3RyaW5nO1xyXG4gIHNvdXJjZTogc3RyaW5nO1xyXG4gIGRlcGxveWVkOiBzdHJpbmc7XHJcbn1cclxuXHJcbnR5cGUgUG9ydGZvbGlvRmllbGQgPSBrZXlvZiBQcm9qZWN0O1xyXG5cclxudHlwZSBQb3J0Zm9saW9GaWVsZHMgPSBSZWNvcmQ8UG9ydGZvbGlvRmllbGQsIEhUTUxFbGVtZW50PjtcclxuXHJcbmNsYXNzIFBvcmZvbGlvUGFnZSB7XHJcbiAgcHJpdmF0ZSBzdGF0aWMgaW5zdGFuY2U6IFBvcmZvbGlvUGFnZSB8IHVuZGVmaW5lZDtcclxuICBcclxuICBwcml2YXRlIGZpZWxkczogUG9ydGZvbGlvRmllbGRzO1xyXG4gIFxyXG4gIHByaXZhdGUgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmZpZWxkcyA9IHRoaXMuZ2V0UGFnZUZpZWxkcygpO1xyXG4gIH1cclxuICBcclxuICBwdWJsaWMgc3RhdGljIGdldEluc3RhbmNlKCkge1xyXG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFBvcmZvbGlvUGFnZSgpO1xyXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XHJcbiAgfVxyXG5cclxuICBwdWJsaWMgZmlsbFBhZ2UocHJvamVjdDogUHJvamVjdCkge1xyXG4gICAgY29uc3QgZmllbGRzID0gT2JqZWN0LmtleXMocHJvamVjdCkgYXMgUG9ydGZvbGlvRmllbGRbXTtcclxuICAgIGZvciAoY29uc3QgZmllbGQgb2YgZmllbGRzKSB7XHJcbiAgICAgIHRoaXMuZmlsbEZpZWxkKGZpZWxkLCBwcm9qZWN0W2ZpZWxkXSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwcml2YXRlIGdldFBhZ2VGaWVsZHMoKTogUG9ydGZvbGlvRmllbGRzIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIHRpdGxlOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvamVjdC10aXRsZScpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICBpbWc6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LWltZycpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICBkZXNjcmlwdGlvbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGVzY3JpcHRpb24nKSBhcyBIVE1MRWxlbWVudCxcclxuICAgICAgZGF0ZTogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGF0ZScpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICB0ZWNobm9sb2dpZXM6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXRlY2hub2xvZ2llcycpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICBzb3VyY2U6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm9qZWN0LXNvdXJjZScpIGFzIEhUTUxFbGVtZW50LFxyXG4gICAgICBkZXBsb3llZDogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2plY3QtZGVwbG95ZWQnKSBhcyBIVE1MRWxlbWVudCxcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHByaXZhdGUgZmlsbEZpZWxkKGZpZWxkOiBQb3J0Zm9saW9GaWVsZCwgY29udGVudDogc3RyaW5nKSB7XHJcbiAgICBzd2l0Y2ggKGZpZWxkKSB7XHJcbiAgICAgIGNhc2UgJ3RpdGxlJzpcclxuICAgICAgY2FzZSAnZGVzY3JpcHRpb24nOlxyXG4gICAgICBjYXNlICdkYXRlJzpcclxuICAgICAgY2FzZSAndGVjaG5vbG9naWVzJzpcclxuICAgICAgICB0aGlzLmZpZWxkc1tmaWVsZF0uaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICBpZiAoZmllbGQgPT09ICd0aXRsZScpIHtcclxuICAgICAgICAgICh0aGlzLmZpZWxkc1tmaWVsZF0gYXMgSFRNTEltYWdlRWxlbWVudCkuYWx0ID0gY29udGVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2ltZyc6XHJcbiAgICAgICAgKHRoaXMuZmllbGRzW2ZpZWxkXSBhcyBIVE1MSW1hZ2VFbGVtZW50KS5zcmMgPSBjb250ZW50O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdkZXBsb3llZCc6XHJcbiAgICAgIGNhc2UgJ3NvdXJjZSc6XHJcbiAgICAgICAgKHRoaXMuZmllbGRzW2ZpZWxkXSBhcyBIVE1MQW5jaG9yRWxlbWVudCkuaHJlZiA9IGNvbnRlbnQ7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5hc3luYyBmdW5jdGlvbiBmZXRjaFByb2plY3RzKCk6IFByb21pc2U8UHJvamVjdFtdPiB7XHJcbiAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaCgnLi9wcm9qZWN0cy5qc29uJyk7XHJcbiAgaWYgKCFyZXNwb25zZS5vaykge1xyXG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmV0Y2ggcG9ydGZvbGlvIHByb2plY3RzIGRhdGEuJyk7XHJcbiAgfSBlbHNlIHtcclxuICAgIGNvbnN0IHByb2plY3RzID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xyXG4gICAgcmV0dXJuIHByb2plY3RzO1xyXG4gIH1cclxufVxyXG5cclxuYXN5bmMgZnVuY3Rpb24gc2V0VXBQb3J0Zm9saW8oKSB7XHJcbiAgY29uc3QgcHJvamVjdHMgPSBhd2FpdCBmZXRjaFByb2plY3RzKCk7XHJcbiAgY29uc3QgcGFnZSA9IFBvcmZvbGlvUGFnZS5nZXRJbnN0YW5jZSgpO1xyXG4gIHBhZ2UuZmlsbFBhZ2UocHJvamVjdHNbMF0pO1xyXG59XHJcblxyXG5leHBvcnQgeyBzZXRVcFBvcnRmb2xpbyB9O1xyXG4iXX0=
