import React from "react";
import Description from "./Description";

interface WorkItem {
  title: string;
  period: string;
  company: string;
  description: string[];
}

interface WorksProps {
  works: WorkItem[];
}

const Works: React.FC<WorksProps> = ({ works }) => {
  return (
    <section className="work-experience section" id="experience">
      <h2 className="section-title">Experiencia</h2>
      <div className="experience__container bd-grid">
        {works.map((work) => (
          <Work key={work.company} {...work} />
        ))}
      </div>
    </section>
  );
};

const Work: React.FC<WorkItem> = ({ title, period, company, description }) => {
  return (
    <div className="experience__content">
      <div className="experience__time">
        <span className="experience__rounder"></span>
        <span className="experience__line"></span>
      </div>
      <div className="experience__data bd-grid">
        <h3 className="experience__title">{title}</h3>
        <span className="experience__company">
          {period} | {company}
        </span>
        {description.map((desc, i) => (
          <Description key={i} desc={desc} />
        ))}
      </div>
    </div>
  );
};

export default Works;
