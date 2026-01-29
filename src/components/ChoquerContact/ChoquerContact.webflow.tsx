// Webflow Code Component declaration
import { declareComponent } from '@webflow/react';
import ChoquerContact from './ChoquerContact';

export default declareComponent(ChoquerContact, {
  name: 'Choquer Contact Form',
  description: 'A multi-step contact form for lead generation with AI-powered summary.',
  group: 'Forms',
  props: {},
  options: {
    ssr: true,
    applyTagSelectors: true,
  },
});
