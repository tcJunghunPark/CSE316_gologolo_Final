# provide example code for query -server

## query - get data
 - get all logo's information through this code.

    '''graphql

        query allLogos{
            logos {
                _id
                text
                color
                fontSize
                backgroundColor
                borderColor
                borderRadius
                borderThickness
                padding
                margin
            }
        }
    '''

## Get one specific logo's information
'''

    query singleLogo{
      logo(id: "5ead8345367adc523082cfe2"){
          _id
          text
          color
          fontSize
          backgroundColor
          borderColor
          borderRadius
          borderThickness
          padding
          margin
      }
    }
'''

  ## mutation- For modify data(add, change, delete)

  - addLogo is used to add new data

'''

    mutation addLogo{
        addLogo(
            text: "example Text"
            color: "blue"
            fontSize: 40
            backgroundColor: "red"
            borderColor: "white"
            borderRadius: 10
            borderThickness: 15
            padding: 10
            margin: 30
        ){
            _id
            text
                color
             fontSize
             backgroundColor
             borderColor
             borderRadius
             borderThickness
             padding
             margin
        }
    }
'''

- updateLogo is used to chage data stored in query

'''

    mutation updateLogo{
        updateLogo(
         id: "5ead8345367adc523082cfe2"
        text: "updateLogoExample"
        color: "white"
        fontSize: 20
        backgroundColor: "blue"
        borderColor: "yellow"
        borderRadius: 30
        borderThickness: 18
        padding: 29
        margin: 20
    ) {
        _id
        text
        color
        fontSize
        backgroundColor
        borderColor
        borderRadius
        borderThickness
        padding
        margin
        }
    }
'''

- removeLogo is used to remove existing data by giving specific id

'''

    mutation removeLogo{
        removeLogo(
            id: "5eb2e7ce27639b2568f78bce"
        ){
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderThickness
            padding
            margin
        }
    }
'''