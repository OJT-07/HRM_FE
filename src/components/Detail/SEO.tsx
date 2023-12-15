import React from "react";
import { Helmet } from "react-helmet";

interface SEOProps {
  name: string;
  occupation: string;
  description: string;
}

const SEO: React.FC<SEOProps> = ({ name, occupation, description }) => {
  return (
    <Helmet>
      <title>{name} - {occupation}</title>
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default SEO;
