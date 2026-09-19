export interface SeoExample {
  id: string;
  title: string;
  category: 'Blog' | 'Produkt' | 'Landingpage' | 'Ratgeber';
  focusKeyword?: string;
  text: string;
}

export const SEO_EXAMPLES: SeoExample[] = [
  {
    id: 'example-running-shoes',
    title: 'Produkt: Laufschuhe für Damen',
    category: 'Produkt',
    focusKeyword: 'Laufschuhe Damen Test',
    text: 'unsere neuen laufschuhe fuer damen bieten maximale dämpfung beim joggen und marathon training. das ober material ist atmungsaktiv und die sohle nutzt rutschfeste gummi mischung so das man auch bei regen nicht wegrutscht. jetzt bestellen mit schnellem versand und 30 tage rückgaberecht fuer alle läuferinnen.',
  },
  {
    id: 'example-garden-spring',
    title: 'Ratgeber: Garten im Frühling',
    category: 'Ratgeber',
    focusKeyword: 'Garten im Frühling bepflanzen',
    text: 'wenn der fruehling kommt muss der garten vorbereitet werden. viele leute wissen nicht wann man den rasen vertikutieren soll und welche blumen man im märz oder april schon pflanzen darf ohne das der frost die pflanzen kaputt macht. wir geben die besten tipps fuer hobby gärtner damit die beete schoen bluehen.',
  },
  {
    id: 'example-webdesign-agency',
    title: 'Landingpage: SEO Agentur',
    category: 'Landingpage',
    focusKeyword: 'SEO Agentur für den Mittelstand',
    text: 'suchen sie eine professionelle agentur die ihre webseite bei google ganz nach oben bringt? wir optimieren texte, keywords und die ladezeiten ihrer homepage damit sie mehr anfragen und neukunden gewinnen. kontaktieren sie uns noch heute fuer ein kostenloses erstgespräch.',
  },
  {
    id: 'example-coffee-machine',
    title: 'Blog: Siebträgermaschine Tipps',
    category: 'Blog',
    focusKeyword: 'Siebträgermaschine für Einsteiger',
    text: 'ein perfekter espresso gelingt nur mit der richtigen mahlgrad einstellung und gutem kaffeepulver. in diesem beitrag erklaeren wir worauf man beim kauf einer siebträgermaschine fuer zuhause achten muss, welcher wasserdruck noetig ist und wie man feinen milchschaum fuer cappuccino zubereitet.',
  },
];
