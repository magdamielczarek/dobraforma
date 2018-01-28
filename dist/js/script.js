// panel's names
const recipe = 'recipe';
const resources = 'resources';

//
const shape_btns_recipe = document.querySelectorAll('.recipe .shape-icon');
const shape_btns_resources = document.querySelectorAll('.resources .shape-icon');
const inputs_recipe = document.querySelectorAll('.recipe input');
const inputs_resources = document.querySelectorAll('.resources input');
const compare_btn = document.querySelector('.compare-btn');
let result_sign = document.querySelector('.result');
let result_info = document.querySelector('.compare-info>p');
const figure_recipe = document.querySelector('.figure-recipe');
const figure_resources = document.querySelector('.figure-resources');
const instructions = document.querySelector('.instructions');
let is_ready = false;


set_mold = (buttons,panel,inputs) => {
	buttons.forEach((btn)=>{btn.addEventListener('click',
		event => {
			let clicked_shape = event.target.parentElement.nextElementSibling;
			if(clicked_shape.checked === false) {
				buttons.forEach((btn)=>btn.classList.remove('active-choice'));
				clicked_shape.checked = true;
				event.target.classList.add('active-choice');

				let size_window = document.querySelector(`.${panel} .${clicked_shape.value}`);
				let fieldsets = document.querySelectorAll(`.${panel} .size`);
				fieldsets.forEach(fieldset => fieldset.classList.remove('show'));
				size_window.classList.add('show');
				shape = clicked_shape.value;

				let shape_chosen = document.querySelector(`.${panel} .shape-chosen`);
				switch (clicked_shape.value){
					case 'circle': shape_chosen.innerText = 'Forma okrągła';
					break;
					case 'rect': shape_chosen.innerText = 'Forma prostokątna';
					break;
					case 'square': shape_chosen.innerText = 'Forma kwadratowa';
				}
				//reset chosen size after clicking
				shape_chosen.nextElementSibling.innerHTML = `<span class="show-side-a"></span><span class="show-side-b"></span>`;
				result_sign.innerText = '';
				result_info.innerText = '';
				figure_recipe.innerHTML = '';
				figure_resources.innerHTML = '';
				instructions.classList.add('show');
			} else {
				return;
			};
		})
	});
	show_size(inputs,panel);
}

show_size = (inputs,panel) => {
	inputs.forEach(input => {
		input.addEventListener('keyup',(event) => {
			if(/^\d{0,2}$/.test(event.target.value) === false){
				event.target.innerText = ''; 
				return;
			};

			let size_chosen = document.querySelector(`.${panel} .size-chosen`);
			if(shape === 'rect'){
				if(event.target.getAttribute('id') === `side-a-${panel}`){
					let side_a_window = document.querySelector(`.${panel} .show-side-a`);
					side_a_window.innerText = event.target.value;
					rect_side_a = event.target.value;
				} else {
					let side_b_window = document.querySelector(`.${panel} .show-side-b`);
					side_b_window.innerText = event.target.value;
					rect_side_b = event.target.value;
				}
					
			} else if(shape === 'circle') {
				size_chosen.innerText = event.target.value;
				
			} else if (shape === 'square') {
				size_chosen.innerText = event.target.value;
				
			}
			return is_ready = true;
		});
	})
};



