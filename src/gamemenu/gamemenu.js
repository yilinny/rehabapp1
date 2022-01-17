import React from 'react';
import { Card, Icon, Image, Button } from 'semantic-ui-react';

export class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {
                    id: 'jigsaw-puzzle',
                    name: 'Jigsaw Puzzle',
                    link: '/puzzle',
                    description: 'Jigsaw puzzles from 4-84 pieces to complete. Option to turn own photos into puzzle as well!',
                    tags: 'visual processing, sustained attention, gross motor (drag and drop)'
                },

                {
                    id: 'square-game',
                    name: 'Tap the Square',
                    link: '/square',
                    description: 'Tap the square! High scores and level ups provide motivation to keep at repetition needed.',
                    tags: 'gross motor/repetition, information processing, visual assessment, accuracy training'
                },
                {
                    id: 'cooking-game',
                    name: 'Cooking game',
                    link: '/cooking',
                    description: 'Choose from a variety of recipes, grade according to cognitive/physical skills.',
                    tags: 'occupation based, attention, working memory, information processing, gross motor'
                },
                {
                    id: 'dino-game',
                    name: 'Dino',
                    link: '/dino',
                    description: 'The classic chrome dinosaur game! Pay attention and help dino avoid the obstacles',
                    tags: 'sustained attention, information processing'
                }
            ]
        };
    }

    render() {
        return (
            <div className="" style={{ height: '100%', width: '100%', backgroundColor: '#006D77' }}>
                {
                    this.state.games.map((game, index) => {
                        return (
                            <Card style={{ backgroundColor: '#83C5BE', top: `${(Math.floor(index * 0.5) * 40 + 15)}%`, left: `${(index % 2) * 38 + 18}%`, position: 'absolute', width: '30%' , height: '35%'}}>
                                <Card.Content>
                                    <Image src={`game_menu_pics/bg-${index}.png`} wrapped ui={true}></Image>
                                    <Card.Header>{game.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{game.tags}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {game.description}
                                    </Card.Description>
                                    <br/>
                                    <Button href={game.link}> Play now!</Button>
                                </Card.Content>
                            </Card>
                        );
                    })
                }
            </div>
        );
    }
}



