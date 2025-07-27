// script.js

document.addEventListener("DOMContentLoaded", function () {
    // Toggle hamburger menu
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navbar = document.querySelector(".navbar");

    hamburger.addEventListener("click", function () {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
        navbar.classList.toggle("menu-open");
    });

    // Close menu on link click
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function () {
            navLinks.classList.remove("active");
            hamburger.classList.remove("active");
            navbar.classList.remove("menu-open");
        });
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });

    document.querySelectorAll('.timeline__content img').forEach(img => {
        img.addEventListener('click', () => {
            const modal = document.createElement('div');
            modal.classList.add('image-modal');
            modal.innerHTML = `
            <div class="modal-bg"></div>
            <img src="${img.src}" class="modal-img" alt="Timeline Preview">
        `;
            document.body.appendChild(modal);
            modal.addEventListener('click', () => document.body.removeChild(modal));
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.carousel-track').forEach((track, sectionIndex) => {
        const slides = track.querySelectorAll('.carousel-slide');
        let currentSlide = 0;

        // 트랙 너비 설정
        track.style.width = `${slides.length * 100}%`;

        function showSlide(index) {
            if (index < 0) index = slides.length - 1;
            if (index >= slides.length) index = 0;
            currentSlide = index;
            const offset = -index * 100;
            track.style.transform = `translateX(${offset}%)`;
        }

        showSlide(0);

        // 해당 섹션에서 좌우 버튼 찾기
        const leftButton = track.parentElement.querySelector('.carousel-arrow.left');
        const rightButton = track.parentElement.querySelector('.carousel-arrow.right');

        // 클릭 이벤트 연결
        leftButton?.addEventListener('click', () => showSlide(currentSlide - 1));
        rightButton?.addEventListener('click', () => showSlide(currentSlide + 1));
    });
});


function openImageModal(imgElement) {
    const modal = document.getElementById("image-modal");
    const modalImg = document.getElementById("image-modal-src");
    modal.style.display = "block";
    modalImg.src = imgElement.src;
}

function closeImageModal() {
    const modal = document.getElementById("image-modal");
    modal.style.display = "none";
}

function openActivityModal(id) {
  const modal = document.getElementById(id);
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';   // 배경 스크롤 잠금

  const section = document.getElementById('scholarly-activity');
  if (section) {
    const y = section.getBoundingClientRect().top + window.scrollY - 50;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

function closeActivityModal(event) {
  const modal = event.currentTarget;
  const content = modal.querySelector(".modal-content");
  if (!content.contains(event.target)) {
    modal.style.display = "none";
    document.body.style.overflow = '';       // 스크롤 복구
  }
}

function goToScholarlyActivity() {
  document.getElementById('scholarly-activity').scrollIntoView({
    behavior: 'smooth'
  });
}
