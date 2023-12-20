import axios from 'axios';
import { Column, ColumnBreak, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } from 'docx';
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import { render } from "react-dom";

interface Skill {
  exp: string;
  name: string;
}

interface Employee {
  project: {
    name: string;
    description: string;
    technical: string;
  };
  position: string;
}

interface EmployeeData {
  name: string;
  address: string;
  email: string;
  description: string;
  phone: string;
  image: string;
  date_of_birth: Date;
  join_date: Date;
  skills: Skill[];
  projectsEmployeeJoined: Employee[];
}

export default function ExportCV() {
  const [employeeData, setEmployeeData] = useState<EmployeeData | null>(null);
  const [employee, setEmployee] = useState<Employee[] | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(`https://hrm-server-api.onrender.com/api/employees/${id}`);

        console.log('🚀 ~ file: ExportCV.tsx:52 ~ fetchData ~ response:', response);
        setEmployeeData(response.data.data[0]);
        setEmployee(response.data.data[0].histories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    // Format date to a user-friendly string
    const formattedDate = new Date(date).toLocaleDateString('en-US');
    return formattedDate;
  };

  /**######################################## */
  const skills = (employeeData?.skills ?? []).map(({ exp, name }) => ({
    SKILL: name,
    EXPERIENCE: exp.toString()
  }));
  const skillText = skills?.map(({ SKILL }) => SKILL).join(', ');

  const createTable = () => {
    if (!employeeData) return null;

    const rows = skills.map(
      ({ SKILL, EXPERIENCE }) =>
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: SKILL,
                      size: 22,
                      font: 'Century Gothic',
                      color: '#4B3A2E'
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: EXPERIENCE,
                      size: 22,
                      font: 'Century Gothic',
                      color: '#4B3A2E'
                    })
                  ]
                })
              ]
            })
          ]
        })
    );
    rows.push(
      new TableRow({
        children: [
          new TableCell({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: 'Legends – ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  }),
                  new TextRun({
                    text: 'Experience',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold: true
                  }),
                  new TextRun({
                    text: ' is a number of years that the candidate has significant experience within that respective skill. ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  }),
                  new TextRun({
                    text: 'Level is: 1',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold: true
                  }),
                  new TextRun({
                    text: '. Basic Capabilities, ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  }),
                  new TextRun({
                    text: '2',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold: true
                  }),
                  new TextRun({
                    text: '. Advanced Capabilities, ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  }),
                  new TextRun({
                    text: '3',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold: true
                  }),
                  new TextRun({
                    text: '. Demonstrated Expertise or ',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  }),
                  new TextRun({
                    text: '4',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D',
                    bold: true
                  }),
                  new TextRun({
                    text: '. Teaching/Lead Capabilities.',
                    size: 22,
                    font: 'Century Gothic',
                    color: '#9D9D9D'
                  })
                ],
                spacing: {
                  after: 400,
                  before: 400
                }
              })
            ],
            columnSpan: 2 // Sử dụng columnSpan để làm cho ô chiếm hết 2 cột
          })
        ]
      })
    );

    return new Table({
      width: { size: 235, type: WidthType.PERCENTAGE },
      rows: [
        new TableRow({
          children: [
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'SKILL',
                      size: 22,
                      bold: true,
                      font: 'Century Gothic',
                      color: '#4B3A2E'
                    })
                  ]
                })
              ]
            }),
            new TableCell({
              children: [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: 'EXPERIENCE (in year)',
                      size: 22,
                      bold: true,
                      font: 'Century Gothic',
                      color: '#4B3A2E'
                    })
                  ]
                })
              ]
            })
          ]
        }),
        ...rows
      ]
    });
  };

  const typical = () => {
    if (employee) {
      const projectParagraphs = employee.map((project) => [
        new Paragraph({
          children: [
            new TextRun({
              text: 'Project Name:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ` ${project?.project?.name}`,
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Role:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ` ${project?.position}`,
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ],
          spacing: {
            after: 50,
            before: 50
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Description:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ` ${project?.project?.description}`,
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ]
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Specification:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ' Full-stack features development and maintenance',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ],
          spacing: {
            after: 50,
            before: 50
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Languages and Framework:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ` ${project?.project?.technical}`,
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ],
          spacing: {
            after: 50
          }
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Technologies:',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E',
              bold: true
            }),
            new TextRun({
              text: ' Git/Github, Docker, PostgreSQL, AWS',
              size: 22,
              font: 'Century Gothic',
              color: '#4B3A2E'
            })
          ],
          spacing: {
            after: 400
          }
        })
      ]);

      return projectParagraphs.flat();
    }
  };

  // generate
  const generate = () => {
    const doc = new Document({
      sections: [
        {
          properties: {
            column: {
              space: 708,
              count: 2,
              equalWidth: false,
              children: [new Column({ width: 2360, space: 720 }), new Column({ width: 6920 })]
            }
          },
          children: [
            new Paragraph({
              children: [
                new TextRun({
                  text: `${employeeData?.name}`,
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                })
              ],
              spacing: {
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Address: ${employeeData?.address}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 50,
                before: 50
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Email: ${employeeData?.email}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 50,
                before: 50
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Phone: ${employeeData?.phone}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 50
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Birthday: ${formatDate(employeeData?.date_of_birth ?? new Date())}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 800
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'WORKING EXPERIENCE',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                })
              ],
              spacing: {
                after: 400
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `Start Date: ${formatDate(employeeData?.join_date ?? new Date())}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                })
              ],
              spacing: {
                after: 100
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: `${employeeData?.description}`,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  italics: true
                })
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Develop applications and execute software development.',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 50,
                before: 50
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'Languages and Framework:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                }),
                new TextRun({
                  text: skillText,
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                })
              ],
              spacing: {
                after: 50
              }
            }),

            new Paragraph({
              children: [
                new TextRun({
                  text: 'Technologies:',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                }),
                new TextRun({
                  text: ' Git/GitHub, Docker, AWS, MySQL, MongoDB, SQL Server, PostgreSQL, Redis.',
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                }),
                new ColumnBreak()
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TYPICAL PROJECTS',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                })
              ],
              spacing: {
                after: 400
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                }),
                ...(typical() ?? [])
              ]
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: 'TECHNICAL SKILLS/QUALIFICATION',
                  size: 32.5,
                  font: 'Century Gothic',
                  color: '#4B3A2E',
                  bold: true
                })
              ],
              spacing: {
                after: 200
              }
            }),
            new Paragraph({
              children: [
                new TextRun({
                  size: 22,
                  font: 'Century Gothic',
                  color: '#4B3A2E'
                }),
                createTable() ?? new Paragraph('No data available')
              ],
              spacing: {
                after: 400
              }
            })
            // new Paragraph({
            //   children: [
            //     new TextRun({
            //       size: 22,
            //       font: 'Century Gothic',
            //       color: '#4B3A2E',
            //       text: 'IMPORTANT CONFIDENTIALITY NOTICE: This document contains confidential and or legally privileged information. ST United reserves all rights hereunder. When distributed or transmitted, it is intended solely for the authorized use of the addressee or intended recipient. Access to this information by anyone else is unauthorized. Disclosure, copying, distribution or any action or omission taken in reliance on it is prohibited and may be unlawful. Please, report any exceptions hereto immediately to '
            //     }),
            //     new TextRun({
            //       size: 22,
            //       font: 'Century Gothic',
            //       text: 'hello@stunited.vn',
            //       color: "#6AA8BF"
            //     }),
            //   ],
            //   spacing: {
            //     after: 400,
            //   },
            // }),
          ]
        }
      ]
    });

    Packer.toBlob(doc).then((blob) => {
      console.log(blob);
      saveAs(blob, `CV-${employeeData?.name}.docx`);
      console.log('Document created successfully');
    });
  };

  const rows = skills.map(({ SKILL, EXPERIENCE }) => (
    <tr key={SKILL} className='text-center'>
      <td className='py-2 border'>
        <p className='text-brown text-lg'>{SKILL}</p>
      </td>
      <td className='py-2 border'>
        <p className='text-brown text-lg'>{EXPERIENCE}</p>
      </td>
    </tr>
  ));

  return (
    <div className='App'>
      <div className='max-w-screen-lg mx-auto relative'>
        <button
          onClick={generate}
          className='absolute top-0 right-0 mt-4 mr-4 transition duration-300 ease-in-out transform hover:scale-105 inline-flex items-center justify-center rounded-md bg-black py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10 dark:bg-boxdark'
        >
          Export CV
        </button>
      </div>

      <div className='max-w-screen-lg mx-auto flex flex-col lg:flex-row border border-gray-300 rounded p-4'>
        {employeeData && employee ? (
          <>
            <div className='lg:w-1/4 mb-8 lg:mb-12'>
              <img
                src={`https://hrm-server-api.onrender.com/${employeeData?.image}`}
                alt={employeeData?.name}
                className='rounded-full mx-auto lg:mx-0 mb-4 w-auto h-50'
              />
              <div className='text-3xl font-bold mb-2'>{employeeData?.name}</div>
              <div className='text-base mb-2'>Address: {employeeData?.address}</div>
              <div className='text-base mb-2'>Email: {employeeData?.email}</div>
              <div className='text-base mb-2'>Phone: {employeeData?.phone}</div>
              <div className='text-base mb-2'>Birthday: {formatDate(employeeData?.date_of_birth ?? new Date())}</div>
              <div className='mb-8'>
                <div className='text-2xl font-bold mb-4'>WORKING EXPERIENCE</div>
                <div className='text-base mb-4'>Start Date: {formatDate(employeeData?.join_date ?? new Date())}</div>
                <div className='text-base mb-4 italic'>{employeeData?.description}</div>
                <div className='text-base mb-4'>Develop applications and execute software development.</div>
                <div className='text-base mb-4'>
                  <span className='font-bold'>Languages and Framework:</span> {skillText}
                </div>
                <div className='text-base mb-8'>
                  <span className='font-bold'>Technologies:</span> Git/GitHub, Docker, AWS, MySQL, MongoDB, SQL Server,
                  PostgreSQL, Redis.
                </div>
              </div>
            </div>

            <div className='lg:w-3/4 lg:mx-10 m-5'>
              <div className='mb-8'>
                <div className='text-2xl font-bold mb-4'>TYPICAL PROJECTS</div>
                {employee &&
                  employee.map((project) => (
                    <div key={project?.project?.name} className='mb-8'>
                      <div className='text-base font-bold mb-2'>Project Name: {project?.project?.name}</div>
                      <div className='text-base mb-2'>Role: {project?.position}</div>
                      <div className='text-base mb-2'>Description: {project?.project?.description}</div>
                      <div className='text-base mb-2'>
                        Specification: Full-stack features development and maintenance
                      </div>
                      <div className='text-base mb-2'>
                        <span className='font-bold'>Languages and Framework:</span> {project?.project?.technical}
                      </div>
                      <div className='text-base mb-8'>
                        <span className='font-bold'>Technologies:</span> Git/GitHub, Docker, PostgreSQL, AWS
                      </div>
                    </div>
                  ))}
              </div>

              <div className='mb-8'>
                <div className='text-2xl font-bold mb-4'>TECHNICAL SKILLS/QUALIFICATION</div>
                <table className='w-full table-auto border-collapse border mb-8'>
                  <thead>
                    <tr>
                      <th className='p-2'>
                        <p className='text-brown text-lg font-bold'>SKILL</p>
                      </th>
                      <th className='p-2'>
                        <p className='text-brown text-lg font-bold'>EXPERIENCE (in year)</p>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                    <tr>
                      <td className='p-2'>
                        <p className='text-brown text-lg font-bold mt-4'>
                          Legends –{' '}
                          <span className='font-normal'>
                            Experience is a number of years that the candidate has significant experience within that
                            respective skill. Level is: 1. Basic Capabilities, 2. Advanced Capabilities, 3. Demonstrated
                            Expertise, or 4. Teaching/Lead Capabilities.
                          </span>
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* <div className="text-brown text-lg mb-8">
          IMPORTANT CONFIDENTIALITY NOTICE: This document contains confidential and/or legally privileged information. ST United reserves all rights hereunder. When distributed or transmitted, it is intended solely for the authorized use of the addressee or intended recipient. Access to this information by anyone else is unauthorized. Disclosure, copying, distribution, or any action or omission taken in reliance on it is prohibited and may be unlawful. Please, report any exceptions hereto immediately to{' '}
          <span className="text-blue-500">hello@stunited.vn</span>
        </div> */}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

//render(<App />, document.getElementById('root'));
