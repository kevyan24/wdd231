const ham = document.querySelector('.hamburger');
const navLinks = document.querySelector('.navigation');

ham.addEventListener('click', () => {
  ham.classList.toggle('show');
  navLinks.classList.toggle('show');
});

const date = document.querySelector('#lastModified');

if (date) {
  const formatted = new Date().toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });

  date.textContent = `Last modified: ${formatted}`;
}

const currentYear = document.querySelector('#currentyear');
if (currentYear) {
  const year = new Date().getFullYear();
  currentYear.innerHTML = `&copy; ${year}`;
}

const courses = [
  {
    subject: 'CSE',
    number: 110,
    title: 'Introduction to Programming',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 130,
    title: 'Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
    technology: [
      'HTML',
      'CSS'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 111,
    title: 'Programming with Functions',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
    technology: [
      'Python'
    ],
    completed: true
  },
  {
    subject: 'CSE',
    number: 210,
    title: 'Programming with Classes',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
    technology: [
      'C#'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 131,
    title: 'Dynamic Web Fundamentals',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: true
  },
  {
    subject: 'WDD',
    number: 231,
    title: 'Frontend Web Development I',
    credits: 2,
    certificate: 'Web and Computer Programming',
    description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
    technology: [
      'HTML',
      'CSS',
      'JavaScript'
    ],
    completed: false
  }
]

const courseList = document.querySelector('#course-list');
const creditDisplay = document.querySelector('#credit-total');

const allBtn = document.getElementById('all-btn');
const wddBtn = document.getElementById('wdd-btn');
const cseBtn = document.getElementById('cse-btn');

function displayCourses(filterFn) {
  courseList.innerHTML = '';

  const filteredCourses = courses.filter(filterFn);

  filteredCourses.forEach(course => {
    const li = document.createElement('li');
    li.innerHTML = `
      <small>${course.completed ? '✅' : '❌'}</small><strong>${course.subject} ${course.number}</strong>`;
    courseList.appendChild(li);
  });

  const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
  creditDisplay.textContent = `The total credits for course listed above is ${totalCredits}`;
}

allBtn.addEventListener('click', () => displayCourses(() => true));
wddBtn.addEventListener('click', () => displayCourses(course => course.subject === 'WDD'));
cseBtn.addEventListener('click', () => displayCourses(course => course.subject === 'CSE'));

displayCourses(() => true);
