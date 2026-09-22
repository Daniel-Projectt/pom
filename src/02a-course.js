/* ================================================================ the course
   From the four "enhanced" chapter decks (Pearson slides plus the professor's
   additions). No syllabus or quizzes were in the export, so this is only what the
   slides say.                                                                    */
var COURSE = {
 about:"Principles of Marketing at Cedarville’s School of Business. The text is Kotler, Armstrong &amp; Balasubramanian, <i>Principles of Marketing</i>, 20th edition (the chapter 5 deck is from the 19th). The slides answer one question per chapter: how do buyers decide, how do business buyers decide, whom do we serve and how, and what exactly are we selling?",
 chapters:[
  ["5","Consumer Markets and Buyer Behavior","How final consumers decide — the black box, four factors, four buying types, five stages, adoption."],
  ["6","Business Markets and Business Buyer Behavior","How organizations buy — derived demand, buying situations, the buying center, eight steps."],
  ["7","Customer Value–Driven Marketing Strategy","Segmentation, targeting, differentiation, positioning — which customers, and how to serve them."],
  ["8","Products, Services, and Brands","Three levels of a product, classifications, lines and mix, the four service characteristics, brand equity."]],
 extras:[
  "Each deck opens with a life theme and Scripture — relationships, choices, attitude, challenges. They are on the <b>In Class</b> tab.",
  "The professor adds current cases (Beyond Meat, Tide, Marriott, Liquid Death, Apple, Starbucks, Grainger, WPAFB) and videos. The cases are inside the chapter notes; the videos have their own list."]
};

/* Learning objectives, in the slides' own words */
var OBJECTIVES = {
 c5:["5.1 Define the consumer market and construct a simple model of consumer buyer behavior.",
     "5.2 Name the four major factors that influence consumer buyer behavior.",
     "5.3 List and define the major types of buying decision behavior and the stages in the buyer decision process.",
     "5.4 Describe the adoption and diffusion process for new products."],
 c6:["6.1 Define the business market and explain how business markets differ from consumer markets.",
     "6.2 Identify the major factors that influence business buyer behavior.",
     "6.3 List and define the steps in the business buying decision process.",
     "6.4 Discuss how digital and social media have changed business-to-business marketing.",
     "6.5 Compare the institutional and government markets and explain how institutional and government buyers make their buying decisions."],
 c7:["7.1 Define the major steps in designing a customer-driven marketing strategy: market segmentation, targeting, differentiation, and positioning.",
     "7.2 List and discuss the major bases for segmenting consumer and business markets.",
     "7.3 Explain how companies identify attractive market segments and choose a market-targeting strategy.",
     "7.4 Discuss how companies differentiate and position their products for maximum competitive advantage."],
 c8:["8.1 Define product and describe the major classifications of products and services.",
     "8.2 Describe the decisions companies make regarding their individual products and services, product lines, and product mixes.",
     "8.3 Identify the four characteristics that affect the marketing of services and the additional marketing considerations that services require.",
     "8.4 Discuss branding strategy — the decisions companies make in building and managing their brands."]
};

/* ================================================================ the review list
   One item per thing the objectives and the professor's own lists ask for.
   "a" is the note section to scroll to; "know" marks lists to know cold.      */
