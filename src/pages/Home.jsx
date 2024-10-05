import React from 'react'
import requests from '../Requests'
import Main from '../components/Main/Main'
import Row from '../components/Row/Row'

const Home = () => {
	return (
		<div>
			<Main />
			<Row id='1' title='Сейчас выходят' fetchURL={requests?.requestUpcoming} />
			<Row id='2' title='Популярные' fetchURL={requests?.requestPopular} />
			<Row id='3' title='Лучшие' fetchURL={requests?.requestTopRated} />
			<Row id='4' title='Больше просмотров' fetchURL={requests?.requestTrending} />
			<Row id='5' title='Ужасы' fetchURL={requests?.requestHorror} />
			
		</div>
	);
};

export default Home;