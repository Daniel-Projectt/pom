/* ================================================================ the review test
   What two Quizlet sets for this exam (80 cards and 83 cards) cover, mapped onto
   the study guide's sixteen sections. Each entry says: inside THIS section, a
   question about THIS concept is one the Quizlets also test.
     w:2  both sets test it   — the safest bet on the exam
     w:1  one set tests it
   Anything on the study guide that matches nothing here is w:0 — a concept the
   handout asks for that NEITHER set covers, which is exactly where someone who
   studied only the Quizlets would get caught. The review test mixes all three.  */
var REVIEW_NOTE = "Two Quizlet sets for this exam — 80 cards and 83 cards — were mapped onto the study guide's sixteen sections. Questions here are labelled by how much agreement there is: the ones both sets test, the ones one set tests, and the ones on the handout that neither set covers. That last group is the dangerous one.";

var CONFIRMED = [
 /* ---- chapter 5 ---- */
 {sec:"g5-model",  w:2, k:/consumer buyer behavior|consumer market/i},
 {sec:"g5-model",  w:1, k:/black box|marketing stimulus|buyer response|stimulus rather than/i},

 {sec:"g5-chars",  w:2, k:/subculture/i},
 {sec:"g5-chars",  w:2, k:/social class/i},
 {sec:"g5-chars",  w:2, k:/\bfamily\b/i},
 {sec:"g5-chars",  w:1, k:/four major factors|cultural, social, personal|four factors/i},
 {sec:"g5-chars",  w:1, k:/\bculture\b|cultural shift/i},
 {sec:"g5-chars",  w:1, k:/opinion leader/i},
 {sec:"g5-chars",  w:1, k:/brand personality|ruggedness|sincerity|outdoorsy/i},
 {sec:"g5-chars",  w:1, k:/occupation/i},
 {sec:"g5-chars",  w:1, k:/economic situation|frugal|downturn/i},
 {sec:"g5-chars",  w:1, k:/lifestyle|psychographic|AIO/i},
 {sec:"g5-chars",  w:1, k:/perception|selective attention|selective distortion|selective retention/i},
 {sec:"g5-chars",  w:1, k:/\bmotive\b|sufficiently pressing/i},
 {sec:"g5-chars",  w:1, k:/Maslow|physiological/i},
 {sec:"g5-chars",  w:1, k:/learning|\bcue\b|\bcues\b|reinforce/i},

 {sec:"g5-decide", w:2, k:/complex buying/i},
 {sec:"g5-decide", w:2, k:/dissonance-reducing/i},
 {sec:"g5-decide", w:2, k:/habitual/i},
 {sec:"g5-decide", w:2, k:/variety-seeking|variety seeking/i},
 {sec:"g5-decide", w:2, k:/need recognition|information search|evaluation of alternatives|purchase decision|postpurchase|five stages|stage of the buyer|buying process/i},
 {sec:"g5-decide", w:2, k:/dissonance/i},

 {sec:"g5-newprod", w:2, k:/relative advantage|compatibilit|complexit|trialabilit|observabilit|rate of adoption/i},
 {sec:"g5-newprod", w:1, k:/innovator|early adopter|mainstream|lagging|adopter|adoption process|awareness, interest/i},

 /* ---- chapter 6 ---- */
 {sec:"g6-intro",  w:2, k:/business buyer behavior/i},
 {sec:"g6-intro",  w:1, k:/business buying process/i},

 {sec:"g6-markets", w:2, k:/derived/i},
 {sec:"g6-markets", w:2, k:/inelastic/i},
 {sec:"g6-markets", w:1, k:/supplier development/i},
 {sec:"g6-markets", w:1, k:/complex|formal decision/i},

 {sec:"g6-behavior", w:2, k:/straight rebuy/i},
 {sec:"g6-behavior", w:2, k:/modified rebuy/i},
 {sec:"g6-behavior", w:2, k:/new task/i},
 {sec:"g6-behavior", w:2, k:/systems selling|complete solution/i},
 {sec:"g6-behavior", w:2, k:/buying center/i},
 {sec:"g6-behavior", w:1, k:/gatekeeper|decider|influencer|buying-center role/i},
 {sec:"g6-behavior", w:1, k:/organizational|procedure/i},
 {sec:"g6-behavior", w:1, k:/environmental|supply condition/i},

 {sec:"g6-process", w:1, k:/problem recognition|internal stimul|external stimul/i},
 {sec:"g6-process", w:1, k:/e-procurement|reverse auction|extranet/i},

 /* ---- chapter 7 ----
    Nothing in either set touches Marketing Strategy (Figure 7.1), so every
    question in that section stays w:0 on purpose.                             */
 {sec:"g7-seg",    w:2, k:/market segmentation|dividing a market|segment a market|smaller segments/i},
 {sec:"g7-seg",    w:2, k:/geographic/i},
 {sec:"g7-seg",    w:2, k:/benefit/i},
 {sec:"g7-seg",    w:2, k:/loyal/i},
 {sec:"g7-seg",    w:2, k:/measurable|accessible|substantial|differentiable|actionable|requirement/i},
 {sec:"g7-seg",    w:1, k:/demographic/i},
 {sec:"g7-seg",    w:1, k:/psychographic/i},
 {sec:"g7-seg",    w:1, k:/usage rate|heavy user/i},

 {sec:"g7-target", w:2, k:/undifferentiated|mass marketing/i},
 {sec:"g7-target", w:2, k:/differentiated/i},
 {sec:"g7-target", w:2, k:/concentrated|niche/i},
 {sec:"g7-target", w:2, k:/micromarketing|local marketing|individual marketing/i},
 {sec:"g7-target", w:1, k:/target market/i},
 {sec:"g7-target", w:1, k:/company resources|limited resources/i},

 {sec:"g7-position", w:2, k:/product position|place it occupies|minds of consumers|defined by consumers/i},
 {sec:"g7-position", w:2, k:/competitive advantage|preemptive|distinctive|worth establishing|greater value/i},
 {sec:"g7-position", w:1, k:/value proposition/i},
 {sec:"g7-position", w:1, k:/positioning statement|point of difference/i},
 {sec:"g7-position", w:1, k:/abrupt|gradually|implementing it/i},

 /* ---- chapter 8 ---- */
 {sec:"g8-what",   w:2, k:/convenience/i},
 {sec:"g8-what",   w:2, k:/specialty/i},
 {sec:"g8-what",   w:1, k:/anything that can be offered|a product is/i},
 {sec:"g8-what",   w:1, k:/a service is|ownership of anything|intangible/i},
 {sec:"g8-what",   w:1, k:/shopping product/i},
 {sec:"g8-what",   w:1, k:/unsought/i},
 {sec:"g8-what",   w:1, k:/industrial product|capital item|materials and parts|supplies and services/i},
 {sec:"g8-what",   w:1, k:/person marketing|place marketing|social marketing|organization marketing/i},

 {sec:"g8-decisions", w:1, k:/product quality|satisfy stated or implied/i},
 {sec:"g8-decisions", w:1, k:/good design|\bstyle\b/i},
 {sec:"g8-decisions", w:1, k:/support service/i},

 {sec:"g8-services", w:1, k:/intangibilit|inseparabilit|variabilit|perishabilit|four service|sampled before/i},
 {sec:"g8-services", w:1, k:/service-profit chain|internal service quality/i},
 {sec:"g8-services", w:1, k:/internal marketing|precede/i},
 {sec:"g8-services", w:1, k:/interactive marketing|buyer.seller interaction/i},

 {sec:"g8-brands", w:2, k:/brand equity/i},
 {sec:"g8-brands", w:2, k:/brand value|financial value/i}
];

/* The three labels a review-test question can carry. */
var TIERS = [
 {w:2, t:"On both Quizlets",   s:"Both sets test this. The safest bet on the exam."},
 {w:1, t:"On one Quizlet",     s:"One of the two sets tests this."},
 {w:0, t:"On neither Quizlet", s:"On your study guide, but neither Quizlet covers it \u2014 the gap to watch."}
];
