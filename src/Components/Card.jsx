import React, { useState, useEffect } from 'react';
import ReactCardFlip from 'react-card-flip';
import backFace from './images/question.be8106da08c32ce097dc.jpg';

const Card = ({ name, number, frontFace, flipCard, unflippedCards, disabledCards}) => {

	const [isFlipped, setIsFlipped] = useState(false);

	const [hasEvent, setHasEvent] = useState(true);

	useEffect(() => {
	    if (unflippedCards.includes(number)) { // Si en el arreglo unflippedCards se encuentra incluido el número de la carta actual
	    	setTimeout(() => setIsFlipped(false), 700);  // Entonces la carta debe ir boca abajo
	    }
	}, [unflippedCards])  // Este useEffect se va a ejecutar cada vez q unflippedCards sea modificado

	useEffect(() => {
	    if (disabledCards.includes(number)) {
	      setHasEvent(false);
	    }
	}, [disabledCards])  // Este useEffect se va a ejecutar cada vez que disabledCards sea modificado

	const flip = e => {
		const value = flipCard(name, number);
		if (value !== 0)
			setIsFlipped(!isFlipped); // Voltea la carta solo si no es la misma que estamos volteando
	}

	return (
		<div className='card'>
			<ReactCardFlip isFlipped={ isFlipped }>
				<img src={ backFace } alt='back-face' className="card-image" onClick={ hasEvent ? flip : null } />	
				<img src={ frontFace } alt='back-face' className="card-image" onClick={ hasEvent ? flip : null } />	
			</ReactCardFlip>
		</div>
	)	

}

export default Card;