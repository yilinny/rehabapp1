import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

import '../gamemenu/gamemenu.css'

import logo1 from './home/logo1.png'
import logo2 from './home/logo2.png'
import logo3 from './home/logo3.png'
import logo4 from './home/logo4.png'

import motivation from './home/motivation.png'
import performanceskills from './home/running.png'
import virtualenv from './home/phone.png'
import control from './home/game control.png'
import data from './home/file.png'


export function WhyGames() {

    const [chosen_id, setChosenId] = useState(0);
    const benefits = [
        {
            title: 'Motivation',
            text: 'Characteristics of games, including fantasy, sensory stimuli, challenge and clear rules and goals (Garris et al., 2002) contribute to the enjoyment of the game. Rewards associated with the achievement of in-game goals has also linked gamification to increased engagement in other fields (eg. education). Elaklouk et al. (2013) suggests by allowing for grading and the \'just right\' challenge, games enhances clients\' confidence and enjoyment. The increased motivation to adhere to interventions is associated with increased functional outcomes (Tincon et al., 2021)',
            pic: motivation,
        },
        {
            title: 'Performance Skills',
            text: 'Elaklok et al. (2013) contends games are unique for it allows cliens to practice rehabilitation tasks without real world consequences, allowing for the gradual improvement of skills via trial and error. Cognitive measures shows using serious mobile-games as an intervention brough about improvement in participants with dementia (Rincon et al., 2021). Elaklouk et al., (2013) finds similar gains for the brain injured population. Meanwhile, exergames (serious games promoting exercise) has been found to increase adherance and engagement in physical therapy interventions. ',
            pic: performanceskills
        },
        {
            title: 'Virtual environment',
            text: 'The virtual environment allows for risk to be taken as elaborated upon earlier. Additionally, it allows for a degree of fantasy and sensory stimuli, and potentially mystery, further enhacning client\'s enjoyment and engagement in therapy (Rincon et al., 2021) The virtual environment also allows for adaptation of activity demands, so that it could be gradually increased allowing clients the opportunity for gradual skill development, whilst still being ecologically valid. For example, our cooking game is based on the occupation and tasks involved in cooking, but allows for skills to be gradually challenged.',
            pic: virtualenv
        }, {
            title: 'Control and grading',
            text: 'The biggest difference between off the shelf games and Gamified Rehab is the potential for control and grading. Elaklouk et al. (2013) contends this is essential for the game to be focused on the achievement of client\'s therapeutic goals; whilst simulataneouly allowing for the game to address a huge range of impairments which different clients present with.The increased control offered by the game also allows for a degree of personalization, in line with the client-centered principles of occupational therapy (RCOT, 2021).',
            pic: control
        }, {
            title: 'Data analytics',
            text: 'Games have the potential to produce objective data measures that allow for the monitering of outcomes (Elaklouk et al., 2013). Harnessing the data as a form of outcome measure is part of RCOT (2021) new strategy of improved data literarcy amongst occupational therapists. Elaklouk et al (2013) suggests presenting the data to clients over time can help further improve motivation. On the other hand, collecting data on usage timings allow for therapist to track therapy adherence utside of therapy hours.',
            pic: data
        }, {
            title: 'Referenced resources',
            text: '1) Elaklouk, A.M., Mat Zin, N.A. and Shapii, A., 2013, November. Game design for acquired brain injury cognitive rehabilitation: a conceptual framework. In International Visual Informatics Conference (pp. 218-230). Springer, Cham. 2) Liu, L., 2018. Occupational therapy in the fourth industrial revolution. Canadian Journal of Occupational Therapy, 85(4), pp.272-283. 3) Ríos Rincón, A.M., Daum, C., Miguel Cruz, A., Liu, L. and Stroulia, E., 2022. Feasibility and Acceptability of a Serious Mobile-Game Intervention for Older Adults. Physical & Occupational Therapy In Geriatrics, pp.1-24. This list is not all inclusive, but a list of key references',
            pic: logo4
        }
    ];

    const onChangeDirection = (direction) => {
        let a = chosen_id;
        (direction === 'L') ? a = a - 1 : a = a + 1
        if (a > 5 || a < 0) {
            (a > 5) ? a = 0 : a = 5
        }
        setChosenId(a)

    };

    return (
        <div class='whygamecontainer'>
            <h1 style={{ color: '#a3776c', textAlign: 'center', paddingTop: '10%' }}> WHY GAMES?</h1>
            <a href='./'><btn class='backbtn' style={{ backgroundColor: '#ffddd2' }}> back </btn></a>
            <p> This game was inspired by the creators’ time on placements as occupational therapy students. Our experience made us realise the lack of human resources in carrying out the intensity of therapy that is optimal for neurological rehabilitation. At the same time, we recognized the immense potential games have in motivating clients in engaging with therapy, whilst exercising various cognitive and motor skills. Thus we hope to tap on accessible gamified interventions to expunge that gap.
            </p>
            <h3> UNIQUE BENEFITS OF USING GAME AS THERAPY </h3>
            <div style={{ paddingLeft: '10%' }}>
                <div class='whygamecard'>
                    <img style={{ width: '300px', height: 'auto' }} src={benefits[chosen_id].pic} alt='decorative icons'></img>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly' }}>
                        <h3 style={{ paddingTop: '2%', color: '#006d77' }}> {benefits[chosen_id].title}</h3>
                        <p>{benefits[chosen_id].text}</p>
                    </div>
                </div></div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2%' }}>
                <Button style={{ width: '10%', position: 'relative' }} icon='angle left' onClick={() => { onChangeDirection('L') }} />
                <Button style={{ width: '10%', position: 'relative' }} icon='angle right' onClick={() => { onChangeDirection('R') }} />
            </div>
            <h3 style={{ paddingTop: '5%' }}> TIPS FOR USING THIS WEBAPP</h3>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={logo1} style={{ width: '250px', height: 'auto' }} alt='boy reading book'></img>
                <p style={{ flexGrow: '2' }}> Read the games' description for ideas of what skills each game addresses to choose the perfect game  </p>
                <img style={{ width: '250px', height: 'auto' }} src={logo2} alt='information icon'></img>
                <p style={{ flexGrow: '2' }}> Find out more about how you can  grade or adapt games for your clients by pressing/hovering the information button in the settings </p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <img src={logo3} style={{ width: '250px', height: 'auto' }} alt='girl clipart'></img>
                <p style={{ flexGrow: '2' }}>
                    Work with clients and understand their needs and preferences in choosing and adapting games.</p>
                <img style={{ width: '250px', height: 'auto' }} src={logo4} alt='www icon'></img>
                <p style={{ flexGrow: '2' }}> If you've found the games useful, check out: my-therappy.co.uk or the OT Toolbox for other games suitable for OT </p>
            </div>
            <p> This is a game, designed for both clients and clinicians alike (read the information manual embedded in the game for details!). As we are no coding experts and are merely at the start of our OT career, we understand that our games are by no means perfect, so we welcome any feedback here. In the meantime, happy playing!</p>
            <div style={{ justifyContent: 'center', paddingBottom: '10vh', paddingLeft: '35vw' }}>
                <a href='https://forms.gle/FiRetJqLarm4bFWUA'><btn className='backbtn' style={{ position: 'relative' }}>feedback here</btn></a>

            </div>
        </div>
    )

}


