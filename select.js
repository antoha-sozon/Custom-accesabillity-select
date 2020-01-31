class customSelect {

  constructor(dataType) {
    this.dataType = dataType;
  }

  createCustomSelect(data) {
  	//Custom classes
  	let selectBlockClass = data.BlockClass || 'custom-select-block';
  	let selectListBlockClass = data.ListBlockClass || 'custom-select-list-block';
  	let selectListItemBlockClass = data.ListItemBlockClass || 'custom-select-list-item-block';
  	let selectListItemInputClass = data.ListItemInputClass || 'custom-select-list-item-input';

  	//Create styles
  	let selectBlockCss = `
  		::-webkit-details-marker {
  			display: none
  		} 
		.${selectBlockClass} {
			position: relative;
			display: inline-block;
			width: 200px;
			border: 1px solid #c5c5c5;
			border-radius: 3px;
			position: relative;
			color: #454545
		}
		.${selectBlockClass} summary {
			cursor: pointer;
		  	padding: 6px 12px;
		  	background: #f6f6f6;
		  	list-style: none
		}
		.${selectBlockClass} summary:hover {
		  background: #ededed;
		}
		.${selectBlockClass} summary::after {
		    content: '\\00203A';
		    position: absolute;
		    right: 12px;
		    top: calc(50%);
		    transform: translateY(-50%) rotate(90deg);
		    pointer-events: none;
		}
		.${selectBlockClass}[open] summary::after {
		    content: '\\002039';
		}
	`;
  	let selectListBlockCss = `
  		.${selectListBlockClass} {
			position: absolute;
			display: flex;
			flex-direction: column;
			border: 1px solid #c5c5c5;
			width: 100%;
			left: -1px;
			border-radius: 0 0 3px 3px;
			background: #fff;
		}
	`;
  	let selectListItemBlockCss = `
  		.${selectListItemBlockClass} {
			cursor: pointer;
    		padding: 6px 12px;
		}
  		.${selectListItemBlockClass}:hover,  		
  		.${selectListItemBlockClass}.active {
			background: #007fff;
  			color: #fff;
		}
	`;
  	let selectListItemInputCss = `
  		.${selectListItemInputClass} {
			display: none;
		}
	`;

  	let custonSelectStyles = document.createElement('style');
  	custonSelectStyles.type = 'text/css';
  	if (custonSelectStyles.styleSheet){
	  // This is required for IE8 and below.
	  custonSelectStyles.styleSheet.cssText = custonSelectCss + selectListBlockCss + selectListItemBlockCss + selectListItemInputCss;
	} else {
	  custonSelectStyles.appendChild(document.createTextNode(selectBlockCss + selectListBlockCss + selectListItemBlockCss + selectListItemInputCss));
	}
  	document.getElementsByTagName("head")[0].appendChild(custonSelectStyles);

  	//Take element
  	let element = document.querySelector('[data-type=' + this.dataType + ']');

  	//Create select block
  	let custonSelectBlock = document.createElement('details');
	custonSelectBlock.className = selectBlockClass;
	custonSelectBlock.setAttribute('aria-haspopup', 'listbox');
	element.appendChild(custonSelectBlock);

	//Add first element
	let selectFirstElement = document.createElement('summary');
	selectFirstElement.textContent = 'Make your choice';
	custonSelectBlock.appendChild(selectFirstElement);

	//Add select list block
	let selectListBlock = document.createElement('div');
	selectListBlock.className = selectListBlockClass;
	selectListBlock.setAttribute('role', 'listbox');
	custonSelectBlock.appendChild(selectListBlock);

	for (var i = 0; i < 5; i++) {

		//Add select list item block
		let selectListItemBlock = document.createElement('label');
		selectListItemBlock.className = selectListItemBlockClass;
		selectListBlock.appendChild(selectListItemBlock);

		//Add select list item input
		let selectListItemInput = document.createElement('input');
		selectListItemInput.className = selectListItemInputClass;
		selectListItemInput.type = 'radio';
		selectListItemInput.setAttribute('name', 'selectListItemRadio');
		selectListItemInput.setAttribute('role', 'option');
		selectListItemInput.setAttribute('value', 'value' + i);
		selectListItemBlock.appendChild(selectListItemInput);
		selectListItemBlock.append('value' + i);


		//Add click function
		selectListItemInput.onclick = function() {
			selectFirstElement.textContent = this.value;
			let activeListLabels = selectListBlock.getElementsByClassName('active');
			for (var i = 0; i < activeListLabels.length; i++) {
				activeListLabels[i].classList.remove('active');
			}
			this.parentElement.classList.add('active');

			if (data.ResultBlockClass) {
				let ResultBlock = document.querySelector('.'+ data.ResultBlockClass);
				ResultBlock.innerHTML = '<h2>Your chose: <span>' + this.value + '</span></h2>';
			}
		}
	}

	//Tracking click off the menu
	document.onclick = function(e) {
	  let target = e.target;
	  let its_menu = target == selectFirstElement;
	  
	  if (!its_menu) {
		custonSelectBlock.removeAttribute('open');
	  }
	}
  }

}