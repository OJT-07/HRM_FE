import {
  Document,
  Paragraph,
  Packer,
  AlignmentType,
  TextRun,
  HeadingLevel,
} from 'docx';
import { saveAs } from "file-saver";
//import { render } from "react-dom";

export default function ExportCV() {
  /**######################################## */
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: 'Your Name',
              heading: HeadingLevel.TITLE,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              text: 'Contact Information',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Mobile: 123-456-7890 | LinkedIn: https://linkedin.com/in/yourprofile | Email: your.email@example.com',
                }),
                new TextRun({
                  text: 'Address: 58 Elm Avenue, Kent ME4 6ER, UK',
                  
                }),
                
              ],
            }),
            new Paragraph({
              text: 'Education',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'University B',
                  bold: true,
                }),
                new TextRun({
                  text: '\tComputer Science - Bachelor of Science',
                  italics: true,
                }),
              ],
            }),
            new Paragraph({
              text: 'Studied computer science and...',
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: 'Experience',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Company A',
                  bold: true,
                }),
                new TextRun({
                  text: '\tSoftware Developer',
                  italics: true,
                }),
              ],
            }),
            new Paragraph({
              text: 'Worked on various projects...',
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: 'Skills',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: 'JavaScript, React, Node.js',
            }),
            new Paragraph({
              text: 'Achievements',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: 'Achievement 1',
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: 'Achievement 2',
              bullet: {
                level: 0,
              },
            }),
            new Paragraph({
              text: 'Interests',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: 'Programming, Technology, Music Production, Web Design, 3D Modelling, Dancing.',
            }),
            new Paragraph({
              text: 'References',
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text:
                'Dr. Dean Mohamedally Director of Postgraduate Studies Department of Computer Science, University College London Malet Place, Bloomsbury, London WC1E d.mohamedally@ucl.ac.uk',
            }),
            new Paragraph({
              text: 'More references upon request',
            }),
            new Paragraph({
              text:
                'This CV was generated in real-time based on my Linked-In profile from my personal website www.dolan.bio.',
              alignment: AlignmentType.CENTER,
            }),
          ],
        },
      ],
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, "example.docx");
      console.log("Document created successfully");
    });
  };
  return (
    <div className="App">
      <button onClick={generate}>Generate doc</button>
    </div>
  );
}

//render(<App />, document.getElementById('root'));
