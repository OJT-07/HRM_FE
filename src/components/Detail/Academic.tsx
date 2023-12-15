import React from "react";

interface AcademyProps {
  career: string;
  date: string;
  institution: string;
}

interface AcademicProps {
  academic: AcademyProps[];
}

const Academy: React.FC<AcademyProps> = ({ career, date, institution }) => {
  return (
    <div className="education__content">
      <div className="education__time">
        <span className="education__rounder"></span>
        <span className="education__line"></span>
      </div>
      <div className="education__data bd-grid">
        <h3 className="education__title">{career}</h3>
        <span className="education__year">{date}</span>
        <span className="education__studies">{institution}</span>
      </div>
    </div>
  );
};

const Academic: React.FC<AcademicProps> = ({ academic }) => {
  return (
    <section className="academic-experience section" id="education">
      <h2 className="section-title">Educación</h2>
      <div className="education__container bd-grid">
        {academic.map((academy) => (
          <Academy key={academy.institution} {...academy} />
        ))}
      </div>
    </section>
  );
};

export default Academic;
