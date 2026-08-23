import React, { useMemo, useState } from "react";

// ✅ Updated FAQ DATA (Homepage)
const FAQS = [
  {
    question:
      "How does Resolute Corp operate as a modern family office? ",
    answer:
      "As a next-generation family office, Resolute Corp goes beyond traditional wealth management—managing investments, real estate assets, and portfolio operations while also fostering sports culture and lifestyle innovation. Their approach blends financial discipline, industry expertise, and hands-on operational leadership to scale brands across India and international markets.",
  },
  {
    question: "In what geographies does Resolute Corp have business operations and investments in? ",
    answer:
      "Founded in Ahmedabad, India, Resolute Corp has a growing international presence with investments in Dubai (Share Square), sports franchises across India, and lifestyle brands reaching global markets. Their cross-border approach allows them to capture emerging opportunities in both mature and developing economies. ",
  },
  {
    question: "Who are the key leaders driving Resolute Corp’s vision?",
    answer:
      "Resolute Corp is spearheaded by Alok Sanghi, an Indiana University–trained finance and economics professional with expertise in operational excellence, risk management, and strategic diversification. Their lifestyle portfolio is led by Priyanka Sanghi, founder of Hair Drama Company, whose creative leadership has expanded the brand into a global fashion powerhouse. ",
  },
  {
    question:
      "How is Resolute Corp involved in sports like Hockey and Volleyball?",
    answer:
      "Resolute Corp owns and manages two professional sports teams — Delhi Toofans, competing in the Prime Volleyball League, and Hyderabad Toofans, participating in the prestigious Hockey India League. Through these investments, Resolute Corp aims to promote sports culture, support grassroots development, and nurture athletic talent across India.",
  },
  {
    question: "What makes Resolute Corp’s portfolio unique compared to other family offices?",
    answer:
      "Unlike most family offices, Resolute Corp combines investments in high-growth, high-engagement sectors—sports, lifestyle, and real estate—allowing for both financial returns and strong brand visibility.",
  },
  {
    question: "How has Hair Drama Company scaled under Priyanka Sanghi’s leadership?",
    answer:
      "By leveraging influencer marketing, global trend forecasting, and omnichannel retail strategies, Hair Drama Company has expanded its product portfolio and entered international markets—positioning itself as a premium lifestyle accessory brand.",
  },
  {
    question: "What makes Share Square in Dubai a unique real estate investment for Resolute Corp? ",
    answer:
      "ShareSquare is transforming real estate by making luxury property ownership in the UAE accessible to all. Through fractional ownership, investors can own shares in premium properties, diversify their portfolios, and benefit from appreciation and rental income—regardless of investment size.",
  },
  {
    question: "Can strategic partnerships enhance Resolute Corp’s portfolio performance?",
    answer:
      "Yes, Resolute Corp actively seeks collaborations with global brands, technology providers, and event organizers to expand market reach, increase operational efficiency, and unlock new revenue streams for each portfolio company. ",
  },
  {
    question:
      "What is Resolute Corp’s long-term investment philosophy? ",
    answer:
      "Resolute Corp’s philosophy is rooted in strategic diversification, innovation-driven growth, and responsible investing. Whether developing premium urban spaces, building sports franchises, or scaling fashion brands, they focus on creating financial value while fostering community development, sustainability, and brand equity across all sectors they operate. ",
  },
];

// ✅ Small icon (no extra library)
const Chevron = ({ open }) => (
  <svg
    className={`h-5 w-5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
      clipRule="evenodd"
    />
  </svg>
);

const Faqs = () => {
  // ✅ default open first item; change to null if you want all closed
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = useMemo(() => FAQS, []);

  const toggle = (idx) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="max-w-5xl mx-auto px-2 py-12">
      <div className="text-center mb-5">
        <h2 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-2">
        {faqs.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={idx}
              className="bg-[#0f4769] rounded-xl border border-gray-200 shadow-sm overflow-hidden"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between gap-4 px-3 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-white text-sm lg:text-lg">{item.question}</span>
                <span className="text-white">
                  <Chevron open={isOpen} />
                </span>
              </button>

              {/* ✅ Smooth open/close */}
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-5 pb-5 text-sm text-white leading-relaxed text-left">
                    {item.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Faqs;
