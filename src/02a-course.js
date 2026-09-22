/* ================================================================ the study guide
   From the "Study Guide for Exam 2" handout (MRKT 3600, Fall 2026). Everything on
   this page is on the handout; nothing else is.                                  */
var COURSE = {
 code:"MRKT 3600 Principles of Marketing", term:"Fall 2026",
 exam:"Study Guide for Exam 2", scope:"Chapters 5–8 of <i>Principles of Marketing</i> by Kotler and Armstrong, 20th edition",
 rules:[
  "The following sections contain the information you should master to be prepared for Exam 2.",
  "Be sure to review all of the content in the subsections.",
  "Also, master slides that I emphasized in class as “important.”",
  "Note that you may be asked questions that involve applying some of the concepts and definitions we covered."],
 about:"Every heading below is a heading from the handout, in its order and words. Each one has the subsections it covers, a one-breath answer, and a link into the notes. Only what the handout asks for is on this page — the notes, the flashcards, the quizzes and the practice exam all stay inside it."
};

/* One item per section on the handout. "a" is the note section; "subs" are the
   subsections inside it.                                                         */
var GUIDE = {sections:[
 {h:"Chapter 5", tp:"c5", items:[
  {id:"g5-model", t:"Model of Consumer Behavior", a:"c5-model",
   short:"Consumer buyer behavior and consumer markets, defined. Figure 5.1: marketing stimuli (the four Ps) and other stimuli (economic, technological, social, cultural) enter the buyer’s black box — characteristics and decision process — and come out as responses: attitudes and preferences, purchase behavior, brand engagement.",
   subs:[["Figure 5.1", "c5-model"]]},
  {id:"g5-chars", t:"Characteristics Affecting Consumer Behavior", a:"c5-chars",
   short:"The four factors of Figure 5.2. Cultural: culture, subculture, social class. Social: groups and social networks, family, roles and status. Personal: age and life-cycle stage, occupation, economic situation, lifestyle, personality and self-concept. Psychological: motivation (Maslow), perception, learning, beliefs and attitudes.",
   subs:[["The four factors", "c5-factors"], ["Cultural", "c5-cultural"], ["Social", "c5-social"], ["Personal", "c5-personal"], ["Psychological", "c5-psych"]]},
  {id:"g5-decide", t:"Buying Decision Behavior and The Buyer Decision Process", a:"c5-decide",
   short:"Figure 5.4: complex, dissonance-reducing, variety-seeking and habitual buying, by involvement and brand differences. Figure 5.5: need recognition → information search → evaluation of alternatives → purchase decision → postpurchase behavior; cognitive dissonance; the customer journey.",
   subs:[["Four types of buying behavior", "c5-types"], ["The five stages", "c5-process"]]},
  {id:"g5-newprod", t:"The Buyer Decision Process for New Products", a:"c5-newprod",
   short:"Adoption: awareness, interest, evaluation, trial, adoption. Adopter categories — innovators 2.5%, early adopters 13.5%, early mainstream 34%, late mainstream 34%, lagging adopters 16% — and their values. Rate of adoption: relative advantage, compatibility, complexity, trialability, observability.",
   subs:[["The adoption process", "c5-adoption"], ["Adopter categories", "c5-adopters"], ["Rate of adoption", "c5-rate"]]}]},
 {h:"Chapter 6", tp:"c6", items:[
  {id:"g6-intro", t:"Introduction", a:"c6-intro",
   short:"Business buyer behavior: the buying behavior of organizations that buy goods and services to make other products and services that are sold, rented or supplied to others. The business buying process. Most large companies sell to other organizations, and the business market involves far more dollars and items than consumer markets.",
   subs:[["Definitions and the numbers", "c6-intro"]]},
  {id:"g6-markets", t:"Business Markets", a:"c6-markets",
   short:"How business markets differ: fewer but larger buyers; derived, inelastic and fluctuating demand; a buying unit with more participants, more professional effort, more interaction and more time; more complex decisions; supplier development. The class’s consumer-vs-business table. Figure 6.1.",
   subs:[["Structure and demand", "c6-demand"], ["The comparison table", "c6-table"], ["Figure 6.1", "c6-model"]]},
  {id:"g6-behavior", t:"Business Buyer Behavior", a:"c6-behavior",
   short:"Straight rebuy, modified rebuy and new task (the class’s envelope); systems selling. The buying center and its five roles — users, influencers, buyers, deciders, gatekeepers. Figure 6.2: environmental, organizational, interpersonal and individual influences.",
   subs:[["Buying situations", "c6-situations"], ["The buying center", "c6-center"], ["Influences · Figure 6.2", "c6-influences"]]},
  {id:"g6-process", t:"The Business Buyer Decision Process", a:"c6-process",
   short:"The eight steps: problem recognition, general need description, product specification, supplier search, proposal solicitation, supplier selection, order-routine specification, performance review. E-procurement and online purchasing — its ways, advantages and disadvantage.",
   subs:[["The eight steps", "c6-steps"], ["E-procurement", "c6-eproc"]]}]},
 {h:"Chapter 7", tp:"c7", items:[
  {id:"g7-strategy", t:"Marketing Strategy", a:"c7-strategy",
   short:"Figure 7.1: segmentation and targeting select the customers to serve; differentiation and positioning decide the value proposition — to create value for targeted customers. The two questions: which customers will we serve, and how?",
   subs:[["Figure 7.1", "c7-strategy"]]},
  {id:"g7-seg", t:"Market Segmentation", a:"c7-seg",
   short:"Geographic, demographic (age and life cycle, gender, income), psychographic (social class, lifestyle, personality) and behavioral bases (occasions, benefits sought, user status, usage rate, loyalty status); multiple segmentation bases; the five requirements — measurable, accessible, substantial, differentiable, actionable.",
   subs:[["The bases", "c7-bases"], ["Requirements for effective segmentation", "c7-req"]]},
  {id:"g7-target", t:"Market Targeting", a:"c7-target",
   short:"Evaluating segments — size and growth, structural attractiveness, company objectives and resources. Figure 7.2, broad to narrow: undifferentiated, differentiated, concentrated, micromarketing (local and individual). The five factors in choosing a strategy.",
   subs:[["Evaluating segments", "c7-eval"], ["Figure 7.2 strategies", "c7-strategies"], ["Choosing a strategy", "c7-choose"]]},
  {id:"g7-position", t:"Differentiation and Positioning", a:"c7-position",
   short:"Product position; competitive advantage; differentiating on product, services, channels, people, image; the seven criteria for a worthwhile difference; Figure 7.4 value propositions; the positioning statement; communicating and delivering the position.",
   subs:[["Differentiation", "c7-diff"], ["Value propositions · Figure 7.4", "c7-value"], ["Positioning statement", "c7-statement"]]}]},
 {h:"Chapter 8", tp:"c8", items:[
  {id:"g8-what", t:"What is a Product", a:"c8-what",
   short:"Product and service, defined. Figure 8.1: core customer value, actual product, augmented product. Consumer products — convenience, shopping, specialty, unsought (Table 8.1) — and industrial products; organizations, persons, places and ideas as products.",
   subs:[["Three levels · Figure 8.1", "c8-levels"], ["Classifications", "c8-class"]]},
  {id:"g8-decisions", t:"Product and Service Decisions", a:"c8-decisions",
   short:"Product attributes — quality (level and consistency), features, style and design; branding; packaging; labeling; product support services. Product lines (length, stretching, filling) and the product mix (width, length, depth, consistency).",
   subs:[["Individual product decisions", "c8-attributes"], ["Lines and the mix", "c8-lines"]]},
  {id:"g8-services", t:"Services Marketing", a:"c8-services",
   short:"The four characteristics — intangibility, inseparability, variability, perishability. The service-profit chain. Internal and interactive marketing; service differentiation, quality and productivity.",
   subs:[["Four characteristics", "c8-four"], ["Service-profit chain", "c8-chain"], ["Three kinds of service marketing", "c8-three"]]},
  {id:"g8-brands", t:"Branding Strategy (Brand Equity and Brand Value only)", a:"c8-brands",
   short:"Brand equity: the differential effect that knowing the brand name has on customer response; BrandAsset Valuator’s four dimensions; the advantages of high equity; customer equity underneath. Brand value: the total financial value of a brand; the rankings.",
   subs:[["Brand equity", "c8-equity"], ["Brand value", "c8-value"]]}]}
]};
