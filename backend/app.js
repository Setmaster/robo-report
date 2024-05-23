import express from 'express';
import sqlite from 'better-sqlite3';
import cors from 'cors';

export const MockData = [
  {
    id: 'n1',
    title: 'Can Robotic Bees Save Our Ecosystem?',
    image: 'robotbee.png',
    date: '2024-05-15',
    slug: 'can-robotic-bees-save-our-ecosystem',
    content: 'As bee populations decline, robotic bees emerge as a novel solution to pollination shortages threatening global food supplies. These tiny robots could mimic the pollination process, ensuring the survival of crops and natural plants. Yet, the idea of robotic insects raises questions about the future of natural ecosystems and our reliance on technology to solve environmental crises.'
  },
  {
    id: 'n2',
    title: 'How Robot Farmers Are Revolutionizing Agriculture',
    image: 'robotfarmer.png',
    date: '2024-03-28',
    slug: 'how-robot-farmers-are-revolutionizing-agriculture',
    content: 'Robot farmers are set to transform the agricultural landscape. Automated systems for planting, weeding, and harvesting can increase efficiency and reduce labor costs, potentially solving the global food crisis. However, the shift towards robotic farming also brings challenges, including the displacement of agricultural workers and the need for sustainable practices.'
  },
  {
    id: 'n3',
    title: 'Ethical Dilemmas: The Use of Robots in Policing',
    image: 'robotcop.png',
    date: '2023-02-09',
    slug: 'ethical-dilemmas-the-use-of-robots-in-policing',
    content: 'The deployment of robots in policing raises profound ethical questions about surveillance, force, and the role of AI in justice. As we integrate these machines into law enforcement, the balance between safety and civil liberties is tested. The use of robots could redefine policing strategies, but at what cost to privacy and human oversight?'
  },
  {
    id: 'n4',
    title: 'Robot Surrogates for Humans: A New Era of Childbirth?',
    image: 'pregnantrobot.png',
    date: '2023-01-17',
    slug: 'robot-surrogates-for-humans-a-new-era-of-childbirth',
    content: 'With the advent of robot surrogates, the future of childbirth is poised to undergo a dramatic transformation. These robotic systems offer a groundbreaking solution for infertility and the risks associated with pregnancy and childbirth. As we move into 2024, the ethical and societal implications of robot-assisted childbirth spark a complex debate about the nature of parenthood and the role of technology in our lives.'
  },
  {
    id: 'n5',
    title: 'The Future of Human Evolution: Brain Implants',
    image: 'brainimplant.png',
    date: '2022-12-20',
    slug: 'the-future-of-human-evolution-brain-implants',
    content: 'Brain implants represent a significant leap towards merging human cognition with artificial intelligence. As we advance into 2023, the prospect of enhancing mental capabilities becomes not just a possibility but a reality. These implants could revolutionize treatments for neurological disorders and redefine the limits of human intelligence and memory.'
  },
];

const db = sqlite('data.db');

function initDb() {
  db.prepare(
    'CREATE TABLE IF NOT EXISTS news (id INTEGER PRIMARY KEY, slug TEXT UNIQUE, title TEXT, content TEXT, date TEXT, image TEXT)'
  ).run();

  const { count } = db.prepare('SELECT COUNT(*) as count FROM news').get();

  if (count === 0) {
    const insert = db.prepare(
      'INSERT INTO news (slug, title, content, date, image) VALUES (?, ?, ?, ?, ?)'
    );

    MockData.forEach((news) => {
      insert.run(news.slug, news.title, news.content, news.date, news.image);
    });
  }
}

const app = express();

app.use(cors())

app.get('/news', (req, res) => {
  const news = db.prepare('SELECT * FROM news').all();
  res.json(news);
});

initDb();

app.listen(8080);
