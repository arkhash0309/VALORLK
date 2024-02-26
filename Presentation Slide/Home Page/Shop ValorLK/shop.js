const btnCart=document.querySelector('#cart-icon'); //variable for cart icon in the top of screen
const cart=document.querySelector('.cart');
const btnClose=document.querySelector('#cart-close');

btnCart.addEventListener('click',()=>{ //cart active in css part rownum.118
	cart.classList.add('cart-active');
});

btnClose.addEventListener('click',()=>{
	cart.classList.remove('cart-active');
});

document.addEventListener('DOMContentLoaded',loadFood);

function loadFood(){
	loadContent();
}

function loadContent(){
	//remove food items from cart
	let btnRemove=document.querySelectorAll('.cart-remove');
	btnRemove.forEach((btn)=>{
		btn.addEventListener('click',removeItem);
	});
	
	//product item change event
	let qtyElements=document.querySelectorAll('.cart-quantity');
	qtyElements.forEach((input)=>{
		input.addEventListener('change',changeQty);
	});
	
	//product cart
	let cartBtns=document.querySelectorAll('.add-cart');
	cartBtns.forEach((btn)=>{
		btn.addEventListener('click',addCart);
	});
	
	updateTotal();
}
//remove item
function removeItem(){
	if(confirm('This Item Will be removed.')){
		let title=this.parentElement.querySelector('.cart-item-title').innerHTML;
		itemList=itemList.filter(el=>el.title!=title); //el means elemnt in short form its user define variable I think?
		this.parentElement.remove();
		loadContent();
	}
}

//change quantity
function changeQty(){
	if(isNaN(this.value) || this.value<1){
		this.value=1;
	};
	loadContent();
}

let itemList=[];

//add cart
function addCart(){
	let food=this.parentElement;
	let title=food.querySelector('.item-title').innerHTML;
	let price=food.querySelector('.item-price').innerHTML;
	let imgSrc=food.querySelector('.item-img').src;
	
	let newProduct={title,price,imgSrc}
	
	//check product alreadyexist in cart
	if(itemList.find((el)=>el.title==newProduct.title)){
		alert("Product Already Added in Cart");
		return;
	}else{
		itemList.push(newProduct);
	}
	localStorage.setItem("cartItems", JSON.stringify(itemList));

	
	let newProductElement= createCartProduct(title,price,imgSrc);
	let element=document.createElement('div');
	element.innerHTML=newProductElement;
	let cartBasket=document.querySelector('.cart-content');
	cartBasket.append(element);
	loadContent();
	
}

function createCartProduct(title,price,imgSrc){
	return`
		<div class="cart-box">
			<img src="${imgSrc}" class="cart-img">
			<div class="detail-box">
				<div class="cart-item-title">${title}</div>
				<div class="price-box">
					<div class="cart-price">${price}</div>
					<div class="cart-amt">${price}</div>
				</div>
				<input type="number" value="1" class="cart-quantity">
			</div>
			<ion-icon name="trash-outline" class="cart-remove"></ion-icon>
		</div>
	`;
}

function updateTotal(){
	const cartItems=document.querySelectorAll('.cart-box');
	const totalValue=document.querySelector('.total-price');
	
	let total=0;
	
	cartItems.forEach(product => {
		let priceElement=product.querySelector('.cart-price');
		let price=parseFloat(priceElement.innerHTML.replace("රු",""));
		let qty=product.querySelector('.cart-quantity').value;
		total+=(price*qty);
		product.querySelector('.cart-amt').innerText="රු"+price*qty;
	});
	totalValue.innerHTML='රු'+total;
	
	//add product count in cart icon
	const cartCount = document.querySelector('.cart-count');
	let count = itemList.length;
	cartCount.innerHTML = count;
	
	if(count==0){
		cartCount.style.display='none';
	}else{
		cartCount.style.display='block';
	}

	
	
}
// Get the current font size
let currentFontSize = parseInt(window.getComputedStyle(document.body).getPropertyValue('font-size'));

// Define the minimum and maximum font sizes
const minFontSize = 12;
const maxFontSize = 24;

// Get the buttons by their IDs
const increaseButton = document.getElementById('increase-font-size');
const decreaseButton = document.getElementById('decrease-font-size');

// Add click event listeners to the buttons
increaseButton.addEventListener('click', function() {
  // Increase the font size by 2 pixels
  if (currentFontSize < maxFontSize) {
    currentFontSize += 2;
    document.body.style.fontSize = currentFontSize + 'px';
  }
});

decreaseButton.addEventListener('click', function() {
  // Decrease the font size by 2 pixels
  if (currentFontSize > minFontSize) {
    currentFontSize -= 2;
    document.body.style.fontSize = currentFontSize + 'px';
  }
});