import {
  Document,
  Paragraph,
  Packer,
  AlignmentType,
  TextRun,
  HeadingLevel,
  Table, TableCell, TableRow, WidthType
} from 'docx';
import { saveAs } from "file-saver";
//import { render } from "react-dom";

const createTable = () => {
  const data = [
    { SKILL: 'PHP', EXPERIENCE: '1' },
    { SKILL: 'Laravel', EXPERIENCE: '1' },
    { SKILL: 'HTML, CSS', EXPERIENCE: '3' },
    { SKILL: 'Javascript', EXPERIENCE: '3' },
    { SKILL: 'VueJS', EXPERIENCE: '1' },
    { SKILL: 'ReactJS', EXPERIENCE: '3.5' },
    { SKILL: 'NodeJS', EXPERIENCE: '3.5' },
    { SKILL: 'TypeScript', EXPERIENCE: '3' },
    { SKILL: 'MySQL', EXPERIENCE: '3' },
    { SKILL: 'MongoDB', EXPERIENCE: '2' },
    { SKILL: 'PostgreSQL', EXPERIENCE: '3' },
    { SKILL: 'Git', EXPERIENCE: '3' },
    { SKILL: 'Docker', EXPERIENCE: '3' },
    { SKILL: 'AWS', EXPERIENCE: '2' },
    { SKILL: 'Kubernetes', EXPERIENCE: '1' },
  ];

  const rows = data.map(({ SKILL, EXPERIENCE }) => (
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [
              new TextRun({
                text: SKILL,
                size: 22,
                font: 'Century Gothic',
                  color: '#4B3A2E',
              })
            ]
          })],
        }),
        new TableCell({
          children: [new Paragraph({
            children: [
              new TextRun({
                text: EXPERIENCE,
                size: 22,
                font: 'Century Gothic',
                  color: '#4B3A2E',
              })
            ]
          })],
        }),
      ],
    })
  ));
  rows.push(
    new TableRow({
      children: [
        new TableCell({
          children: [new Paragraph({
            children: [
              new TextRun({
                text:
                  'Legends – Experience is a number of years that the candidate has significant experience within that respective skill. Level is: 1. Basic Capabilities, 2. Advanced Capabilities, 3. Demonstrated Expertise or 4. Teaching/Lead Capabilities.',
                size: 22,
                font: 'Century Gothic',
                  color: '#4B3A2E',
                
              }),
            ],
          })],
          
        }),
      ],
    })
  );

  const table = new Table({
    width: { size: 80, type: WidthType.PERCENTAGE }, // Tăng kích thước chiều ngang lên 100%
    rows: [
      new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: 'SKILL',
                  size: 22,
                  bold: true,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                })
              ]
            })],
          }),
          new TableCell({
            children: [new Paragraph({
              children: [
                new TextRun({
                  text: 'EXPERIENCE (in year)',
                  size: 22,
                  bold: true,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),

              ]
            })],
          }),
        ],
      }),
      ...rows,
    ],
  });

  return table;
};

export default function ExportCV() {
  /**######################################## */
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'DANG THU NGOC',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Address:89 Le Van Hien, Ngu Hanh Son, Da Nang',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Email: ngoc.dang@devplus.edu.vn',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
  
                }),
              ],
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'WORKING EXPERIENCE',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: '05/2022 - now',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
              ],
              spacing: {
                after: 100,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Engineer at DevPlus – Da Nang',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  italics: true,
                }),
              ],
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Develop applications and execute software development.',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },

            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Languages and Framework:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' NodeJS, TypeScipt, Javascript, HTML, CSS, ReactJS, VueJS, PHP.',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Git/GitHub, Docker, AWS, MySQL, MongoDB, SQL Server, PostgreSQL, Redis.',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 800,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TYPICAL PROJECTS',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
              ],
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Project Name:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' CV Management',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],

            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Role:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Full Stack Developer and DevOps',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Description:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' The project involves the development of an HR Management System tailored for a specific company. The system aims to streamline and automate various human resource processes, enhancing efficiency and accuracy in managing employee information, payroll, attendance, leave, and other HR-related tasks',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],

            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Specification:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Full-stack features development and maintenance',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Languages and Framework:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Nodejs, NestJs, Typescript, ReactJS',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Git/Github, Docker, PostgreSQL, AWS',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 400,
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: 'Project Name:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' High Out Office',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],

            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Role:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' BE',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Description:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Web-based application supporting Excel-like functionalities for input/output data, insight reports, data visualization in charts, report export…',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],

            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Specification:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' BE features development and maintenance',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
                before: 50
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Languages and Framework:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Nodejs, NestJs, Typescript, ReactJS',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 50,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
                new TextRun({
                  text: ' Git/Github, Docker, SQL Server, Serverless, AWS S3, AWS CloudWatch',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
              ],
              spacing: {
                after: 600,
              },
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: 'TECHNICAL SKILLS/QUALIFICATION',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true,
                }),
              ],
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                }),
                createTable(),
              ],
              spacing: {
                after: 400,
              },
            }),
            new Paragraph({
              children: [
                new TextRun({
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  text: 'IMPORTANT CONFIDENTIALITY NOTICE: This document contains confidential and or legally privileged information. ST United reserves all rights hereunder. When distributed or transmitted, it is intended solely for the authorized use of the addressee or intended recipient. Access to this information by anyone else is unauthorized. Disclosure, copying, distribution or any action or omission taken in reliance on it is prohibited and may be unlawful. Please, report any exceptions hereto immediately to '
                }),
              ],
              spacing: {
                after: 400,
              },
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
