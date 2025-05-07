# Portfolio Project

Full stack portfolio project. This project is done as part of internship at Tutors. In this project, the project demonstrates web-development skills as well as the projects I have built as part of my studies for `'Full Stack Web Development program at Business College Helsinki'`. The technologies used are: Strapi backend, React JS frontend and for UI Tailwind CSS.

## The backend ##

**Strapi CMS**

- Strapi serves as backend for blog page, skill cards and contact form submission. The strapi can be displayed in glimpse.

![contact form submission](/public/images/blog02.png)

- The blog content type is created and whenever the blog is added from backend it will be fetched in the frontend.

![blog content](/public/images/form01.png)


- Skill cards are also use strapi and they are rendered to the frontend.

![skill cards](/public/images/skill03.png)

***Deleting Content type***

- Due to erroneous content type configuration and corrupt content type and db. The following measures were taken:

**Step one**

Select all entries and export as JSON by going in to Strapi-> Content manager -> [the content type. Eg, Blog or whatever]

**Step two**

Backup your schema files:

```bash
cp -r src/api/blog ~/blog_backup
```
**Step three**

Delete the content type:

- Stop server and delete the api folder:

```bash
rm -rf src/api/blog
```
Clear cache:

```bash
rm -rf .cache build dist
```
**Step four**

 Run:

```bash
npm run develop
```

and Recreate the content type from Admin UI:




Frontend dependency used for the form submission:
```shell
npm install react-icons formik yup axios
```

**Key Frontend Technologies**

React: UI library for building interactive interfaces.

Vite: Fast build tool and dev server.

Tailwind CSS: Utility-first CSS for styling.

Formik & Yup: For form handling and validation.

Axios: For HTTP requests.

framer-motion: For animations.

jsPDF & html2canvas: For generating PDFs and screenshots.

ESLint: For code linting.

## The frontend ##

The frontend used API endpoints from `'Strapi'` for Blog content, Skill Cards and Form Submission.

![Alt text](/public/images/frontend02.png)


## Portfolio is Hosted in Netlify and Render ##

- For backend click [here](https://strapi-s525.onrender.com), the dashboard can be reached but to login admin credentials are required.

- For frontend click [here](https://eliashagosportfolio.netlify.app/)




