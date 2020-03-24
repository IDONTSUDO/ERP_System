import React from 'react';
import * as RJD from "react-js-diagrams";
import { WhiteLinkWidget } from './WhiteLinkWidget';

export class WhiteLinkFactory extends RJD.LinkWidgetFactory {
  constructor() {
    super('WhiteLink');
  }

  generateReactWidget(diagramEngine, link) {
    return (
      <WhiteLinkWidget link={link} diagramEngine={diagramEngine} />
    );
  }
}