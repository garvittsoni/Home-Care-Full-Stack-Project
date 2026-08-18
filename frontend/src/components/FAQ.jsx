import React, { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { faqData } from '../assets/data/data';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 px-5 sm:px-8 md:px-12 lg:px-[8%] bg-slate-50">
      <div className="max-w-4xl mx-auto">
        
        {/* Yahan data-aos-once="true" lagaya hai taaki ye gayab na ho */}
        <div 
          className="text-center mb-12" 
          data-aos="fade-down"
          data-aos-once="true" 
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-500">
            Got questions? We've got answers. If you have some other questions, feel free to contact us.
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-xl bg-white overflow-hidden transition-all duration-300 shadow-sm hover:shadow-md ${openIndex === index ? 'border-green-500' : 'border-gray-200'}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-once="true" // Yahan bhi laga diya hai! Ab ye scroll/click karne par gayab nahi hoga.
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
              >
                <span className={`font-semibold text-[16px] sm:text-[17px] ${openIndex === index ? 'text-green-600' : 'text-slate-800'}`}>
                  {faq.question}
                </span>
                
                <span className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-300 bg-green-500 ${openIndex === index ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                  {openIndex === index ? <FaMinus className="text-sm" /> : <FaPlus className="text-sm " />}
                </span>
              </button>

              <div 
                className={`transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100 pb-5 px-5' : 'max-h-0 opacity-0 overflow-hidden px-5'
                }`}
              >
                <p className="text-gray-600 text-[15px] leading-relaxed border-t border-gray-100 pt-4 mt-1">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;