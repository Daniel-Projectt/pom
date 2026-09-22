/* ================================================================ the course
   From the "Study Guide for Exam 2" handout (MRKT 3600, Fall 2026) and the four
   "enhanced" chapter decks (Pearson slides plus the professor's additions).      */
var COURSE = {
 code:"MRKT 3600 Principles of Marketing", term:"Fall 2026",
 exam:"Study Guide for Exam 2", scope:"Chapters 5–8 of <i>Principles of Marketing</i> by Kotler and Armstrong, 20th edition",
 rules:[
  "The following sections contain the information you should master to be prepared for Exam 2.",
  "Be sure to review all of the content in the subsections.",
  "Also, master slides that I emphasized in class as “important.”",
  "Note that you may be asked questions that involve applying some of the concepts and definitions we covered."],
 about:"Every heading below is a heading from the handout, in its order and words. Each one has the subsections it covers, a one-breath answer, and a link into the notes. The practice exam draws only from these sections; the material the guide leaves out is kept in the notes, labeled <b>beyond the guide</b>."
};

/* ================================================================ the study guide
   One item per section on the handout. "a" is the note section; "subs" are the
   subsections inside it. "beyond" lists what the deck covered but the handout
   does not ask for.                                                              */
var GUIDE = {sections:[
 {h:"Chapter 5", tp:"c5", beyond:"The Beyond Meat case (the class opener) is not a study-guide section.", items:[
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
 {h:"Chapter 6", tp:"c6", beyond:"Institutional and government markets, and B-to-B digital and social media marketing (objective 6.4), are in the notes but not on the handout.", items:[
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
 {h:"Chapter 7", tp:"c7", beyond:"", items:[
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
 {h:"Chapter 8", tp:"c8", beyond:"Brand sponsorship and brand development (the rest of branding strategy) and Apple’s timeline (the class opener) are in the notes but not on the handout.", items:[
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

/* ================================================================ in class */
var THEMES = [
 {tp:"c5", h:"Bond — build and treasure relationships",
  body:'<p>Chapter 5 opens on relationships before it opens on consumers. Dale Carnegie’s <i>How to Win Friends and Influence People in the Digital Age</i> is on the slide, and Steve Jobs holding the first iPhone: “…I hope that you can recognize that when you have a partner, buddy, old friend… that is true happiness.”</p>',
  quotes:[["No matter how educated, talented, rich or cool you believe you are, how you treat people ultimately tells all.","Anonymous"],
          ["No matter how brilliant your mind or strategy, if you’re playing a solo game, you’ll always lose out to a team.","Reid Hoffman"],
          ["To pursue success effectively, you must build supportive relationships that will help you work toward your goals. To build those relationships, you need to trust others; and to earn their trust, you in turn must learn to be trustworthy.","Stedman Graham"],
          ["You don’t build a business. You build people and then people build the business.",""],
          ["It’s not who you know but who knows you that fuels effective networking.",""],
          ["God’s Word and people are the only two things in this world that last forever. The wise invest their lives in those two timeless treasures.",""]],
  verse:"Ecclesiastes 4:9–12"},
 {tp:"c6", h:"Life is a matter of choices",
  body:'<p>Chapter 6 is about how organizations decide, so it opens with deciding. Fortune’s <i>The Greatest Business Decisions of All Time</i>; 1914, Henry Ford decides to double his workers’ wages. Then the key decisions in a life: faith, college, friends, spouse, career, church, hometown — and one slide that only says “The most important choice:”.</p>',
  quotes:[["Life is a matter of choices, and every choice you make makes you.","John C. Maxwell"],
          ["Life is about choices. Some we regret, some we’re proud of. Some will haunt us forever. The message: we are what we chose to be.","Graham Brown"],
          ["A moment is not a lifetime. But a lifetime can be significantly influenced by the decision made in a moment.",""],
          ["The quality of your life ultimately is shaped by the quality of your choices and decisions.","Robin Sharma"],
          ["Some decisions change what we eat for breakfast; others change the trajectory of our lives… and others… forever.",""]],
  verse:""},
 {tp:"c7", h:"What should I wear today?",
  body:'<p>Chapter 7 is about positioning — how a brand is seen. The opener turns it on us: “The most important thing to wear each day is a good attitude.”</p>',
  quotes:[],
  verse:"Philippians 4:12–13"},
 {tp:"c8", h:"Challenges are what make life interesting",
  body:'<p>Chapter 8 opens with Apple’s comeback timeline — founded 1976, Jobs pushed out in 1985, brought back in 1997, the iPod in 2001, the iPhone in 2007, a $1 trillion company in 2018 and $4.95 trillion in 2026 — under two passages about courage and perseverance.</p>',
  quotes:[["Challenges are what make life interesting. Overcoming them is what makes life meaningful.",""]],
  verse:"Joshua 1:9; James 1:2–4"}
];
var VERSES = [
 {ref:"Ecclesiastes 4:9–12", text:"Two are better than one, because they have a good reward for their labor. For if they fall, one will lift up his companion. But woe to him who is alone when he falls, for he has no one to help him up… Though one may be overpowered by another, two can withstand him. And a threefold cord is not quickly broken.", why:"Chapter 5 — Bond"},
 {ref:"Philippians 4:12–13", text:"I know what it is to be in need, and I know what it is to have plenty. I have learned the secret of being content in any and every situation, whether well fed or hungry, whether living in plenty or in want. I can do all this through him who gives me strength.", why:"Chapter 7 — a good attitude"},
 {ref:"Joshua 1:9", text:"Have I not commanded you? Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.", why:"Chapter 8 — challenges"},
 {ref:"James 1:2–4", text:"Consider it pure joy, my brothers and sisters, whenever you face trials of many kinds, because you know that the testing of your faith produces perseverance. Let perseverance finish its work so that you may be mature and complete, not lacking anything.", why:"Chapter 8 — challenges"}
];
var EVENTS = [
 ["Impact 2026 — Where Business Excellence Meets Gospel Purpose","On the chapter 5 deck. PSB seniors are free; register by the QR code on the slide."],
 ["A Legacy of Liberty: Leading with Courage at America’s 250th","Governor Scott Walker, President of Young America’s Foundation. SBCC Auditorium, September 23, 7:00 PM. On the chapter 8 deck."]
];
var VIDEOS = [
 {tp:"c5", t:"How the Beyond Meat Burger is Taking Over the Beef Industry", m:"2019 · 6:34", u:"https://www.youtube.com/watch?v=OvkgSJuGPfY", why:"The rise — then the fall on the next slide."},
 {tp:"c5", t:"Beyond Meat: How the Plant-Based Pioneer Became a Stock Market Loser", m:"2023 · 6:58", u:"https://www.youtube.com/watch?v=PqVBInU0A8s", why:"Cultural shift as opportunity, and what happens when the buyer moves on."},
 {tp:"c5", t:"How Apple and Nike have branded your brain", m:"2021 · 5:33", u:"https://www.youtube.com/watch?v=4eIDBV4Mpek&t=145s", why:"Brand personality and self-concept."},
 {tp:"c5", t:"The rise of Crumbl Cookies", m:"Jan 2026 · 11:00", u:"https://www.youtube.com/watch?v=PhU--DlSzWk", why:"Variety-seeking behavior, built into the business model."},
 {tp:"c5", t:"Why Lowe’s Is Betting On New Generations Of Shoppers", m:"Jan 2026 · 2:51", u:"https://www.youtube.com/watch?v=n4kQqLjSPdk", why:"Age and life-cycle stage."},
 {tp:"c6", t:"How LinkedIn Started A Networking Revolution", m:"2021 · 6:28", u:"https://www.youtube.com/watch?v=Alp49p_4rc8", why:"The B-to-B social selling platform, 590 million professionals."},
 {tp:"c6", t:"LinkedIn Is Having a Gen Z Moment", m:"2022 · 6:24", u:"https://www.youtube.com/watch?v=HmGkX_0QtCQ", why:""},
 {tp:"c6", t:"We Are Maersk — We move mountains", m:"2012 · 3:57", u:"https://www.youtube.com/watch?v=8u2ubaYzYt8", why:"B-to-B digital and social media marketing."},
 {tp:"c6", t:"The Rise of Maersk — Shipping’s Most Inspirational Story", m:"2024 · 2:55", u:"https://www.youtube.com/watch?v=dQwaMT-fy6o&t=15s", why:""},
 {tp:"c6", t:"AP Moller Maersk: Global Logistics Simplified", m:"2022 · 5:04", u:"https://www.youtube.com/watch?v=FBJbGSXWIdE", why:""},
 {tp:"c6", t:"History of Caterpillar Inc.", m:"2019 · 20:00", u:"https://www.youtube.com/watch?v=46_EC6teOqg", why:"A business marketer selling to businesses and governments."},
 {tp:"c7", t:"Tide — History video", m:"2023 · 3:11", u:"https://www.youtube.com/watch?v=pqDVVwE7YIg&t=25s", why:"P&G competing with itself — and winning."},
 {tp:"c7", t:"Tide — “It’s a Tide Ad” case study", m:"2019 · 2:00", u:"https://www.youtube.com/watch?v=M4VKspkvWlU", why:"Positioning through image."},
 {tp:"c7", t:"Tide | School Lunch", m:"Dec 2024 · 0:31", u:"https://www.youtube.com/watch?v=xPHs8yT8cPM", why:""},
 {tp:"c7", t:"Why Liquid Death’s Branding Sells — Even Though Its Water Isn’t Special (WSJ)", m:"2025 · 6:40", u:"https://www.youtube.com/watch?v=UfpBPk8HiaY&t=257s", why:"Positioning canned water as the eco-friendly alternative; 10% of profits to #DeathToPlastics."},
 {tp:"c7", t:"Neuro Marketing | Shot by Shot", m:"May 2020 · 4:22", u:"https://www.youtube.com/watch?v=WcQDr4HxPKU", why:""},
 {tp:"c8", t:"The Man Behind Starbucks Reveals How He Changed the World", m:"2016 · 5:11", u:"https://www.youtube.com/watch?v=LnA7n9qSB7E", why:"The Starbucks Experience — the third place."},
 {tp:"c8", t:"“The shine is back on Starbucks,” says CEO Brian Niccol", m:"Sep 2026 · 4:44", u:"https://www.youtube.com/watch?v=kJxONRGhEPs", why:""},
 {tp:"c8", t:"Payless “Palessi” stunt", m:"", u:"https://www.youtube.com/watch?v=JFXmIh4P2dM", why:"Influencers paid up to $645 for shoes that sell for under $40 — the power of a brand."},
 {tp:"c8", t:"Why Chick-fil-A Is So Successful", m:"2022 · 2:53", u:"https://www.youtube.com/watch?v=99-0gclQBy8", why:"Quality as a positioning tool; the service-profit chain."},
 {tp:"c8", t:"Most valuable brands 2000–2025", m:"2025 · 2:37", u:"https://www.youtube.com/watch?v=HM7CgfA1vR4", why:"Brand value."},
 {tp:"c8", t:"Inside Nike’s big bet on Michael Jordan (Air Jordan)", m:"2026 · 4:40", u:"https://www.youtube.com/watch?v=OapP_OK7IrI", why:"Licensing and brand equity."}
];
