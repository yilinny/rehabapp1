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
            ],

            chosenid: 0
        };

        this.onChangeDirection= this.onChangeDirection.bind(this);
    }

    onChangeDirection (direction) {
        let a= this.state.chosenid;
        (direction=== 'L')? a= a -1 : a = a+1
        if (a > 3 || a < 0) {
            (a > 3)? a=0 : a=3
        }
        this.setState({chosenid: a})

    }



    render() {
        return (
            <div className="" style={{ height: '100vh', width: '100vw', backgroundColor: '#006D77' }}>
                <Card style={{ backgroundColor: '#83C5BE', top: `30vh`, left: `38vw`, position: 'absolute'}} raised={true}>
                    <Card.Content>
                    <Image src={`game_menu_pics/bg-${this.state.chosenid}.png`} wrapped ui={false}></Image>
                        <Card.Header>{this.state.games[this.state.chosenid].name}</Card.Header>
                        <Card.Meta>
                            <span className='date'>{this.state.games[this.state.chosenid].tags}</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.state.games[this.state.chosenid].description}
                        </Card.Description>
                            <br/>
                        <Button href={this.state.games[this.state.chosenid].link}> Play now!</Button>
                    </Card.Content>
                </Card>
                <Button style={{position:'absolute', top: '50vh', left: '30vw'}} icon='angle left' onClick={this.onChangeDirection}/>
                <Button style={{position:'absolute', top: '50vh', left: '65vw'}} icon='angle right' onClick={this.onChangeDirection}/>
            </div>
        );
    }
}


//


