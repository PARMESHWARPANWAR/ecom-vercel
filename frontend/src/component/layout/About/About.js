import React from "react";
import { Typography, Avatar, Button, Link } from "@material-ui/core";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WebIcon from "@mui/icons-material/Web";
import DescriptionIcon from "@mui/icons-material/Description";
import Profile from "../../../images/Profile.jpg";
import resumePDF from "./resume.pdf";

const AboutUs = () => {
  const openLink = (url) => {
    window.open(url, "_blank");
  };

  const downloadResume = () => {
    window.open(resumePDF, "_blank");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg p-8 rounded-lg w-full md:w-3/4 lg:w-2/4">
        <div className="flex flex-col items-center justify-center mb-8">
          <Avatar
            className="w-32 h-32 mb-4"
            src={Profile}
            alt="Profile Avatar"
          />
          <Typography variant="h4" className="text-center">
            Parmeshwar
          </Typography>
          <Typography variant="h6" className="text-center">
            Senior Software Developer
          </Typography>
          <Typography variant="body1" className="text-center">
            India | parmeshwarpanwar777@gmail.com | 9116375367
          </Typography>

          <div className="flex flex-wrap space-x-4 justify-center mt-4">
            <Button
              variant="contained"
              color="primary"
              startIcon={<GitHubIcon />}
              onClick={() => openLink("https://github.com/PARMESHWARPANWAR")}
              className="mr-2 mb-2"
            >
              GitHub
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<LinkedInIcon />}
              onClick={() =>
                openLink("https://www.linkedin.com/in/parmeshwar777/")
              }
              className="mr-2 mb-2"
            >
              LinkedIn
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<WebIcon />}
              // onClick={() => openLink("#")}
              className="mr-2 mb-2"
            >
              Website
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<DescriptionIcon />}
              onClick={downloadResume}
              className="mb-2"
            >
              Resume
            </Button>
          </div>
        </div>

        <div className="mb-8">
          <Typography variant="h5">About Me</Typography>
          <Typography variant="body1">
            Highly skilled full-stack developer with a strong background in
            developing complex web applications. Proficient in cutting-edge
            technologies such as React.js, Next.js, and Node.js. Experienced in
            delivering high-quality solutions that improve user engagement and
            satisfaction. Passionate about creating visually appealing and
            user-friendly interfaces.
          </Typography>
        </div>

        <div className="mb-8">
          <Typography variant="h5">Education</Typography>
          <Typography variant="body1">
            07/2017 – 12/2021 | Indore, India | Indian Institute Of Technology
            (IIT) Indore, B-Tech
          </Typography>
        </div>

        <div className="mb-8">
          <Typography variant="h5" className="mb-2">
            Professional Experience
          </Typography>
          <div className="mb-4">
            <Typography variant="subtitle1" className="mb-1">
              08/2022 – 04/2023 | Gurugram, India | Climajo, Senior Software
              Developer
            </Typography>

            <Typography variant="body1">
              - Led frontend development for multiple projects, including the
              development of a chatbot using React.js and Flask, integrated with
              the ChatGPT API
            </Typography>
            <Typography variant="body1">
              - Developed a B2B website portal using Next.js and Hasura,
              enabling clients to view supplier products and facilitating direct
              communication
            </Typography>

            <Typography variant="body1">
              - Integrated one-to-one messaging app functionality, enhancing
              communication between clients and suppliers
            </Typography>
            <Typography variant="body1">
              - Designed and developed Climajo's website for normal users,
              incorporating articles, blogs, and updated certificate designs
            </Typography>
            <Typography variant="body1">
              - Utilized cutting-edge technologies like Tailwind CSS, GraphQL,
              and Stripe for seamless integration and enhanced functionality
            </Typography>
            <Typography variant="body1">
              - Ensured responsive design and cross-browser compatibility for
              optimal user experience
            </Typography>
          </div>
          <div>
            <Typography variant="subtitle1" className="mb-1">
              09/2021 – 08/2022 | Bengaluru, India | GetMega, Software Developer
            </Typography>

            <Typography variant="body1">
              - Developed a variety of games using Unity game engine, including
              HighBai (2D) and RackUp (3D)
            </Typography>
            <Typography variant="body1">
              - Utilized React.js and Next.js for frontend development of web
              applications
            </Typography>
            <Typography variant="body1">
              - Collaborated with cross-functional teams to ensure effective
              project delivery
            </Typography>
            <Typography variant="body1">
              - Conducted iterative testing and debugging to ensure high-quality
              gameplay experiences
            </Typography>
            <Typography variant="body1">
              - Implemented engaging animations and responsive UI elements
            </Typography>
            <Typography variant="body1">
              - Actively participated in Agile development processes and
              contributed to continuous improvement initiatives
            </Typography>
          </div>
        </div>
        <div className="mb-8">
          <Typography variant="h5">Projects</Typography>
          <Typography variant="subtitle1">E-commerce Website</Typography>
          <Typography variant="body1">
            Description: A full-stack e-commerce website built using Node.js,
            Express, React.js, Redux, Tailwind CSS, and Stripe for payment
            gateway integration. The website allows users to browse products,
            search by name, filter by price range and category, add products to
            cart, place orders with secure card payments, and manage their
            profiles. The website also includes an admin section that enables
            administrators to add new products, manage user accounts, update
            orders status, delete orders, and view product descriptions and user
            details.
          </Typography>
        </div>
        <div className="">
          <Typography variant="h5" className="mb-2">
            Skills
          </Typography>
          <Typography variant="body1">
            React.js, JavaScript, HTML, CSS, Tailwind CSS, Node.js, Express.js,
            MongoDB, Git
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
