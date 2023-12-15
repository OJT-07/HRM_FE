import { useState, useEffect } from "react";
import Profile from "../../../components/Detail/Profile";
import Academic from "../../../components/Detail/Academic";
import Skills from "../../../components/Detail/Skills";
import Proyects from "../../../components/Detail/Proyects";
import Works from "../../../components/Detail/Works";
import SocialMedia from "../../../components/Detail/SocialMedia";
import { AboutMe } from "../../../components/Detail/AboutMe";
import SEO from "../../../components/Detail/SEO"; // Updated import statement
import { Data as dataSchema } from "../../../Schemas/Data";
import { Menu as menuSchema } from "../../../Schemas/Menu";
import { Menu } from "@mui/material";
import {
    Document,
    Paragraph,
    Packer,
    AlignmentType,
    TextRun,
    HeadingLevel,
    Table, TableCell, TableRow
} from 'docx';
import { saveAs } from "file-saver";

export default function ExportCV() {
    const query = "(min-width: 968px)";
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches]);

    const { profile, aboutMe, skills, socialMedia, experience } = dataSchema;
    
    
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
                                    bold: true,
                                }),
                                new TextRun({
                                    text: ' NodeJS, TypeScipt, Javascript, HTML, CSS, ReactJS, VueJS, PHP.',
                                    size: 22,
                                    font: 'Century Gothic',
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
                                    bold: true,
                                }),
                                new TextRun({
                                    text: ' Git/GitHub, Docker, AWS, MySQL, MongoDB, SQL Server, PostgreSQL, Redis.',
                                    size: 22,
                                    font: 'Century Gothic',
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
                                bold: true,
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
        <>
            <div className="App">
                <button onClick={generate}>Generate doc</button>
            </div>
            <SEO occupation={""} {...profile} {...aboutMe} />
            {!matches && <Menu open={false} {...menuSchema} />}
            <main className="l-main bd-container" id="bd-container">
                
                <div className="resume" id="area-cv">
                    <div className="resume__left">
                        <Profile {...profile} />
                        <AboutMe {...aboutMe} />
                        <Skills {...skills} />
                        <SocialMedia {...socialMedia} />
                    </div>
                    <div className="resume__right">
                        <Works works={experience.works} />
                        <Academic academic={experience.academic} />
                        <Proyects projects={experience.proyects} />
                    </div>
                </div>
            </main>
        </>
    );
};
