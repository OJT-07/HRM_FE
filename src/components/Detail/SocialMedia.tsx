import React from "react";

interface SocialMediaProps {
  label: string;
  social: SocialItem[];
}

interface SocialItem {
  name: string;
  url: string;
  className: string;
  // Add the 'label' property to the SocialItem interface
  label: string;
}

const SocialMedia: React.FC<SocialMediaProps> = ({ label, social }) => {
  return (
    <section className="social section">
      <h2 className="section-title">{label}</h2>
      <div className="social__container bd-grid">
        {social.map((socialItem) => (
          <Social key={socialItem.name} {...socialItem} />
        ))}
      </div>
    </section>
  );
};

const Social: React.FC<SocialItem> = ({ label, url, className }) => (
  <a href={url} target="_blank" rel="noreferrer" className="social__link">
    <i className={`bx ${className} social__icon`}></i> {label}
  </a>
);

export default SocialMedia;
