import square from '../user_logins/pics/icons/square.svg'
import puzzle from './pics/bg-0.png'
import cooking from './pics/bg-2.png'
import dino from '../newdino/pics/dino.png'


import squarebrief from './pics/square-brief.svg'
import puzzlebrief from './pics/puzzle-brief.svg'
import cookingbrief from './pics/cooking-brief.svg'
import dinobrief from './pics/dino-brief.svg'

export const general = {
    streak: {
        header: 'LONGEST STREAK: ',
        units: ' DAYS'
    },
    mostplayed: {
        header: 'MOST PLAYED GAME: ',
        units: ''
    },
    coins: {
        header: 'COINS EARNED: ',
        units: ''
    },
    achievement: {
        header: 'GREATEST IMPROVEMENT: ',
        units: ' POINTS'
    }

}



export const gameDict = {
    square: {
        name: 'Tap the Square',
        icon: square,
        brief: squarebrief,
        keys: ['Level', 'Score', 'Speed'],
        skillsexplained: 'The tapping action to tap the squares involves the index finger flexing and extending repeatedly and accurately. Additionally, gross motor skills are required to move forearms across screens accurately to tap the sqaures within a given time frame. These movement is necessary in the functional movement of reaching, grasping and gripping. These are needed in tasks such as gripping a shower head and grasping a ball, which are neccessary in self-care occupations such as showering or leisure occupations such as basketball. Users facing difficulty in these movements may benefit from engaging in this game. The faster the user is able to tap the squares accurately, the faster the user is able to flex and extend their index finger accurately and the better able they are to execute functional movement for such occupations.',
        resultunits: ['Highest Level reached', 'Average Score', 'Average Speed/tap'],
        //list of lists to generate multiple paras based on multiple threshold. 
        standard: ['At this level, the user\'s current average may indicate speed equivalent to the CHANGE percentile of users. This may indicate CHANGE gross and fine motor skills, as well as motor planning abilities. These skills impact upon reaching and grasping, evident in occupations such as CHANGE. CHANGE. Outside of the game, consider CHANGE to further work upon motor skills.'],
        indicators: [[
            ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            ['poor', 'poor', 'average', 'better than average', 'excellent'],
            ['feeding', 'feeding', 'pouring liquids', 'chopping', 'knitting'],
            ['Deficits observed in the game may hence affect users\' ability to indepedently manage these occupations, and you may consider grading these tasks per their abilities, for example placing objects nearer to their reach.', 'Deficits observed in the game may hence affect users\' ability to indepedently manage these occupations, and you may consider grading these tasks per their abilities, exploring relevant feeding aids.', 'At this level, finer motor tasks requiring greater accuracy such as pouring liquids may prove difficulty, and you may consider grading the tasks, for example, exploring different aids in the kitchen for service users.', 'At this level, finer motor tasks requiring greater accuracy such as chopping may prove difficult, and you may consider grading the tasks, for example, exploring different aids in the kitchen for service users', 'At this level, finer motor tasks requiring greater accuracy such as knitting may prove difficult, and you may consider grading the tasks, for example, exploring different aids in the kitchen for service users'],
            ['encouraging independent feeding and drinking at mealtimes', 'encourage indepedent dressing tasks as part of morning routines', 'weaving in finer motor tasks as part of dressing (buttons, shoelaces)', 'exploring typing as part of phone or computer use', 'leisure occupations such as manipulating a real puzzle piece, or holding a pencil to draw']
        ]],
        threshold: {
            'Speed': [0, 0.4, 0.8, 1.6, 3]
        }//keys show which indicator
    },
    puzzle: {
        name: 'Puzzle',
        icon: puzzle,
        brief: puzzlebrief,
        keys: ['Pieces', 'Speed', 'Time'],
        skillsexplained: 'Completing the puzzle encourages repetition of gross motor movement, service users would have to drag the pieces to the right spot. Meanwhile, completing the puzzle accurately is a test of users\' visual form consistency, as they are challenged to align and position puzzle pieces based on existing pieces. In doing so, users are processing the visual information on the screen, evaluating where each piece belongs by comparing with the completed puzzle provided or by accessing continuity of items on the screen. In daily life, visual form constancy affects users\' perception of objects (the ability to differentiate between different objects). Combined with information processing skills, the skills addressed map back to the complex skill of identifying and choosing appropriate tools for each tasks, and the occupation of reading. ',
        resultunits: ['average number of pieces', 'average time spent/piece', 'average time of completion'],
        //list of lists to generate multiple paras based on multiple threshold. list index by alphabetical order. 
        standard: ['The more the number of pieces the puzzle is split into, the greater the need for repetition to drag the pieces to their right spot.  This is appropriate for accuracy training and fine motor skills. Meanwhile, it can also be a proxy for how well the user sustains attention throughout the task, or how well users are able to process visual information, to piece puzzle pieces together. The below data should be supplemented by clinical observations to futher inform appropriate intervention planning. \n\nThe average number of pieces completed by the user falls within the CHANGE range. At this level, users usually face CHANGE in fine motor skills such as manipulating, aligning and positioning. These can affect tasks such as buttoning and zipping, which in turn impacts occupations such as dressing. CHANGE', 'The less time the user took to complete the puzzle, the faster the user was able to identify the correct spot and move the puzzle to that spot. Time can hence be used as an indication of one\'s visual form constancy in identifying the right spot and fine motor skills in aligning and positioning the puzzle. At this level, the user has spent a CHANGE amount of time completing the puzzle. This may indicate CHANGE difficulty with visual form constancy, closely linked with cognitive skills involved in recognsing the orientation and size of objects. CHANGE Alternatively, it may also be an indication of CHANGE fine motor skills, which in daily life can translate how one manipulates, positioning and align buttons on their shirt. This could impact on occupations such as dressing. By working on increasing speed of completion, similar users could improve on their fine motor skills and visual form constancy, resulting in better occupational performance in dressing and navigation respectively.'],
        indicators: [
            [['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'], ['great difficulty', 'moderate difficulty', 'some difficulty', 'mild difficulty', 'little to no difficulty'], ['At this stage, consider incorperating larger accuracy training tasks into therapy sessions, such as balloon tapping.  Alternatively, if users struggle to complete puzzles with more pieces due to attention, or visual form consistency deficits, consider working with the half-completed puzzle options.', 'At this stage, consider incorperating finer accuracy training tasks into therapy sessions, such as working with jenga blocks. Alternatively, if users struggle to complete puzzles with more pieces due to attention, or visual form consistency deficits, consider working with the half-completed puzzle options.', 'At this stage, consider increasing the number of pieces to be completed to challenge the user further. In daily life, tasks such as tying shoelaces can work on similar skills of fine motor control, alignment and positionng of items. If users find visual processing difficult at this stage, upload simpler images into the system using an Imgur link. Alternatively, tasks such as copying the arrangment of ingredients on a pizza can allow users to further work upon visual processing required.', 'At this stage, users demonstrate a good level of sustained attention and visual processing skills. Consider not using the completed puzzle as a guide, or toggling the completed puzzle off once users have seen it, to further challenge the users to complete the puzzle based on the image in their memory. In therapy sessions, more complex tasks can be incoperated to capitalize upon user\'s sustained attention to work on their fine motor skills and control. For exmaple, a simple knitting task or detailed coloring.', 'Challenge users to complete the puzzle at a faster speed to keep things interesting. USers at this level would potentially be more challenged and engaged with other games or different interventions in therapy session that further challenges their ability to sustain attention & process information. Consider doing a real puzzle with a large (>100) number of pieces as a project with the user.']],
            [
                ['short', 'rather short', 'moderate', 'long', 'significant'],
                ['little', 'little', 'moderate', 'great', 'significant'],
                ['At this level, the user has great visual perception, able to differentiate objects. The user is also able to process information on the screen at a quick rate. Consider doing a puzzle with more pieces, or uploading a image with subtle background differences to further challenge users\' visual percpetion. Try Google Arts and Culture for harder puzzles!',
                    'At this level, the user has great visual perception, able to differentiate objects. The user is also able to process information on the screen at a quick rate. Consider doing a puzzle with more pieces, or uploading a image with subtle background differences to further challenge users\' visual percpetion. Try Google Arts and Culture for harder puzzles!',
                    'At this level, users may find it difficult to differentiate between similar objects, affecting occuaptions such as navigation -- for example, being unable to recognize differences between different paths.', 'At this level, users may struggle with differientating between letters, affecting occupations such as reading, navigation and even mobile phone usage.', 'At this level, users may struggle with differientating between objects, affecting occupations such as cooking, or tool use in general.'
                ],
                ['excellent', 'good', 'average', 'poor', 'poor']
            ]],
        threshold: {
            'Pieces': [0, 15, 31, 49],
            'Speed': [0, 3, 6, 12, 15] //reversed array
        } //lower bounds of the score. if score > this, + index
    },
    cooking: {
        name: 'Cooking',
        icon: cooking,
        brief: cookingbrief,
        keys: ['grateSpeed', 'chopSpeed', 'totaltime', 'yperfectTiming', 'zcorrectIng'],
        skillsexplained: 'The cooking game challenges works upon both motor and cognitive skills. Chopping and grating stages encourages increased repetition, ideal for working on fine motor actions of dropping and tapping.\nMeanwhile, different tasks within the game challenges users\' ability to hold ingredients in their working memory, process information given in each stage, and sequence and time events as per the timer provided in the stage. This works upon user\'s excutive functioning, directly planning to planning tasks and following instructions in daily occupations.',
        resultunits: ['Chops /second', 'Grates/ second', 'Average seconds taken /recipe', '% of perfect timing', 'Correct Ingredient streak'],
        standard: [
            'The more chops , the greater the need for repetition to tap the screen to chop the ingredients. This is appropriate for accuracy training and fine motor skills. Gross motor skills are required to move forearms across screens accurately to execute the chopping action within a given time frame. These movement is necessary in the functional movement of reaching and lifting. These are needed in tasks such as reaching for a shower head and lifting a ball, which are neccessary in self-care occupations such as showering or leisure occupations such as playing ball.  At this level, users are at the CHANGE percentile, suggesting that users have CHANGE difficulty with fine motor skills. At this stage, consider CHANGE.',
            'Correct ingredients memorized consecutively without errors is an indicator of users\' working memory. The more ingredients memorized and taken accurately, the better users are able to recall information presented to them in the short term. Working memory is essential for tasks and following instructions. At this level, users are at the CHANGE percentile, suggesting that users have CHANGE difficulty with working memory. At this stage, consider CHANGE ',
            'A higher percentage of perfect timings/correct matching of ingredients may indicate better executive skills. These include greater coordination, information processing, understanding of and executing instructions. This is applicable in actual cooking, task-based occupation, users like you have found this translated to being able to follow harder (more steps) recipes. Outside of cooking, it may lead to better problem-solving and information processing, translating to better performance in productive occupations such as  work. \n\n At this level, the user has a percentage of perfect timings on par with CHANGE percentile of users. This may indicate CHANGE difficulty in executive skills. Specifically, the user must be able to process the instructions through the game, initiate the required action, continue the action and terminate it at an appropriate time. Aside from cooking, executive skills are relevant in other complex ADLs such as grocery shopping, financial and household management. CHANGE  '
        ],
        indicators: [[
            ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            ['significant', 'significant', 'some', 'slight', 'little to no'],
            ['working on more tasks targeting fine motor skills. The puzzle game could encourage repetition, whilst the square game can also be challenging, Users may also be suitable for upper limb groups to further work upon motor skills', 'working on more tasks targeting fine motor skills. The puzzle game could encourage repetition, whilst the square game can also be challenging, Users may also be suitable for upper limb groups to further work upon motor skills', 'further grading motor skills aspect of the game to further challenge users. Also, engage users in repeitive movement to further strengthen gross and fine motor skills, for example via theraputty.', 'consider challenging users in different aspects. For example, at this level the user may be suitable to prepare simple recipes in a kitchen, exploring cutting or chopping with suitable aids and assistance in the kitchen to ensure safety.', 'consider challenging users in different aspects. For example, at this level the user may be suitable to prepare simple recipes in a kitchen, exploring cutting or chopping with suitable aids and assistance in the kitchen to ensure safety.']
        ], [
            ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            ['significant', 'significant', 'some', 'slight', 'little to no'],
            ['analyzing how users\' impaired working memory impacts on their ability to follow single-step and double-step instructions. Consider also the cognitive hierachy -- are users struggling with memory as they are unable to pay attention to begin with? Grade the skills in the game settings page accordingly, the number of ingredients users are challenged to recall is mapped both to the attention and memory settings set. Also, analyse how this is affecting the users in daily occupations, considering the  use of compensatory stratgies to address underlying deficits.',
                'analyzing how users\' impaired working memory impacts on their ability to follow single-step and double-step instructions. Consider also the cognitive hierachy -- are users struggling with memory as they are unable to pay attention to begin with? Grade the skills in the game settings page accordingly, the number of ingredients users are challenged to recall is mapped both to the attention and memory settings set.Also, analyse how this is affecting the users in daily occupations, considering the  use of compensatory stratgies to address underlying deficits.',
                'further grading the gane, challenging the users to remember more information at once. Explore cueing and other strategies for improving memory with users. For example, asking them to name each of the ingredient, repeat it, before diving into the task. Consider also challenge user\'s working memory in daily tasks, eg. remembering two steps of a recipe/recalling a short shopping list.',
                'how users can further use working memory to their advantage to complete more advanced task, and work towards executive functioning. Consider exploring problem solving with service users, exploring with them how information they are able to recall can be used to solve problems',
                'how users can further use working memory to their advantage to complete more advanced task, and work towards executive functioning. Consider exploring problem solving with service users, exploring with them how information they are able to recall can be used to solve problems.']], [
            ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            ['significant', 'significant', 'some', 'slight', 'little to no'],
            ['At this level, users may struggle with information processing required to execute complex tasks. Consider exploring compensatory stratgeies to help users manage complex ADLs, for example, breaking big tasks down into small steps written on a piece of paper users can follow. Also, consider slowly grading the use of multi-step instructions during therapy interventions to access and work upon users\' excutive functioning', 'At this level, users may struggle with information processing required to execute complex tasks. Consider exploring compensatory stratgeies to help users manage complex ADLs, for example, breaking big tasks down into small steps written on a piece of paper users can follow.', 'At this level, users are able to demonstrate basic information processing and some executive functioning, though they may continue to struggle with complex tasks.  Consider working with users to explore compensatory stratgeies that help them manage complex ADLs, for example, getting users to break big tasks down into small steps written on a piece of paper users can follow.', 'At this level, users are able to demonstrate basic information processing and some executive functioning, though they may continue to struggle with complex tasks, such as financial management.  Consider building upon users executivie functinoning further by challenging them to plan a bigger task step by step -- for example, coming up with a shopping list based on recipes, or what is in the fridge, combining shopping with household management.', 'At this level, users are able to demonstrate great executive functioning.  Consider exploring more complex tasks with users such as financial and household management, to highlight where difficulty may arise in daily life. Another worthy occupation to consider at this stage may also be self-management in productive occupations, such as employment or education.']
        ]],
        threshold: {
            chopSpeed: [0, 2, 4, 6, 8],
            zcorrectIng: [0, 2, 4, 6, 7],
            yperfectTiming: [0, 20, 40, 60, 80]
        }
    },
    dino: {
        name: 'Space dino!',
        icon: dino,
        brief: dinobrief,
        keys: ['Duration', 'Level', 'Obstacles'],
        skillsexplained: 'In the space dinosaur game, users sustain their attention throughout the game to be able to identify obstacles, appropriate routes and action to avoid said obstacles and to execute these actions. Being able to avoid obstacles also requires the processing skills of information processing and understanding and executing instructions. These affects how the action of avoiding obstacles are initiated and terminated appropriately, and is applicable in many occupations such as cooking, showering and navigation. Sustained attention is a process skill necessary to initiate, execute and terminate tasks such as cutting fruits. This is necessary in occupations such as cooking. ',
        resultunits: ['Seconds lasted', 'Highest level reached', 'No. of obstacles avoided/run'],
        standard: [
            'Attention needs to be sustained throughout the game to be able to identify obstacles, appropriate routes and action to avoid said obstacles and to execute these actions. Sustained attention is a process skill necessary to initiate, execute and terminate tasks such as cutting fruits. This is necessary in occupations such as cooking. The longer the duration survived, the better the user\'s ability to sustain attention while navigating the game and avoiding obstacles. At this level, the user is at the CHANGE percentile of users. This may indicate CHANGE difficulty sustaining attention. CHANGE '
        ],
        threshold: {
            'Duration': [0, 10, 30, 60, 120],
            'Obstacles': [0, 10, 20, 50, 60],
        },
        indicators: [[
            ['0-20%', '20-40%', '40-60%', '60-80%', '80-100%'],
            ['significant', 'significant', 'some', 'slight', 'little to no'],
            ['Consider starting the game at an easier level to make it easier for the duration captured to be a better indicator of users\' ability to sustain attention, also consider the use of sensory stratgies to further capture users attention, for example having background music. (We are working on introducing game audio!) Sustained attention is a prerequisite for memory and information processing, and can affect daily occupations such as following conversations.', 'Consider starting the game at an easier level to make it easier for the duration captured to be a better indicator of users\' ability to sustain attention. Sustained attention is a prerequisite for memory and information processing, and can affect daily occupations such as cooking.', 'At this level, on top of sustained attention, users may also be struggling with avoiding the obstacles. Consider turning off the auto-progress option to further challenge users ability to sustain attention. If users struggle to avoid obstacles as the levels get harder, it may be linked to their ability to process visual information quickly. Slowly grade the level the game starts on to challenge users. Reading and watching videos are all occupations which require users to process visual information; outside of the game consider consuming media users are interested in and having a conversation about it to further access their ability to process and retain information presented visually.', 'At this level, on top of sustained attention, users may also be struggling with avoiding the obstacles. Consider turning off the auto-progress option to further challenge users ability to sustain attention. If users struggle to avoid obstacles as the levels get harder, it may be linked to their ability to process visual information quickly. Slowly grade the level the game starts on to challenge users. Reading and watching videos are all occupations which require users to process visual information; outside of the game consider consuming media users are interested in and having a conversation about it to further access their ability to process and retain information presented visually.', 'Consider turning on the auto-progress option in the settings to challenge users and keep the game challenging for them. Also, consider how users sustained attention can be used to as a strength to facilitate other occupations, such as cooking which faciliattes the remediation of other skills such as motor skills.']
        ], []]
    }

}

export const initData = {
    //init data required as a 0, then can make changes after data is retrieved using useeffect
    square: {
        'mode-0': {
            'Level': [0, 0],
            'Score': [0],
            'Speed': [0]
        },
        '1': [0],
        '2': [0],
        'average': [0]
    },
    puzzle: {
        'Pieces': [0],
        'Speed': [0],
        'Time': [0]
    },
    dino: {
        'Duration': [0],
        'Level': [0],
        'Obstacles': [0],
    },
    cooking: {
        'grateSpeed': [0],
        'chopSpeed': [0],
        'totaltime': [0],
        'yperfectTiming': [0],
        'zcorrectIng': [0],

    }
}