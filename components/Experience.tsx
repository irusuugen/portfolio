export default function Experience() {
  const experiences = [
    {
      position: "ML Engineer Intern",
      company: "NHG Health x A*STAR (Singapore)",
      period: "May 2026 - Present",
      text: "Developing an ML pipeline to estimate patients' heart rates from facial videos, while preserving their privacy by de-identifying their faces. Exploring vision transformers, deep state space models, and semi-adversarial methods.",
    },
    {
      position: "Software Engineer Intern",
      company: "DotB (Ho Chi Minh City, Vietnam)",
      period: "December 2025 - January 2026",
      text: "Integrated Zabbix for host monitoring with custom dashboards to fully automate infrastructure oversight and eliminate manual input.",
    },
    {
      position: "Software Engineer Intern",
      company:
        "Applications of Teaching and Learning Analytics for Students (ATLAS) @ NTU (Singapore)",
      period: "Nov 2025 - Feb 2026",
      text: "Worked on refining and deploying features from the NalaLearnscape prototype for use on the NALA chatbot platform for NTU students across several faculties.",
    },
    {
      position: "Student Researcher",
      company: "Nair Lab @ LKCMedicine (Singapore)",
      period: "September 2025 - Present",
      text: "Benchmarking vision transformers and deep state space models to classify behaviours in videos of freely-behaving mice for computational neuroscience research applications. Under NTU's Undergraduate Research Experience on Campus Programme.",
    },
  ];
  return (
    <div className="w-full flex flex-col justify-center py-24 px-8 max-w-7xl mx-auto">
      <h2 className="md:text-9xl text-7xl font-heading text-shadow-[0_0_12px_#e6ccff]">
        EXPERIENCE
      </h2>
      <ul className="">
        {experiences.map((e) => (
          <li key={e.company} className="py-4 border-b-2 border-dotted mb-4">
            <div className="flex flex-row justify-between">
              <div>
                <h3 className="md:text-2xl text-xl">{e.position}</h3>
                <p className="md:text-base text-xs mt-2">{e.company}</p>
              </div>
              <p className="md:text-base text-xs">{e.period}</p>
            </div>
            <p className="mt-4 opacity-80">{e.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
