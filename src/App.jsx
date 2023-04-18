import React, { useState, useEffect } from 'react';
import Card from './Components/Card';	
import './App.css';

function App() {

	const [name, setName] = useState(); 
	const [gameState, setGameState] = useState(false);

	const [cards, setCards] = useState([]);

	const [firstCard, setFirstCard] = useState({});
  	const [secondCard, setSecondCard] = useState({});

  	const [unflippedCards, setUnflippedCards] = useState([]); // Arreglo de los números de cartas que necesitan volver su posición inicial
  	const [disabledCards, setDisabledCards] = useState([]);  // Arreglo de los números de cartas que necesitan ser deshabilitadas porque ya hicieron match 

  	const [hits, setHits] = useState(0);
  	const [miss, setMiss] = useState(0);



	useEffect(() => {
		async function getImages() {
  			const res = await fetch('https://fed-team.modyo.cloud/api/content/spaces/animals/types/game/entries?per_page=20');
			const data = await res.json();
			let urls = [];
	  		let content = [];


			data["entries"].forEach((obj) => {
			  urls.push(obj.fields.image.url);
			});

 			for (let i = 0; i < 18; i++){
 				content.push(urls[0])
 				if (i % 2 == 1) {
 				  urls.splice(0, 1);
 				}
 			}
 			content.sort(() => Math.random() - 0.5); // Desordeno el arreglo
			setCards(content);
		}
		getImages();		
	}, [])



	useEffect(() => {
    	checkForMatch();
  	}, [secondCard]);  // Este useEffect se va a ejecutar cada vez que secondCard sea modificado

	const flipCard = (name, number) => {
	    if (firstCard.name === name && firstCard.number == number) // Se intenta voltear la misma carta
	      	return 0;
	    if (!firstCard.name)  // Aún no se ha volteado la primera carta
	    	setFirstCard({ name, number });
	    else if (!secondCard.name)  // Se ha volteado la primera carta pero aún no se ha volteado la segunda carta
	      	setSecondCard({ name, number });
	    return 1; // Devolverá 1 para los demás casos solo puede ser que tanto la primera como la segunda fueron volteadas
	}

	const checkForMatch = () => {
		if (firstCard.name && secondCard.name) { // Verifica primero que no sean vacías estas variables ya que al principio están vacías
			const match = firstCard.name === secondCard.name;
			if (match) {
				disableCards();
				setHits(hits + 1);
			} else {
				unflipCards();
				setMiss(miss + 1);
			}
		}
	}

	const resetCards = () => {
    	setFirstCard({});
    	setSecondCard({});
  	}

  	const unflipCards = () => {
  		setUnflippedCards([firstCard.number, secondCard.number]);
	    resetCards();
	};

	const disableCards = () => {
		setDisabledCards([firstCard.number, secondCard.number]);
	    resetCards();
	};

	const start = () => {
		setGameState(true);		
	}

	if (!gameState) {
		return (
			<div className="login-form_stargame">
				<input type='text' placeholder='Type your name' onChange={(e) => setName(e.target.value)} />
				<button onClick={ start }>Start game</button>
			</div>
		)
	}

	return (
		<div>
			<div className="element-info">
				<h2>HITS: { hits }</h2>
				<h2>MISS: { miss }</h2>	
				<h3>{ hits === 9 ? `Felicitaciones ${ name }` : ``}</h3>			
			</div>		
			<div className='app'>
					
				<div className='cards-container'>
					{
						cards.map((card, i) => (
							<Card 
								key={i} 
								name={card}
								number={i} 
								frontFace={card}
								flipCard={flipCard} 
								unflippedCards={unflippedCards}
	              				disabledCards={disabledCards}
							/>
						))	
					}			
				</div>
			</div>
		</div>		
	)
	
}

export default App;