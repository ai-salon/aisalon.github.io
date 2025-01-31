"use strict";

$(document).ready(function () {
	/* Video Lightbox */
	if (!!$.prototype.simpleLightboxVideo) {
		$('.video').simpleLightboxVideo();
	}

	/*ScrollUp*/
	if (!!$.prototype.scrollUp) {
		$.scrollUp();
	}

	/*Responsive Navigation*/
	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-trigger span").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$(this).removeClass("open");
		} else {
			$("nav#nav-mobile ul").addClass("expanded").slideDown(250);
			$(this).addClass("open");
		}
	});

	$("#nav-mobile").html($("#nav-main").html());
	$("#nav-mobile ul a").on("click",function() {
		if ($("nav#nav-mobile ul").hasClass("expanded")) {
			$("nav#nav-mobile ul.expanded").removeClass("expanded").slideUp(250);
			$("#nav-trigger span").removeClass("open");
		}
	});

	/* Sticky Navigation */
	if (!!$.prototype.stickyNavbar) {
		$('#header').stickyNavbar();
	}

	$('#content').waypoint(function (direction) {
		if (direction === 'down') {
			$('#header').addClass('nav-solid fadeInDown');
		}
		else {
			$('#header').removeClass('nav-solid fadeInDown');
		}
	});

	// Load team members
	loadTeamMembers();

});


/* Preloader and animations */
$(window).load(function () { // makes sure the whole site is loaded
	$('#status').fadeOut(); // will first fade out the loading animation
	$('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
	$('body').delay(350).css({'overflow-y': 'visible'});

	/* WOW Elements */
	if (typeof WOW == 'function') {
		new WOW().init();
	}

	/* Parallax Effects */
	if (!!$.prototype.enllax) {
		$(window).enllax();
	}

});

// Function to generate team member HTML
function generateTeamMember(member, delay) {
	return `
		<!--Team Member-->
		<div class="col-3 team-member wow fadeInUp" data-wow-delay="${delay}s">
			<div class="team-member-card">
				<div class="team-member-image">
					<img src="${member.profile_image}" alt="${member.name}">
				</div>
				<div class="team-member-info">
					<h4>${member.name}</h4>
					<h5>${member.role}</h5>
					${member.description ? `<p>${member.description}</p>` : '<p></p>'}
					<a href="${member.linkedin}" target="_blank" class="linkedin-link">
						<i class="fa fa-linkedin"></i>
					</a>
				</div>
			</div>
		</div>
		<!--End Team Member-->
	`;
}

// Function to load and render team members
function loadTeamMembers() {
	fetch('_data/team.yml')
		.then(response => response.text())
		.then(yamlText => {
			const teamData = jsyaml.load(yamlText);
			const teamContainer = document.querySelector('.team-container');
			
			if (teamContainer && teamData.team_members) {
				teamContainer.innerHTML = teamData.team_members
					.map((member, index) => generateTeamMember(member, (index * 0.2).toFixed(1)))
					.join('');
			}
		})
		.catch(error => console.error('Error loading team members:', error));
}
