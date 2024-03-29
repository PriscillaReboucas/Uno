import React from 'react';
import parse from "html-react-parser";
import './About.css'

const saltLogo = `<svg className='salt-logo' id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240.32 49.87"><defs><style>.cls-1{fill:#000;}</style></defs><title>saltlogo</title><path className="cls-1" d="M37.07,47.81C44.46,31.91,51.6,15.89,59.02,0c1.43.74,2.85,1.49,4.28,2.24-7.44,15.83-14.58,31.8-22.02,47.63Q39.18,48.85,37.07,47.81Z"/><path className="cls-1" d="M143.53.04H157.8q-.015,21.36-.01,42.73c3.13,0,6.25.01,9.37.01,0,1.37,0,2.75.01,4.13h-24c-.01-1.38-.01-2.76,0-4.13h9.43q-.015-19.3,0-38.61h-9.07Z"/><path className="cls-1" d="M185.37,6.06c2.15-.34,4.3-.7,6.44-1.1-1.33,3.04-1.42,6.39-1.83,9.63h10.63c0,1.4.01,2.79.01,4.19-3.64,0-7.27.01-10.91,0-.26,5.7-.9,11.39-.72,17.1.17,2.53.49,5.92,3.29,6.92,3.59,1.24,7.11-.88,9.96-2.84l1.59,4.08c-4.36,2.98-10.19,4.57-15.21,2.39-3.21-1.52-4.23-5.3-4.59-8.54-.61-6.36.33-12.74.54-19.11h-7.04c0-1.4,0-2.79.01-4.19h7.32Q185.1,10.33,185.37,6.06Z"/><path className="cls-1" d="M.04,22.53q14.85-7.845,29.7-15.66c.01,1.69.01,3.37.01,5.05Q17.675,18.13,5.56,24.27c7.95,4.99,16.28,9.33,24.43,13.98v5.43C20.01,37.76,9.86,32.12,0,25.99.01,25.13.03,23.4.04,22.53Z"/><path className="cls-1" d="M210.54,6.86q14.88,7.815,29.75,15.65c.01.88.02,2.64.03,3.52-9.83,6.1-19.95,11.72-29.9,17.63V38.23c8.12-4.65,16.42-8.99,24.34-13.96-8.1-4.08-16.15-8.24-24.23-12.34C210.53,10.24,210.53,8.55,210.54,6.86Z"/><path className="cls-1" d="M74.8,17.49c3.28-3.85,8.92-3.91,13.56-3.47a16.147,16.147,0,0,1,9.65,4.8c-1.07,1.32-2.14,2.63-3.17,3.98-2.74-4.96-9.89-6.48-14.74-3.9a3.143,3.143,0,0,0-.83,4.84c4.86,4.99,13.17,4,17.8,9.35,3.28,4.43.64,11.15-4.26,13.12a20.932,20.932,0,0,1-21.26-3.56,40.843,40.843,0,0,0,2.93-5.6c2.83,6.17,11.14,7.95,16.83,4.91a4.157,4.157,0,0,0,.65-6.8c-4.57-3.3-10.7-3.37-15.18-6.88C73.43,25.95,72.09,20.8,74.8,17.49Z"/><path className="cls-1" d="M108.2,18.26c5.16-4.78,13.26-5.68,19.52-2.65,4.3,2.13,5.85,7.17,6.04,11.65.24,6.54.04,13.1.11,19.65h-5.59c.01-1.52.04-3.05.07-4.57-3.72,5.98-12.29,6.68-18.14,3.71-5.02-2.53-5.5-10.04-1.48-13.7,5.42-5.32,13.69-5.03,20.72-4.32-.47-3.05-.97-6.7-3.87-8.45-4.76-2.75-10.95-1.53-14.93,2.04C109.83,20.5,109.01,19.38,108.2,18.26Zm5.62,15.25c-3.42,1.91-3.79,7.99.09,9.57,4.45,1.57,10.19.56,13.07-3.43,1.68-2.21,2.09-5.04,2.48-7.71C124.28,31.54,118.52,30.71,113.82,33.51Z"/></svg>`;

const About = () => {
  return (
   <main className='main'>
    <section className='about-section'>
      <article className='about-article'>
        <h3 className='about-heading'>Developed by:</h3>
        <p className='about-text'> 
          <a href='https://www.linkedin.com/in/apardor/' target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin fa-2x linkedin-logo'></i></a>
          <a href='https://github.com/apardor' target='_blank' rel='noreferrer'><i className='fa-brands fa-square-github fa-2x github-logo'></i></a>
          Andrés Pardo Rodriguez
        </p>
        <p className='about-text'>
          <a href='https://www.linkedin.com/in/andreas-cross-1bb26a124/' target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin fa-2x linkedin-logo'></i></a>
          <a href='https://github.com/HandyAndyOG' target='_blank' rel='noreferrer'><i className='fa-brands fa-square-github fa-2x github-logo'></i></a>
        Andreas Cross
        </p>
        <p className='about-text'>
          <a href='https://www.linkedin.com/in/priscilla-rebou%C3%A7as/' target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin fa-2x linkedin-logo'></i></a>
          <a href='https://github.com/PriscillaReboucas' target='_blank' rel='noreferrer'><i className='fa-brands fa-square-github fa-2x github-logo'></i></a>
        Priscilla Barbosa Rebouças
        </p>
        <p className='about-text'>
          <a href='https://www.linkedin.com/in/tamlyn-springer-v/' target='_blank' rel='noreferrer'><i className='fa-brands fa-linkedin fa-2x linkedin-logo'></i></a>
          <a href='https://github.com/TamlynSpringer' target='_blank' rel='noreferrer'><i className='fa-brands fa-square-github fa-2x github-logo'></i></a>
          Tamlyn Springer
        </p>
        <h3 className='about-heading about-salt'>As our final project in the School of Applied Technology's JavaScript career program.</h3>
        <a href='https://www.salt.dev/' target='_blank' rel='noreferrer'>{parse(saltLogo)}</a>
      </article>
    </section>
    </main>  
  )
}

export default About;