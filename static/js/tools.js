(function () {
  "use strict";

  var questionSets = {
    home: [
      "Walk me through the home you remember best, starting at the front door.",
      "Which room did everyone drift toward, and what usually happened there?",
      "What did an ordinary morning sound like?",
      "What object in the house was nobody allowed to touch?",
      "Who lived nearby, and how often did they come through the door?",
      "What smell would take you back there immediately?",
      "Where did people go when they needed to be alone?",
      "What household rule made perfect sense then and seems strange now?",
      "What did the family do when the power went out or the weather turned bad?",
      "What would you put back in that home if you could visit it once more?"
    ],
    love: [
      "Who did you love before you understood what love was?",
      "What first made you notice the person who changed your life?",
      "Tell me about a date or outing that went completely wrong.",
      "What small habit made you feel cared for?",
      "Who gave the best relationship advice, and were they right?",
      "What did your family think of the person you chose?",
      "When did affection matter more than romance?",
      "What argument taught you how to stay?",
      "Which ordinary day together would you choose to live again?",
      "What do people misunderstand about a love that lasts?"
    ],
    work: [
      "What was the first job that made you feel useful?",
      "Who taught you how work was supposed to be done?",
      "What task could you do better than almost anyone around you?",
      "Tell me about a mistake at work that changed how you operated.",
      "Which coworker could still make you laugh today?",
      "What did your hands know how to do that younger people rarely learn now?",
      "When did you stay in a job for reasons other than money?",
      "What did you almost become instead?",
      "Which workday are you proudest of, even if nobody noticed?",
      "What did retirement—or the idea of it—change about you?"
    ],
    turning: [
      "Describe the moment you knew your life had changed.",
      "What decision looked small at the time but changed everything afterward?",
      "When did you do something brave without feeling brave?",
      "What did you lose that made room for something else?",
      "Who showed up when you did not expect them to?",
      "When did you realize an adult you trusted was wrong?",
      "What move, trip, or departure split life into before and after?",
      "Which risk would you take again?",
      "What belief did life force you to revise?",
      "What happened that your family tells differently than you do?"
    ],
    tradition: [
      "Which recipe carries a person inside it?",
      "What holiday rule could your family never break?",
      "Who cooked by feel, and what did their hands know?",
      "What food meant money was tight but still felt like comfort?",
      "Which family saying would confuse an outsider?",
      "What did everyone pretend to dislike but always finish?",
      "Which tradition disappeared, and why?",
      "What did your family celebrate that was not on any calendar?",
      "Who sat where at the table?",
      "What tradition should the next generation keep—and which can they release?"
    ],
    service: [
      "What made you decide to serve?",
      "What did the first day teach you that nobody had warned you about?",
      "Who earned your trust, and how?",
      "What part of daily life would surprise someone who was never there?",
      "Which sound, smell, or object still brings the experience back?",
      "What did you write home about—and what did you leave out?",
      "When did duty conflict with what you personally wanted?",
      "Who do you still think about from that time?",
      "What was hardest about coming home or moving on?",
      "What do you want your family to understand about your service?"
    ]
  };

  var eraOpeners = {
    childhood: "Thinking about childhood, ", teen: "Thinking about your teen years, ",
    "young-adult": "Thinking about early adulthood, ", midlife: "Thinking about the busiest work-and-family years, ",
    today: "Looking back from where you are now, "
  };
  var relationshipNotes = {
    parent: "A follow-up worth asking your parent: ", grandparent: "A follow-up worth asking your grandparent: ",
    partner: "A follow-up for your partner: ", veteran: "A respectful follow-up: ", sibling: "A sibling follow-up: ", friend: "A friend-to-friend follow-up: "
  };

  function byId(id) { return document.getElementById(id); }
  function money(value) { return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value); }
  function safe(value) { var div = document.createElement("div"); div.textContent = value || ""; return div.innerHTML; }

  var generate = byId("generate-questions");
  if (generate) generate.addEventListener("click", function () {
    var relationship = byId("q-relationship").value;
    var era = byId("q-decade").value;
    var theme = byId("q-theme").value;
    var questions = questionSets[theme].slice();
    questions[0] = eraOpeners[era] + questions[0].charAt(0).toLowerCase() + questions[0].slice(1);
    questions[9] = relationshipNotes[relationship] + questions[9].charAt(0).toLowerCase() + questions[9].slice(1);
    byId("question-results").innerHTML = "<h3>Your ten questions</h3><ol>" + questions.map(function (q) { return "<li>" + safe(q) + "</li>"; }).join("") + "</ol><p><a href=\"#free-download\">Want the full 100-question printable? Send it to your inbox.</a></p>";
  });

  var calculate = byId("calculate-cost");
  if (calculate) calculate.addEventListener("click", function () {
    var interviews = Math.max(1, Number(byId("calc-interviews").value) || 1);
    var pages = Math.max(4, Number(byId("calc-pages").value) || 4);
    var photos = Math.max(0, Number(byId("calc-photos").value) || 0);
    var format = byId("calc-format").value;
    var title, range, note, url;
    if (pages <= 6 && interviews <= 1) { title = "Start with One Story"; range = "$149"; note = "One focused answer and a printed keepsake are enough for this scope."; url = "/one-story/"; }
    else if (pages <= 18 && interviews <= 1) { title = "A Story Session fits"; range = "$399–$650"; note = "The higher end covers urgent memorial work or a more complex booklet."; url = "/story-sessions/"; }
    else if (pages <= 45 && interviews <= 3) { title = "The Interview Day is the cleanest fit"; range = "$1,500–$3,000"; note = "A focused 40-page book starts at $1,500; broader mini legacy books begin around $3,000."; url = "/interview-day/"; }
    else {
      var low = 1600 + (interviews * 450) + (pages * 38) + (photos * 7) + (format === "hardcover" ? 350 : format === "softcover" ? 150 : 0);
      low = Math.round(low / 250) * 250;
      var high = Math.round((low * 1.32) / 250) * 250;
      title = "This is a custom legacy book"; range = money(low) + "–" + money(high); note = "The subject, research, photo restoration, travel, and number of family reviewers can move the final quote."; url = "/legacy-books/";
    }
    byId("cost-result").innerHTML = "<span class=\"result-kicker\">Best-fit range</span><h3>" + safe(title) + "</h3><div class=\"result-price\">" + safe(range) + "</div><p>" + safe(note) + "</p><a class=\"card__link\" href=\"" + url + "\">See this option</a>";
  });

  var eulogy = byId("eulogy-form");
  if (eulogy) eulogy.addEventListener("submit", function (event) {
    event.preventDefault();
    var name = byId("eu-name").value || "your loved one";
    var trait = byId("eu-trait").value || "the quality that made them unmistakably themselves";
    var scene = byId("eu-scene").value || "one specific scene that lets people see that quality";
    var loved = byId("eu-loved").value || "the people, places, and rituals they loved";
    var taught = byId("eu-taught").value || "what their life taught you";
    var close = byId("eu-close").value || "the goodbye or thank-you you most need to say";
    byId("eulogy-result").innerHTML = "<h3>Your working outline</h3><ol class=\"outline-list\"><li><strong>Open simply.</strong> Name " + safe(name) + " and say what it meant to know them.</li><li><strong>Name the thread.</strong> Introduce " + safe(trait) + ".</li><li><strong>Show, do not summarize.</strong> Tell " + safe(scene) + ".</li><li><strong>Widen the picture.</strong> Bring in " + safe(loved) + ".</li><li><strong>Say what remains.</strong> Explain " + safe(taught) + ".</li><li><strong>Close directly.</strong> End with " + safe(close) + ".</li></ol><p>Read it aloud once. Cut anything that sounds like a résumé. Keep the sentence only your family could say.</p>";
  });

  var fit = byId("find-fit");
  if (fit) fit.addEventListener("click", function () {
    var goal = byId("fit-goal").value, time = byId("fit-time").value, budget = byId("fit-budget").value;
    var choice;
    if (goal === "memorial" && time === "week") choice = ["Memorial Express", "$650", "/memorial-express/", "A human-written memorial booklet on a five-business-day timeline."];
    else if (goal === "gift") choice = ["Gift Certificate", "Any amount", "/gift/", "It prints instantly, works nationwide, and lets the recipient choose the pace."];
    else if (goal === "family" && (budget === "under1600" || budget === "custom")) choice = ["Family Reunion Book", "$1,200", "/family-reunion-book/", "Ten voices become one professionally edited family book."];
    else if (goal === "whole" && budget === "custom") choice = ["Legacy Book", "From $3,000", "/legacy-books/", "A larger human-written book has room for the arc of a life."];
    else if (goal === "whole" && budget === "under1600") choice = ["The Interview Day", "$1,500", "/interview-day/", "Three focused interview hours become a 40-page book."];
    else if (goal === "voice") choice = ["Audio Letters", "From $249", "/audio-letters/", "Questions arrive over time, and the storyteller answers by ordinary phone."];
    else if (goal === "conversation" && budget !== "under150") choice = ["Rapid Fire", "$249", "/rapid-fire/", "A lively 45-minute interview becomes a digital booklet and one printed copy."];
    else choice = ["One Story", "$149", "/one-story/", "One personal question and one phone call become a printed keepsake."];
    byId("fit-result").innerHTML = "<span class=\"result-kicker\">Your best fit</span><h3>" + choice[0] + "</h3><div class=\"result-price\">" + choice[1] + "</div><p>" + choice[3] + "</p><a class=\"btn btn-primary\" href=\"" + choice[2] + "\">See how it works</a>";
  });

  document.querySelectorAll("[data-print-sheet]").forEach(function (button) {
    button.addEventListener("click", function () { var sheet = byId(button.dataset.printSheet); if (sheet) { sheet.hidden = false; sheet.scrollIntoView({ behavior: "smooth" }); } });
  });
  document.querySelectorAll("[data-close-sheet]").forEach(function (button) {
    button.addEventListener("click", function () { button.closest(".print-sheet").hidden = true; byId("printables").scrollIntoView(); });
  });
})();
