import React from 'react';

export class GameMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            games: [
                {
                    id: 'jigsaw-puzzle',
                    name: 'Jigsaw Puzzle',
                    link: '/puzzle'
                },

                {
                    id: 'square-game',
                    name: 'Tap the Square',
                    link: '/square'
                },
                {
                    id: 'cooking-game',
                    name: 'Cooking game',
                    link: '/cooking'
                }
            ]
        };
    }

    render() {
        return (
            <div className="">
                {
                    this.state.games.map(game => {
                        return (
                            <a href={ game.link }>{ game.name } </a>
                        )
                    })
                }
            </div>
        )
    }
}