import View from './view';
import { IFighter, IFighterString} from './Interfaces';

class FighterView extends View {
  element: HTMLElement;



  constructor(fighter: IFighterString, handleClick) {
    super();


    this.createFighter(fighter, handleClick);
  }

  createFighter(fighter: IFighterString, handleClick) {
    const name: string = fighter.name;
    const source: string  = fighter.source;
    const nameElement: HTMLElement = this.createName(name);
    const imageElement: HTMLElement = this.createImage(source);
    let attributes: object = {id: `fighter${fighter._id}`};
    this.element = super.createElement({ tagName: 'div', className: 'fighter', attributes });
    this.element.append(imageElement, nameElement);
    this.element.addEventListener('click', event => handleClick(event, fighter), false);
  }

  createName(name: string) {
    const nameElement: HTMLElement = super.createElement({ tagName: 'span', className: 'name' });
    nameElement.innerText = name;

    return nameElement;
  }

  createImage(source: string) {
    const attributes: object = { src: source };
    const imgElement: HTMLElement = super.createElement({
      tagName: 'img',
      className: 'fighter-image',
      attributes
    });

    return imgElement;
  }
}

export default FighterView;