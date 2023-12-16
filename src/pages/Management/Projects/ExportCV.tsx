import {
  Document,
  Paragraph,
  Packer,
  TextRun,
  Table, TableCell, TableRow, WidthType
} from 'docx';
import { saveAs } from "file-saver";
import { useEffect, useState } from 'react';
//import { render } from "react-dom";

interface Skill {
  exp: string;
  name: string;
}

interface EmployeeData {
  name: string;
  address: string;
  email: string;
  description: string;
  skills: Skill[];
}


export default function ExportCV() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://hrm-server-api.onrender.com/api/employees/5');
        const data = await response.json();
        setEmployeeData(data.data);
        console.log(data.data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  /**######################################## */
  const skills = (employeeData?.skills ?? []).map(({ exp, name }) => ({
    SKILL: name,
    EXPERIENCE: exp.toString(),
  }));
  const skillText = skills?.map(({ SKILL }) => SKILL).join(', ');

  const createTable = () => {
    if (!employeeData) return null;
    

    const rows = skills.map(({ SKILL, EXPERIENCE }) => (
      new TableRow({
        cantSplit: true,
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
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text:
                      'Legends – ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                  new TextRun({
                    text:
                      'Experience',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold:true
                  }),
                  new TextRun({
                    text:
                      ' is a number of years that the candidate has significant experience within that respective skill. ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                  new TextRun({
                    text:
                      'Level is: 1',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold:true
                  }),
                  new TextRun({
                    text:
                      '. Basic Capabilities, ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                  new TextRun({
                    text:
                      '2',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold:true
                  }),
                  new TextRun({
                    text:
                      '. Advanced Capabilities, ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                  new TextRun({
                    text:
                      '3',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold:true
                  }),
                  new TextRun({
                    text:
                      '. Demonstrated Expertise or ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                  new TextRun({
                    text:
                      '4',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold:true
                  }),
                  new TextRun({
                    text:
                      '. Teaching/Lead Capabilities.',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                  }),
                ],
                spacing: {
                  after: 400,
                  before: 400,
                },
              }),
            ],
            columnSpan: 2, // Sử dụng columnSpan để làm cho ô chiếm hết 2 cột
          }),
        ],
      })
    );

    return new Table({
      width: { size: 80, type: WidthType.PERCENTAGE },
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
  };

  // generate
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${employeeData?.name}`,
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
                  text: `Address: ${employeeData?.address}`,
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
                  text: `Email: ${employeeData?.email}`,
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
                  text: '11/2021 - 02/2023',
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
                  text: `${employeeData?.description}`,
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
                  text: skillText,
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
                (createTable() ?? new Paragraph('No data available')),
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
                new TextRun({
                  size: 22,
                  font: 'Century Gothic',
                  text: 'hello@stunited.vn',
                  color: "#6AA8BF"
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
