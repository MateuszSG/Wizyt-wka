let sectionHeight = document.querySelector('.hero').clientHeight
let scrollBefore = 0
const sections = document.querySelectorAll('section')
const navButtons = document.querySelectorAll('.section-dots > ul > li')

// Highlight active dot

let highlightActiveDot = sectionIndex => {
	navButtons.forEach(e => {
		e.classList.remove('active-dot')
	})

	navButtons[sectionIndex].classList.add('active-dot')
}

// Hero arrow scroll

let scrollToAbout = () => {
	document.getElementById('aboutus').scrollIntoView()
	const currentScroll = window.scrollY
	scrollBefore = currentScroll

	// Highlight active dot
	highlightActiveDot(1)
}

// Check scroll direction is up

let checkScrollDirectionIsUp = e => {
	if (e.wheelDelta) {
		return e.wheelDelta > 0
	}
	return e.deltaY < 0
}

// Change section

document.body.addEventListener('wheel', e => {
	const currentScroll = window.scrollY
	let sectionOffsets = []
	let sectionDistances = []
	let scrollToIndex = 0

	// Get offsets and calculate distances
	sections.forEach(section => {
		sectionOffsets.push(section.offsetTop)
		sectionDistances.push(Math.abs(section.offsetTop - currentScroll))
	})

	// Get index of section using min. distance
	let currentSectionIndex = sectionDistances.indexOf(Math.min(...sectionDistances))

	// Recognize scroll up add down, and set section which we want go to
	if (checkScrollDirectionIsUp(e)) {
		scrollToIndex = currentSectionIndex - 1
		scrollBefore = currentScroll
	} else {
		scrollToIndex = currentSectionIndex + 1
		scrollBefore = currentScroll
	}

	// Highlight active dot
	highlightActiveDot(scrollToIndex)

	// Get offset, where we want to go, because scrollIntoView() doesn't want to work
	let scrollToSection = sectionOffsets[scrollToIndex]

	// Scroll to correct section
	if (scrollToIndex >= 0 && scrollToIndex <= sectionDistances.length - 1) {
		scroll(0, scrollToSection)
	}
})

// Change section by clicking nav

navButtons.forEach(e => {
	e.addEventListener('click', e => {
		const scrollToSection = e.target.dataset.section
		const scrollToSectionId = sections[scrollToSection].id

		// Highlight active dot
		highlightActiveDot(scrollToSection)

		// Scroll to clicked section
		document.getElementById(`${scrollToSectionId}`).scrollIntoView()
		const currentScroll = window.scrollY
		scrollBefore = currentScroll
	})
})
