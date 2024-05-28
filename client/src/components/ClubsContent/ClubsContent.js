import React from 'react'
import './ClubsContent.css'

export const ClubsContent = () => {
  return (
    <div className='container clubs-content-container'>
        <h3 className='clubs-content-title'>What styles of formations are we delivering?</h3>

        <div class="card-group">
  <div class="card bg-secondary text-light">
    <img src="images/IT/web.png" class="card-img-top" alt="IT field" className='it-image' />
    <div class="card-body2">
      <h5 class="card-title">Full-Stack Web Development</h5>
      <p class="card-text">Full-stack web development refers to the practice of developing both the front-end (client-side) and back-end (server-side) components of a web application. A full-stack developer is proficient in both the front-end and back-end technologies and can work on all aspects of a web application, from the user interface to the server infrastructure.</p>
    </div>
  </div>
  <div class="card bg-secondary text-light">
    <img src="images/IT/Securuty.jpg" class="card-img-top" alt="IT field" className='it-image' />
    <div class="card-body2">
      <h5 class="card-title">Cybersecurity & Ethical Hacking</h5>
      <p class="card-text">Cybersecurity refers to the practice of protecting computer systems, networks, and data from unauthorized access, use, disclosure, disruption, modification, or destruction. It involves implementing measures and adopting strategies to prevent, detect, and respond to security incidents and protect against various types of threats, cyberattacks and data breaches</p>
    </div>
  </div>
  <div class="card bg-secondary text-light">
    <img src="images/IT/devops.jpg" class="card-img-top" alt="IT field" className='it-image' />
    <div class="card-body2">
      <h5 class="card-title">DevOps</h5>
      <p class="card-text">DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to improve collaboration, communication, and efficiency within an organization. It focuses on automating processes, integrating development and operations teams, and promoting a culture of continuous integration, delivery, and improvement of work environment.</p>
    </div>
  </div>
  <div class="card bg-secondary text-light">
    <img src="images/IT/AI.jpg" class="card-img-top" alt="IT field" className='it-image' />
    <div class="card-body2">
      <h5 class="card-title">Artificial Intelligence - AI</h5>
      <p class="card-text">Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It involves the development of computer systems and algorithms that can perform tasks that typically require human intelligence, such as visual perception, speech recognition, and decision-making</p>
    </div>
  </div>
  <div class="card bg-secondary text-light">
    <img src="images/IT/soft.jpg" class="card-img-top" alt="IT field" className='it-image' />
    <div class="card-body2">
      <h5 class="card-title">Soft Skills</h5>
      <p class="card-text">Soft skills, also known as interpersonal or people skills, are personal attributes and qualities that enable individuals to effectively interact, communicate, collaborate, and work with others. These skills are not specific to any particular job or technical expertise but are essential for success in various professional and personal settings such as Communication and Collaboration</p>
    </div>
  </div>
</div>
    </div>
  )
}