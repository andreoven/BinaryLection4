import FightersView from './fightersView';
import { fighterService } from './services/fightersService';
import '../styles/styles.css';
import {  IfightersPick} from './Interfaces';

class App {
  constructor() {
    this.startApp();
  }

  static rootElement = document.getElementById('root') as HTMLElement;
  static loadingElement = document.getElementById('loading-overlay') as HTMLElement;

  async startApp() {

    try {
      App.loadingElement.style.visibility = 'visible';
      
      const fighters: IfightersPick[] = await fighterService.getFighters();
      const fightersView = new FightersView(fighters);
      const fightersElement: HTMLElement = fightersView.element;

      App.rootElement.appendChild(fightersElement);
    } catch (error) {
      console.warn(error);
      App.rootElement.innerText = 'Failed to load data';
    } finally {
      App.loadingElement.style.visibility = 'hidden';
    }
  }
}

export default App;