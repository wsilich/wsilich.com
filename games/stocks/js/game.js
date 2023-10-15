$(document).ready(function()
{
	const stop = document.getElementById("stop");
	const start = document.getElementById("start");
	const pricePar = document.getElementById("opt1price");
	const bank = document.getElementById("money");
	const stock = document.getElementById("opt1stocks");
	const buy = document.getElementById("opt1buy");
	const sell = document.getElementById("opt1sell");
	const buy10 = document.getElementById("opt1buy10");
	const sell10 = document.getElementById("opt1sell10");
	const buyAll = document.getElementById("opt1buyAll");
	const sellAll = document.getElementById("opt1sellAll");

	// user data
	let userMoney = 500;
	let purchased = 0;

	// game data
	let canvas = document.getElementById("myCanvas");
	let ctx = canvas.getContext("2d");
	ctx.lineWidth = 2;
	ctx.fillStyle = "#ccc";
	let width = 500;
	let height = 300;
	let speed = 200;
	ctx.fillRect(0,0,width, height);

	let x = 0;
	let previous = Math.random() * height;
	let value = (previous + Math.random() * height) / 2;

	let interval = setInterval(function (){
		draw();
	}, speed);

	function draw()
	{
		ctx.beginPath();
		ctx.moveTo(x, value);

		// calculate how it changes
		let min = height - value; // so it can add 300 to start
		let max = height - (height - value);  // so it can subtract 0 to start
		let change = 20;
		change = (Math.round(Math.random()) ?  Math.random() * max * -1 : Math.random() * min);
		// make it smoother and round to cent
		value =  Math.round(((value + previous +  (value + change)) / 3) * 100) / 100;

		x += 5;
		// value += Math.round(change * 100) / 100;

		// validate values are within chart
		if (height - value <= 0)
		{
			value = 0.01; // keep number positive
		}

		if (x > 500)
		{
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "#ccc";
			ctx.fillRect(0,0, width, height);
			x = 0;
			ctx.moveTo(x, value);
		}

		previous = value;

		ctx.lineTo(x, value);
		ctx.stroke();
		updatePrice(value);
	}

	function updatePrice(value)
	{
		let price = height - value;
		pricePar.innerText = "Price: $" + price.toFixed(2);
	}

	function stopInt()
	{
		clearInterval(interval);
	}

	function startInt()
	{
		interval = setInterval(function (){
			draw();
		}, speed);
	}

	function updateUser()
	{
		bank.innerText = "Bank: $" + userMoney.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		stock.innerText = "Stocks: " + purchased;
	}

	function purchase()
	{
		let price = height - value;
		if (price <= userMoney)
		{
			userMoney = userMoney - price;
			purchased++;
			updateUser();
		}
	}

	function purchaseAll()
	{
		let price = height - value;
		let numBought = Math.floor(userMoney / price);
		userMoney = userMoney - (price * numBought);
		purchased += numBought;
		updateUser();
	}

	function purchase10()
	{
		let price = (height - value) * 10;
		if (price <= userMoney)
		{
			userMoney = userMoney - price;
			purchased += 10;
			updateUser();
		}
	}

	function sellStock()
	{
		if (purchased >= 1)
		{
			let price = height - value;
			purchased--;
			userMoney = userMoney + price;
			updateUser();
		}
	}

	function sellAllStock()
	{
		if (purchased >= 1)
		{
			let price = height - value;
			let sellValue = price * purchased;
			purchased = 0;
			userMoney = userMoney + sellValue;
			updateUser();
		}
	}

	function sell10Stock()
	{
		if (purchased >= 10)
		{
			let price = (height - value) * 10;
			purchased -= 10;
			userMoney = userMoney + price;
			updateUser();
		}
	}

	// listeners
	stop.addEventListener("click", stopInt);
	start.addEventListener("click", startInt);

	buy.addEventListener("click", purchase);
	sell.addEventListener("click", sellStock);
	buy10.addEventListener("click", purchase10);
	sell10.addEventListener("click", sell10Stock);
	buyAll.addEventListener("click", purchaseAll);
	sellAll.addEventListener("click", sellAllStock);
});
