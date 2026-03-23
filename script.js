// Mobile navigation toggle with animated hamburger icon.
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
	menuToggle.addEventListener("click", () => {
		const isOpen = navLinks.classList.toggle("open");
		menuToggle.classList.toggle("is-open", isOpen);
		menuToggle.setAttribute("aria-expanded", String(isOpen));
	});

	// Close mobile menu after clicking a link.
	navLinks.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			navLinks.classList.remove("open");
			menuToggle.classList.remove("is-open");
			menuToggle.setAttribute("aria-expanded", "false");
		});
	});
}

// Smooth scrolling for internal anchor links with offset for sticky nav.
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
	anchor.addEventListener("click", (event) => {
		const targetId = anchor.getAttribute("href");
		if (!targetId || targetId === "#") {
			return;
		}

		const target = document.querySelector(targetId);
		if (!target) {
			return;
		}

		event.preventDefault();
		const headerOffset = 80;
		const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerOffset;

		window.scrollTo({
			top: targetPosition,
			behavior: "smooth"
		});
	});
});

// FAQ accordion behavior.
document.querySelectorAll(".faq-item").forEach((item) => {
	const question = item.querySelector(".faq-question");
	const answer = item.querySelector(".faq-answer");

	if (!question || !answer) {
		return;
	}

	question.addEventListener("click", () => {
		const isOpen = item.classList.contains("open");

		// Close other items for a cleaner accordion experience.
		document.querySelectorAll(".faq-item.open").forEach((openItem) => {
			if (openItem !== item) {
				openItem.classList.remove("open");
				const openBtn = openItem.querySelector(".faq-question");
				const openAnswer = openItem.querySelector(".faq-answer");
				if (openBtn && openAnswer) {
					openBtn.setAttribute("aria-expanded", "false");
					openAnswer.style.maxHeight = "0px";
				}
			}
		});

		item.classList.toggle("open", !isOpen);
		question.setAttribute("aria-expanded", String(!isOpen));
		answer.style.maxHeight = !isOpen ? `${answer.scrollHeight}px` : "0px";
	});
});

// Reveal sections/cards as they enter the viewport.
const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
	const revealObserver = new IntersectionObserver(
		(entries, observer) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		},
		{
			threshold: 0.16,
			rootMargin: "0px 0px -40px 0px"
		}
	);

	revealElements.forEach((el) => revealObserver.observe(el));
} else {
	revealElements.forEach((el) => el.classList.add("is-visible"));
}

// Light form interaction polish with basic validation feedback.
const contactForm = document.querySelector(".contact-form");
const formNote = document.querySelector(".form-note");

if (contactForm && formNote) {
	const fields = Array.from(contactForm.querySelectorAll("input, textarea"));

	fields.forEach((field) => {
		field.addEventListener("blur", () => {
			if (!field.value.trim()) {
				field.classList.add("is-invalid");
			} else {
				field.classList.remove("is-invalid");
			}
		});

		field.addEventListener("input", () => {
			if (field.value.trim()) {
				field.classList.remove("is-invalid");
			}
		});
	});

	contactForm.addEventListener("submit", (event) => {
		const hasEmptyField = fields.some((field) => {
			const empty = !field.value.trim();
			field.classList.toggle("is-invalid", empty);
			return empty;
		});

		if (hasEmptyField) {
			event.preventDefault();
			formNote.textContent = "Please fill out all fields so I can respond with an accurate quote.";
			return;
		}

		formNote.textContent = "Submitting...";
	});
}

// Auto-update footer year.
const yearEl = document.getElementById("year");
if (yearEl) {
	yearEl.textContent = String(new Date().getFullYear());
}