compare_areas = () => {

	let resources_area,
		recipe_area,
		resources_final_a,
		resources_final_b,
		recipe_final_a,
		recipe_final_b;

	let	recipe_final_shape = document.querySelector('.shape-chosen').innerText;
	let	recipe_final_size = document.querySelector('.recipe .size-chosen').innerText;
	let	resources_final_shape = document.querySelector('.resources .shape-chosen').innerText;
	let	resources_final_size = document.querySelector('.resources .size-chosen').innerText;
	
	instructions.classList.remove('show');

	draw_figure = (radius,panel) => {
		let figure_cont = document.querySelector(`.figure-${panel}`);
		let figure = document.createElement('div');
		const figures = document.querySelector('.figures');
		figures.style.display = 'block';
		figure_cont.appendChild(figure);
		figure.classList.add('figure');
		figure.style.borderRadius = radius;
		if(panel === recipe){
			if(recipe_final_shape === 'Forma prostokątna'){
				figure.style.width = `${recipe_final_a*3.5}px`;
				figure.style.height = `${recipe_final_b*3.5}px`;
				figure.style.left = `calc(50% - (${recipe_final_a*3.5/2}px)`;
				figure.style.top = `calc(50% - (${recipe_final_b*3.5/2}px)`;
			} else {
				figure.style.width = `${recipe_final_size*3.5}px`;
				figure.style.height = `${recipe_final_size*3.5}px`;
				figure.style.left = `calc(50% - (${recipe_final_size*3.5/2}px)`;
				figure.style.top = `calc(50% - (${recipe_final_size*3.5/2}px)`;
			}
		} else {
			if(resources_final_shape === 'Forma prostokątna'){
				figure.style.width = `${resources_final_a*3.5}px`;
				figure.style.height = `${resources_final_b*3.5}px`;
				figure.style.left = `calc(50% - (${resources_final_a*3.5/2}px)`;
				figure.style.top = `calc(50% - (${resources_final_b*3.5/2}px)`;
			} else {
				figure.style.width = `${resources_final_size*3.5}px`;
				figure.style.height = `${resources_final_size*3.5}px`;
				figure.style.left = `calc(50% - (${resources_final_size*3.5/2}px)`;
				figure.style.top = `calc(50% - (${resources_final_size*3.5/2}px)`;
			}
		}	
	}

	if(recipe_final_shape === 'Forma prostokątna'){
		recipe_final_a = document.querySelector('.recipe .show-side-a').innerText;
		recipe_final_b = document.querySelector('.recipe .show-side-b').innerText;
	}
	if(resources_final_shape === 'Forma prostokątna'){
		resources_final_a = document.querySelector('.resources .show-side-a').innerText;
		resources_final_b = document.querySelector('.resources .show-side-b').innerText;
	}

	switch (recipe_final_shape){
		case 'Forma okrągła': recipe_area = Math.round(Math.PI*(Math.pow(Number(recipe_final_size),2)/4));
		draw_figure('50%','recipe');
		break;
		case 'Forma prostokątna': recipe_area = Number(recipe_final_a)*Number(recipe_final_b);
		draw_figure('0','recipe');
		break;
		case 'Forma kwadratowa': recipe_area = Math.pow(Number(recipe_final_size),2);
		draw_figure('0','recipe');
	}
	switch (resources_final_shape){
		case 'Forma okrągła': resources_area = Math.round(Math.PI*(Math.pow(Number(resources_final_size),2)/4));
		draw_figure('50%','resources');
		break;
		case 'Forma prostokątna': resources_area = Number(resources_final_a)*Number(resources_final_b);
		draw_figure('0','resources');
		break;
		case 'Forma kwadratowa': resources_area = Math.pow(Number(resources_final_size),2);
		draw_figure('0','resources');
	}

	let proportion = resources_area/recipe_area;
	let difference_number = proportion - 1;
	let difference = Math.round((Math.abs(difference_number)) * 100);
	
	if(difference_number === 0){
		result_sign.classList.remove('red-font');
		result_sign.classList.add('green-font');
		result_sign.innerText = '=';
		result_info.innerText = 'Twoja forma jest tej samej wielkości, co forma z przepisu. Udanych wypieków!';
		document.querySelector('.figure-recipe .figure').style.backgroundColor = '#D8DC37';
		document.querySelector('.figure-resources .figure').style.backgroundColor = '#D8DC37';
	} else if (difference_number>0) {
		document.querySelector('.figure-resources .figure').style.zIndex = '0';
		document.querySelector('.figure-recipe .figure').style.zIndex = '1';
		if(difference <= 20){
			result_sign.innerText = '<';
			result_info.innerText = `Twoja forma jest większa od formy z przepisu o ${difference}%. To mała różnica. Ciasto prawie na pewno się uda.`;
			result_sign.classList.remove('red-font');
			result_sign.classList.add('green-font');
			document.querySelector('.figure-resources .figure').style.backgroundColor = '#D8DC37';
		} else if(difference > 20 && difference <= 30){
			result_sign.innerText = '<';
			result_info.innerText = `Twoja forma jest większa od formy z przepisu o ${difference}%. Ciasto się uda, choć będzie niższe.`;
			result_sign.classList.remove('red-font');
			result_sign.classList.add('green-font');
			document.querySelector('.figure-resources .figure').style.backgroundColor = '#D8DC37';
		} else if (difference > 30){
			result_sign.innerText = '<';
			result_info.innerText = `Twoja forma jest większa od formy z przepisu o ${difference}%. Ciasto będzie zbyt płaskie.`;
			result_sign.classList.remove('green-font');
			result_sign.classList.add('red-font');
			document.querySelector('.figure-resources .figure').style.backgroundColor = '#FF491B';
		}
	} else if (difference_number<0) {
		document.querySelector('.figure-recipe .figure').style.zIndex = '0';
		document.querySelector('.figure-resources .figure').style.zIndex = '1';
		if(difference <= 20){
			result_sign.innerText = '>';
			result_info.innerText = `Twoja forma jest mniejsza od formy z przepisu o ${difference}%. To mała różnica. Ciasto prawie na pewno się uda.`;
			result_sign.classList.remove('red-font');
			result_sign.classList.add('green-font');
			document.querySelector('.figure-recipe .figure').style.backgroundColor = '#D8DC37';
		} else if(difference > 20 && difference <= 30){
			result_sign.innerText = '>';
			result_info.innerText = `Twoja forma jest mniejsza od formy z przepisu o ${difference}%. Ciasto się uda, choć będzie wyższe.`;
			result_sign.classList.remove('red-font');
			result_sign.classList.add('green-font');
			document.querySelector('.figure-recipe .figure').style.backgroundColor = '#D8DC37';
		} else if (difference > 30) {
			result_sign.innerText = '>';
			result_info.innerText = `Twoja forma jest mniejsza od formy z przepisu o ${difference}%. Ciasto wyleje się z formy przy pieczeniu`;
			result_sign.classList.remove('green-font');
			result_sign.classList.add('red-font');
			document.querySelector('.figure-recipe .figure').style.backgroundColor = '#FF491B';
		}
	}	
}



set_mold(shape_btns_recipe,recipe,inputs_recipe);
set_mold(shape_btns_resources,resources,inputs_resources);



compare_btn.addEventListener('click',()=>{
	if(!is_ready){return;}
	instructions.classList.add('hide');
	compare_areas();
});