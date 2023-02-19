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
        steps: [0, 1, 3, 5, 2, 6],

        step: [
            {
                ing: [],
                adapt: {
                    carbs: 'pasta'
                }//boil water
            },
            {
                ing: [[0, 11, 3], [0, 11, 3, 8], [0, 11, 11, 3, 8], [0, 11, 11, 3, 3, 8], [0, 11, 11, 3, 11, 3, 8, 8, 8]]//take from fridge
            },
            {
                ing: [0],
            },
            {
                //grate nil params
            },
            {
                ing: [[8, 11], [8, 11, 0], [8, 11, 0], [8, 11, 0, 3], [8, 11, 11, 0, 3]],
                adapt: {
                    fireNo: 1,
                    cookery: 'pot',
                    type: 'add',// 'add' at the right time based on time bar, or wait for it to change color 
                }
            }
        ]

    }, //pasta bolognese
    {
        r_id: 'CB',
        r_no: 1,
        steps: [0, 1, 5, 2, 6],
        step: [
            {
                ing: [],
                adapt: {
                    carbs: 'pasta'
                }
            },
            {
                ing: [[4, 3, 5], [4, 3, 5, 5], [4, 3, 3, 5, 5], [4, 3, 3, 5, 5, 5], [4, 3, 3, 5, 5, 5, 8, 8]]
            },
            {
                ing: [3]
            },
            {
                ing: [[4, 13], [4, 13, 5], [14, 4, 13, 5], [14, 4, 4, 13, 5], [14, 14, 4, 4, 5, 13]],
                adapt: {
                    fireNo: 1,
                    cookery: 'pan',
                    type: 'add'
                }
            },
            {}//grate nil params
        ]


    }, //carbonara
    {
        r_id: 'FR',
        r_no: 2,
        steps: [0, 1, 3, 3, 2, 6],
        step: [
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[8, 1, 5], [8, 1, 5, 10], [8, 1, 5, 10, 1], [8, 1, 5, 10, 10, 5, 1], [8, 1, 5, 10, 5, 1, 10, 8, 1]],
            },
            {
                ing: [10]
            },
            {
                ing: [0]
            },
            {
                ing: [[5, 10, 17], [14, 5, 10, 17], [14, 5, 10, 17], [14, 1, 5, 10, 17], [14, 1, 5, 10, 17]],
                adapt: {
                    fireNo: 1,
                    cookery: 'pan',
                    type: 'add'
                }
            }
        ]


    }, //fried rice, chop repeated
    {
        r_id: 'JC',
        r_no: 3,
        steps: [0, 1, 3, 3, 2, 6],
        step: [
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[6, 7, 8], [6, 7, 8, 10], [6, 7, 8, 10, 1], [6, 7, 8, 10, 1, 7], [6, 7, 8, 10, 1, 7, 10, 1, 6]]
            },
            {
                ing: [7]
            },
            {
                ing: [10]
            },
            {
                ing: [[8, 7, 10], [8, 1, 7, 10], [8, 1, 7, 10], [8, 1, 7, 10, 6], [8, 1, 7, 10, 6]],
                adapt: {
                    fireNo: 1,
                    cookery: 'pot',
                    type: 'add'
                }
            }
        ]


    },//curry, chop repeated
    {
        r_id: 'SM',
        r_no: 4,
        steps: [1, 3, 4, 2, 6],
        step: [
            {
                ing: [[12, 7], [12, 7, 3], [12, 7, 7, 3], [12, 12, 7, 7, 7, 3], [12, 3, 3, 3, 7, 7, 12, 12]],
            },
            {
                ing: [7]
            },
            {
                ing: [[7, 3, 18], [7, 3, 18, 19], [7, 3, 18, 19], [7, 3, 18, 19], [7, 7, 3, 18, 19]]
            }, //making mash via mixing 
            {
                ing: [12],
                adapt: {
                    fireNo: 1,
                    cookery: 'pan',
                    type: 'wait'
                }

            }
        ]


    }, //sausage and mash
    {
        r_id: 'FC',
        r_no: 5,
        steps: [1, 0, 4, 2, 6],
        step: [
            {
                ing: [[2, 7], [2, 7, 5], [2, 7, 5], [2, 7, 5, 2], [2, 5, 5, 7, 2, 10]],
            },
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[5, 21], [5, 21, 19], [5, 21, 19], [5, 21, 19, 2], [5, 21, 19, 2]]
            }, //mixing batter 
            {
                ing: [16, 15],
                adapt: {
                    fireNo: 2,
                    cookery: 'pan',
                    type: 'wait'
                }

            }
        ]
    }, //fish and chips 
    {
        r_id: 'PS',
        r_no: 6,
        steps: [0, 1, 3, 5, 4, 6],
        step: [
            {
                adapt: {
                    carbs: 'pasta'
                }
            },
            {
                ing: [[0, 3, 8], [0, 3, 3, 8], [0, 3, 3, 8, 8], [0, 0, 10, 8, 8, 3], [0, 0, 10, 0, 10, 8, 8, 3]]
            },
            {
                ing: [0]
            },
            {},//grate is empty
            {
                ing: [[0, 8, 13], [0, 3, 8], [0, 3, 8, 13], [0, 3, 8, 13, 10], [0, 3, 13, 8, 10]]
            }, //mix salad
        ]
    }, //pasta salad
    {
        r_id: 'PS',
        r_no: 7,
        steps: [0, 1, 3, 5, 4, 6],
        step: [
            {
                adapt: {
                    carbs: 'rice'
                }
            },
            {
                ing: [[3, 7], [7, 3, 8], [7, 7, 3, 8, 8], [7, 7, 10, 8, 8, 3], [7, 7, 10, 7, 10, 8, 8, 3]]
            },
            {
                ing: [7]
            },
            {},//grate is empty
            {
                ing: [[7, 18, 3], [7, 3, 18, 10], [7, 3, 18, 10], [7, 3, 18, 0, 10], [7, 3, 0, 18, 10]]
            }, //mix salads
        ]
    }, //potato salad


]

export default recipes