//keys: -- all numbers to reduce syntax sorry ashley i know quite unreadble LOL 
/*
    boilwater: 0
    fridge: 1
    pan/pot: 2
    Chopping: 3
    mix/mush: 4
    Cheese: 5 */

let recipes = [
    //array of dictionary - easy to maintain, more straightforward to edit in english 
    //recipes -- each step will be a dict, with 2 keys -- ingredeints to be renders and adaptation 
    // params passed in would be recipe, step. Step would be index allowing for it to be retrieved 
    {
        r_id: 'PB',
        r_no: 0,
        steps : [0,1,3,5,2,6],

        step:[
            {
                ing: [],
                adapt: {
                    carbs: 'pasta'
                }//boil water
            },
            {
                ing: [[0,2,3], [0,2,3,8], [0,2,3,8],[0,2,2,3,8], [0,2,2,3,3,8]]//take from fridge
            },
            {
                ing: [0],
            },
            {
               //grate nil params
            },
            {
                ing: [[8,2], [8,2,0], [8,2,0], [8,2,0,3], [8,2,2,0,3]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pot',
                    type : 'add',// 'add' at the right time based on time bar, or wait for it to change color 
                }
            }
        ]

    }, //pasta bolognese
    {
        r_id: 'CB',
        r_no: 1,
        steps : [0,1,3,2,6],
        step:[
            {
                ing: [],
                adapt: {
                    carbs: 'pasta'
                }
            },
            {
                ing: [[4,3,5], [4,3,5,5],[4,3,3,5,5], [4,3,3,5,5,5], [4,3,3,5,5,5,8,8]]
            },
            {
                ing: [3]
            },
            {
                ing: [[4,13], [4,13,5], [14,4,13,5]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pan',
                    type : 'add'
                }
            },
            {}//grate nil params
        ]


    }, //carbonara
    {
        r_id: 'FR',
        r_no: 2,
        steps : [0,1,3,3,2],
        step:[
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[8,1,5], [8,1,5,10,1], [8,1,5,5,1,10,1]],
            },
            {
                ing: [10]
            },
            {
                ing: [0]
            },
            {
                ing: [[5,10,17], [14,5,10,17], [14,1,5,10,17]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pan',
                    type : 'add'
                }
            }
        ]


    }, //fried rice
    {
        r_id: 'JC',
        r_no: 3,
        steps : [0,1,3,3,2],
        step:[
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[6,7,8], [6,7,8,10], [6,7,8,10,1,7]],
            },
            {
                ing: [7]
            },
            {
                ing: [10]
            },
            {
                ing: [[8,7,10], [8,1,7,10], [8,1,7,10,6]],
                adapt: {
                    fireNo:    1,
                    cookery: 'pot',
                    type : 'add'
                }
            }
        ]


    },//curry
    {
        r_id: 'SM',
        r_no: 4,
        steps : [1,0,3,4,2],
        step:[
            {
                ing: [[12,7], [12,7,3], [12,7,7,7,3]],
            },
            {
                adapt:{
                    carbs: 'potato'
                }
            },
            {
                ing: [7]
            },
            {
                ing: [[7,3,18], [7,3,18,19], [7,3,18,19,20]]
            },
            {
                ing: [12],
                adapt:{
                    fireNo: 1,
                    cookery: 'pan',
                    type: 'wait'
                }

            }
        ]


    } //sausage and mash


]

export default recipes