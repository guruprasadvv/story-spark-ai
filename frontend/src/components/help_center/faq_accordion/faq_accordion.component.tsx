import { FC, useCallback, useId, useState } from "react";
import { motion } from "framer-motion";
import { FaqItem } from "../help_center.utils";

interface FAQAccordionProps {
  items: FaqItem[];
}

const FAQAccordion: FC<FAQAccordionProps> = ({ items }) => {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(
    items[0]?.id ?? null
  );

  const toggleItem = useCallback((id: string) => {
    setOpenId((current) => (current === id ? null : id));
  }, []);

  const handleKeyDown = (
    event: React.KeyboardEvent,
    id: string
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleItem(id);
    }
  };

  if (items.length === 0) {
    return (
      <section id="faq" className="scroll-mt-24">
        <div className="text-center py-12 bg-white dark:bg-blue-500/5 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
          <p className="text-slate-600 dark:text-gray-400">
            No FAQ items match your search.
          </p>
        </div>
      </section>
    );
  }

  return (
    <motion.section
      id="faq"
      className="scroll-mt-24"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      aria-labelledby="faq-heading"
    >
      <div className="text-center mb-10">
        <h2
          id="faq-heading"
          className="text-3xl font-bold text-slate-800 dark:text-gray-300"
        >
          Frequently Asked Questions
        </h2>

        <p className="mt-3 text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
          Quick answers to the most common StorySparkAI questions.
        </p>
      </div>

      <div className="space-y-3" role="list">
        {items.map((item) => {
          const isOpen = openId === item.id;
          const panelId = `${baseId}-${item.id}-panel`;
          const buttonId = `${baseId}-${item.id}-button`;

          return (
            <article
              key={item.id}
              role="listitem"
              className="bg-white dark:bg-blue-500/10 border border-slate-200 dark:border-white/5 rounded-xl overflow-hidden shadow-sm transition-colors hover:border-indigo-500/30"
            >
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-indigo-500"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => handleKeyDown(e, item.id)}
                >
                  <span className="text-slate-800 dark:text-gray-300 font-medium pr-4">
                    {item.question}
                  </span>

                  <span
                    className={`flex-shrink-0 w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  >
                    <i className="fas fa-chevron-down text-sm"></i>
                  </span>
                </button>
              </h3>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={`px-6 overflow-hidden transition-all duration-300 ${
                  isOpen
                    ? "pb-5 max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed border-t border-slate-200 dark:border-white/5 pt-4">
                  {item.answer}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </motion.section>
  );
};

export default FAQAccordion;
