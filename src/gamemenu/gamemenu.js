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
                    description: 'Complete Jigsaw Puzzles!'
                },

                {
                    id: 'square-game',
                    name: 'Tap the Square',
                    link: '/square',
                    description: 'Simple tap the square game'
                },
                {
                    id: 'cooking-game',
                    name: 'Cooking game',
                    link: '/cooking',
                    description: 'Be your own coooking mama!'
                },
                {
                    id: 'dino-game',
                    name: 'Dino',
                    link: '/dino',
                    description: 'Dinosaur jump!'
                }
            ]
        };
    }

    render() {
        return (
            <div className="" style={{ height: '100%', width: '100%', backgroundColor: 'black' }}>
                {
                    this.state.games.map((game, index) => {
                        return (
                            <Card style={{ top: `${(Math.floor(index * 0.5) * 30 + 20)}%`, left: `${(index % 2) * 40 + 20}%`, position: 'absolute' }}>
                                <Card.Content>
                                    <Image src='game_menu_pics/bg-2.png' wrapped ui={true}></Image>
                                    <Card.Header>{game.name}</Card.Header>
                                    <Card.Meta>
                                        <span className='date'>{game.name}</span>
                                    </Card.Meta>
                                    <Card.Description>
                                        {game.description}
                                    </Card.Description>
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



