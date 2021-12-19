//keys: -- all numbers to reduce syntax sorry ashley i know quite unreadble LOL 
/*
    boilwater: 0
    fridge: 1
    pan/pot: 2
    Chopping: 3
    mix/mush: 4
    Plating: 5 */

let recipes = [
    //array of dictionary - easy to maintain, more straightforward to edit in english 
    //recipes -- each step will be a dict, with 2 keys -- ingredeints to be renders and adaptation 
    // params passed in would be recipe, step. Step would be index allowing for it to be retrieved 
    {
        r_id: 'PB',
        r_no: 0,
        steps : [0,1,3,2,5],
        step:[
            {
                ing: [],
                adapt: []
            },
            {
                ing: [0,2,3,8],
                adapt: []
            },
            {
                ing: [3],
                adapt: []
            },
            {
                ing: [[8,2], [8,2,0], [8,2,0,3]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pot',
                    type : 'add',// 'add' at the right time based on time bar, or wait for it to change color 
                    time: [15,30,45,60] //adaptation for shorter or longer sustained attention 
                }
            },
            {
                ing: [],
                adapt: []
            }
        ]

    }, //pasta bolognese
    {
        r_id: 'CB',
        r_no: 1,
        steps : [0,1,3,2],
        step:[
            {
                ing: [],
                adapt: []
            },
            {
                ing: [4,3,5],
                adapt: []
            },
            {
                ing: [3],
                adapt: {
                    grate_no : [10,20,40]
                }
            },
            {
                ing: [[4,13], [4,13,5], [14,4,13,5]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pan',
                    type : 'add',
                    time: [15,30,45] //adaptation for shorter or longer sustained attention 
                }
            }
        ]


    }, //carbonara
    {
        r_id: 'FR',
        r_no: 2,
        steps : [0,1,3,2],
        step:[
            {
                ing: [],
                adapt: []
            },
            {
                ing: [4,3,5],
                adapt: []
            },
            {
                ing: [10],
                adapt: {
                    chop_no: [20,40,60]
                }
            },
            {
                ing: [[4,13], [4,13,5], [14,4,13,5]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pan',
                    type : 'add',
                    time: [15,30,45] //adaptation for shorter or longer sustained attention 
                }
            }
        ]


    }, //fried rice
    {
        r_id: 'CB',
        r_no: 1,
        steps : [0,1,3,2],
        step:[
            {
                ing: [],
                adapt: []
            },
            {
                ing: [4,3,5],
                adapt: []
            },
            {
                ing: [3],
                adapt: []
            },
            {
                ing: [[4,13], [4,13,5], [14,4,13,5]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pan',
                    type : 'add',
                    time: [15,30,45] //adaptation for shorter or longer sustained attention 
                }
            }
        ]


    },//curry
    {
        r_id: 'SM',
        r_no: 4,
        steps : [1,3,0,4,2],
        step:[
            {
                ing: [],
                adapt: {}
            },
            {
                ing: [],
                adapt: []
            },
            {
                ing: [3],
                adapt: []
            },
            {
                ing: [],
                adapt: {
                
                }
            },
            {
                ing: [[4,13], [4,13,5], [14,4,13,5]],
                adapt:{
                    fireNo: 1,
                    cookery: 'pan',
                    type: 'wait',
                    time: [30,45,60]
                }

            }
        ]


    } //sausage and mash


]

export default recipes