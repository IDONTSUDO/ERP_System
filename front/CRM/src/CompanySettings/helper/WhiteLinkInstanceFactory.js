import * as RJD from 'react-js-diagrams';
import { WhiteLinkModel } from './WhiteLinkModel';

export class WhiteLinkInstanceFactory extends RJD.AbstractInstanceFactory {
  constructor() {
    super('WhiteLinkModel');
  }

  getInstance() {
    return new WhiteLinkModel();
  }
}