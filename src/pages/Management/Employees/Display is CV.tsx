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

export const Resume = () => {
    const query = "(min-width: 968px)";
    const [matches, setMatches] = useState(window.matchMedia(query).matches);

    useEffect(() => {
        const media = window.matchMedia(query);
        const listener = () => setMatches(media.matches);
        media.addEventListener("change", listener);
        return () => media.removeEventListener("change", listener);
    }, [matches]);

    const { profile, aboutMe, skills, socialMedia, experience } = dataSchema;

    return (
        <>
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
