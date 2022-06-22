interface Project {
  title: string;
  img: string;
  description: string;
  date: string;
  technologies: string;
  source: string;
  deployed: string;
}

type PortfolioField = keyof Project;

type PortfolioFields = Record<PortfolioField, HTMLElement>;

class PorfolioPage {
  private static instance: PorfolioPage | undefined;
  
  private fields: PortfolioFields;
  
  private constructor() {
    this.fields = this.getPageFields();
  }
  
  public static getInstance() {
    if (!this.instance) this.instance = new PorfolioPage();
    return this.instance;
  }

  public fillPage(project: Project) {
    const fields = Object.keys(project) as PortfolioField[];
    for (const field of fields) {
      this.fillField(field, project[field]);
    }
  }

  private getPageFields(): PortfolioFields {
    return {
      title: document.getElementById('project-title') as HTMLElement,
      img: document.getElementById('project-img') as HTMLElement,
      description: document.getElementById('project-description') as HTMLElement,
      date: document.getElementById('project-date') as HTMLElement,
      technologies: document.getElementById('project-technologies') as HTMLElement,
      source: document.getElementById('project-source') as HTMLElement,
      deployed: document.getElementById('project-deployed') as HTMLElement,
    }
  }

  private fillField(field: PortfolioField, content: string) {
    switch (field) {
      case 'title':
      case 'description':
      case 'date':
      case 'technologies':
        this.fields[field].innerHTML = content;
        if (field === 'title') {
          (this.fields[field] as HTMLImageElement).alt = content;
        }
        break;
      case 'img':
        (this.fields[field] as HTMLImageElement).src = content;
        break;
      case 'deployed':
      case 'source':
        (this.fields[field] as HTMLAnchorElement).href = content;
    }
  }
}

async function fetchProjects(): Promise<Project[]> {
  const response = await fetch('./projects.json');
  if (!response.ok) {
    throw new Error('Could not fetch portfolio projects data.');
  } else {
    const projects = await response.json();
    return projects;
  }
}

async function setUpPortfolio() {
  const projects = await fetchProjects();
  const page = PorfolioPage.getInstance();
  page.fillPage(projects[0]);
}

export { setUpPortfolio };