var GUIDE = {sections:[
 {h:"Chapter 5 · Consumer Markets and Buyer Behavior", tp:"c5", items:[
  {id:"g5-model", t:"The model of buyer behavior", a:"c5-model",
   short:"Marketing stimuli (the four Ps) and other stimuli (economic, technological, social, cultural) enter the buyer’s black box — characteristics and decision process — and come out as responses: attitudes and preferences, purchase behavior, brand engagement."},
  {id:"g5-factors", t:"The four factors that influence consumer behavior", know:true, a:"c5-factors",
   short:"Cultural (culture, subculture, social class) · social (groups and social networks, family, roles and status) · personal (age and life-cycle stage, occupation, economic situation, lifestyle, personality and self-concept) · psychological (motivation, perception, learning, beliefs and attitudes)."},
  {id:"g5-cultural", t:"Cultural factors: culture, subculture, social class", a:"c5-cultural",
   short:"Culture is learned values and behaviors; marketers watch for shifts (bottled water). Subcultures share value systems from common experience. Social classes are relatively permanent, ordered divisions with similar buying behavior — in the U.S. the lines are not fixed."},
  {id:"g5-social", t:"Social and personal factors", a:"c5-social",
   short:"Reference groups, word of mouth, influencers, opinion leaders; family as the most important consumer-buying organization; roles and status. Then occupation, age and life stage (PRIZM), economic situation, lifestyle (AIOs), personality and brand personality."},
  {id:"g5-psych", t:"Psychological factors: motivation, Maslow, learning", a:"c5-psych",
   short:"A motive is a need pressing enough to seek satisfaction; Maslow orders needs from physiological to self-actualization; learning works through drives, stimuli, cues, responses and reinforcement."},
  {id:"g5-types", t:"The four types of buying decision behavior", know:true, a:"c5-types",
   short:"By involvement and brand differences: complex (high, significant), dissonance-reducing (high, few), variety-seeking (low, significant), habitual (low, few)."},
  {id:"g5-process", t:"The five stages of the buyer decision process", know:true, a:"c5-process",
   short:"Need recognition → information search → evaluation of alternatives → purchase decision → postpurchase behavior. It starts long before the purchase and continues long after."},
  {id:"g5-adopt", t:"Adoption, adopter categories, rate of adoption", know:true, a:"c5-newprod",
   short:"Awareness, interest, evaluation, trial, adoption. Innovators 2.5%, early adopters 13.5%, early mainstream 34%, late mainstream 34%, lagging adopters 16%. Rate depends on relative advantage, compatibility, complexity, trialability, observability."},
  {id:"g5-brandp", t:"Brand personality traits and the class answer key", a:"c5-social",
   short:"Sincerity → KIA, excitement → BMW, competence → Honda, sophistication → Infiniti, ruggedness → Jeep."}]},
 {h:"Chapter 6 · Business Markets and Business Buyer Behavior", tp:"c6", items:[
  {id:"g6-diff", t:"How business markets differ from consumer markets", know:true, a:"c6-diff",
   short:"Fewer, larger buyers; derived, inelastic and fluctuating demand; professional buyers; complex, formal decisions; buyer and seller dependent on each other."},
  {id:"g6-sit", t:"The three buying situations, and systems selling", a:"c6-situations",
   short:"Straight rebuy (same envelope, year after year), modified rebuy (change the opening from side to top), new task (a clear plastic mailer). Systems selling: a complete solution from one seller."},
  {id:"g6-center", t:"The buying center and its five roles", know:true, a:"c6-center",
   short:"Users, influencers, buyers, deciders, gatekeepers — a set of roles, not a fixed unit. Classroom furniture: students and faculty use; the purchasing director buys and gatekeeps; the CFO decides."},
  {id:"g6-infl", t:"Major influences on business buyers", a:"c6-influences",
   short:"Environmental (economy, supply conditions, technology, politics, competition, culture) · organizational (objectives, strategies, structure, systems, procedures) · interpersonal (influence, expertise, authority, dynamics) · individual (age, job, motives, personality, buying style)."},
  {id:"g6-steps", t:"The eight steps of the business buying process", know:true, a:"c6-process",
   short:"Problem recognition → general need description → product specification → supplier search → proposal solicitation → supplier selection → order-routine specification → performance review."},
  {id:"g6-digital", t:"E-procurement and B-to-B digital marketing", a:"c6-process",
   short:"Reverse auctions, trading exchanges, company buying sites, extranets. Benefits: new suppliers, lower costs, faster orders. Risk: erodes relationships. Maersk’s goal: “to get closer to our customers.”"},
  {id:"g6-inst", t:"Institutional and government markets", a:"c6-inst",
   short:"Institutions: low budgets, captive patrons. Governments favor domestic suppliers, require bids, usually award the lowest bidder, and weigh noneconomic factors — minority firms, depressed firms, small businesses."}]},
 {h:"Chapter 7 · Customer Value–Driven Marketing Strategy", tp:"c7", items:[
  {id:"g7-stp", t:"The four steps: segmentation, targeting, differentiation, positioning", know:true, a:"c7-stp",
   short:"Select customers to serve (segment, target) and decide on a value proposition (differentiate, position) — to create value for targeted customers. Two questions: which customers, and how will we serve them?"},
  {id:"g7-bases", t:"The bases for segmenting consumer markets", know:true, a:"c7-seg",
   short:"Geographic, demographic (age and life cycle, gender, income…), psychographic (social class, lifestyle, personality), behavioral (occasions, benefits sought, user status, usage rate, loyalty status)."},
  {id:"g7-req", t:"Requirements for effective segmentation", know:true, a:"c7-req",
   short:"Measurable, accessible, substantial, differentiable, actionable."},
  {id:"g7-eval", t:"Evaluating segments and the four targeting strategies", know:true, a:"c7-target",
   short:"Size and growth, structural attractiveness, company objectives and resources. Then undifferentiated, differentiated, concentrated, micromarketing (local and individual). Choice depends on resources, product variability, life-cycle stage, market variability, competitors."},
  {id:"g7-diff", t:"Differentiation and competitive advantage", a:"c7-diff",
   short:"Differentiate along product, services, channels, people, image. A difference is worth it if it is important, distinctive, superior, communicable, preemptive, affordable, profitable."},
  {id:"g7-vp", t:"Value propositions and the positioning statement", know:true, a:"c7-value",
   short:"Winning: more for more, more for the same, the same for less, less for much less, more for less. Statement: To (target segment and need) our (brand) is (concept) that (point of difference)."}]},
 {h:"Chapter 8 · Products, Services, and Brands", tp:"c8", items:[
  {id:"g8-levels", t:"Product, service, and the three levels of a product", know:true, a:"c8-what",
   short:"Core customer value (what is the buyer really buying?), actual product (brand name, features, design, packaging, quality level), augmented product (delivery and credit, after-sale service, warranty, product support)."},
  {id:"g8-class", t:"Product classifications", know:true, a:"c8-class",
   short:"Consumer: convenience, shopping, specialty, unsought. Industrial: materials and parts, capital items, supplies and services. Plus organization, person, place and social marketing."},
  {id:"g8-decisions", t:"Individual product decisions", a:"c8-decisions",
   short:"Attributes (quality, features, style and design), branding, packaging, labeling, product support services."},
  {id:"g8-mix", t:"Product lines and the product mix", know:true, a:"c8-lines",
   short:"Line length; line stretching and line filling. Mix width (number of lines), length (total items), depth (versions of each product), consistency."},
  {id:"g8-services", t:"The four service characteristics and the service-profit chain", know:true, a:"c8-services",
   short:"Intangibility, inseparability, variability, perishability. Internal service quality → satisfied, productive employees → greater service value → satisfied, loyal customers → healthy profits and growth. Internal and interactive marketing."},
  {id:"g8-brands", t:"Brand equity, brand value, sponsorship and development", know:true, a:"c8-brands",
   short:"Equity: the differential effect of knowing the name. Value: total financial worth. Sponsorship: manufacturer’s, private, licensed, co-brand. Development: line extensions, brand extensions, multibrands, new brands."}]}
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
