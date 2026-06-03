const AUREA_DATA = {

  intelEvents: [
    { event: "WomAdelaide",       period: "March · Annual",           uplift: "+$175", ctx: "portfolio average" },
    { event: "Adelaide Fringe",   period: "Feb–Mar · 14 nights",  uplift: "+$160", ctx: "above baseline rate" },
    { event: "Gather Round",      period: "April · 4-night surge",    uplift: "+$210", ctx: "AFL city premium" },
    { event: "Tour Down Under",   period: "January · Coastal",        uplift: "+$140", ctx: "beachside corridor" },
    { event: "LIV Golf",          period: "April · Glenelg",          uplift: "+$190", ctx: "above event baseline" },
    { event: "Tasting Australia", period: "Apr–May · Hills + CBD", uplift: "+$120", ctx: "food & wine season" }
  ],

  perf: {
    stat1: { label: "Average occupancy",            num: 66, suffix: "%",  prefix: "",  start: 42, context: "Across all managed Adelaide properties" },
    stat2: { label: "Revenue lift vs self-managed", num: 32, suffix: "%",  prefix: "+", start: 20, context: "Average across owners’ first 12 months" },
    stat3: { label: "Guest response time",          context: "Every message, every platform, every hour" }
  },

  testimonials: [
    {
      quote: "Switching to Aurea added $1,100 to my monthly income within the first 60 days. The dynamic pricing alone was worth it.",
      meta:  "S.M. · Norwood · Townhouse",
      stat:  "+34% revenue, Q1 2025"
    },
    {
      quote: "I’d been self-managing for two years. In our first Fringe season with Aurea, the property earned more in six weeks than it had in the previous six months.",
      meta:  "T.K. · Glenelg · 2BR Apartment",
      stat:  "+$8,400 Fringe season 2025"
    },
    {
      quote: "A Hills property at 66% occupancy in its first quarter wasn’t what we were expecting. We’re now looking at a second property.",
      meta:  "R. & J.P. · Stirling · Hills Retreat",
      stat:  "66% occupancy, first quarter"
    }
  ],

  calculatorData: {
    glenelg:  { label: "Glenelg · West Beach · Henley",      beds: { 1:[2800,3400], 2:[3600,4400], 3:[4800,6000], 4:[5600,7200] }, events: "WomAdelaide +$175/night · LIV Golf +$190/night · Summer peak Dec–Feb" },
    cbd:      { label: "Adelaide CBD",                                   beds: { 1:[2600,3200], 2:[3400,4000], 3:[4800,5600], 4:[5500,6800] }, events: "Adelaide Fringe +$155/night · Gather Round +$210/night · Tour Down Under +$130/night" },
    norwood:  { label: "Norwood · Unley · Burnside",          beds: { 1:[2400,3000], 2:[3200,3900], 3:[4200,5200], 4:[5000,6200] }, events: "Adelaide Fringe +$140/night · Tasting Australia +$90/night · Gather Round +$180/night" },
    stirling: { label: "Stirling · Hahndorf · Hills",         beds: { 1:[2200,2800], 2:[3400,4200], 3:[5000,6500], 4:[6000,8000] }, events: "Adelaide Fringe +$120/night · Tasting Australia +$140/night · Winter retreats Jun–Aug" },
    brighton: { label: "Brighton · Marino · Hallett Cove",    beds: { 1:[2600,3200], 2:[3400,4000], 3:[4400,5400], 4:[5200,6500] }, events: "Adelaide Fringe +$130/night · LIV Golf +$160/night · Summer season Dec–Feb" },
    prospect: { label: "Prospect · Nailsworth · Broadview",   beds: { 1:[2200,2800], 2:[2900,3600], 3:[3800,4600], 4:[4500,5500] }, events: "Adelaide Fringe +$120/night · Gather Round +$160/night · Tasting Australia +$80/night" }
  }

};
