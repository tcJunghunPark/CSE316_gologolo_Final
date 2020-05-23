var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var LogoModel = require('../models/Logo');
var TextModel = require('../models/Text');
var ImageModel = require('../models/Image');

var logoType = new GraphQLObjectType({
    name: 'logo',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            texts: {
                type: GraphQLList(TextType)
            },
            images: {
                type: GraphQLList(ImageType)
            },
            // color: {
            //     type: GraphQLString
            // },
            // fontSize: {
            //     type: GraphQLInt
            // },
            backgroundColor:{
                type: GraphQLString
            },
            borderColor:{
                type: GraphQLString
            },
            borderRadius:{
                type: GraphQLInt
            },
            borderThickness:{
                type: GraphQLInt
            },
            padding:{
                type: GraphQLInt
            },
            margin:{
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});

var TextType = new GraphQLObjectType({
    name: 'text',
    fields: function(){
        return{
            _id: {
                type: GraphQLString
            },
            text: {
                type: GraphQLString
            },
            color: {
                type: GraphQLString
            },
            corX: {
                type: GraphQLInt
            },
            corY: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLInt
            }
        }
    }
});

var ImageType = new GraphQLObjectType({
    name: 'image',
    fields: function(){
        return{
            _id: {
                type: GraphQLString
            },
            URL: {
                type: GraphQLString
            },
            sizeX: {
                type: GraphQLInt
            },
            sizeY: {
                type: GraphQLInt
            },
            corX: {
                type: GraphQLInt
            },
            corY: {
                type: GraphQLInt
            },
            lastUpdate: {
                type: GraphQLInt
            }
        }
    }
});

var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            logos: {
                type: new GraphQLList(logoType),
                resolve: function () {
                    const logos = LogoModel.find().exec()
                    if (!logos) {
                        throw new Error('Error')
                    }
                    return logos
                }
            },
            logo: {
                type: logoType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                texts: {
                    type: new GraphQLList(TextType),
                    resolve: function (){
                        const texts = TextModel.find().exec()
                        if (!texts){
                            return null
                        }
                        return texts
                    }
                },
                text: {
                    type: TextType,
                    args: {
                        id: {
                            name: '_id',
                            type: GraphQLString
                        },
                    color: {
                        type: GraphQLString
                    },
                    fontSize: {
                        type: GraphQLString
                    },
                    corX: {
                        type: GraphQLInt
                    },
                    corY: {
                        type: GraphQLInt
                    },
                    lastUpdate: {
                        type: GraphQLInt
                    }

                    }
                },
                images: {
                    type: new GraphQLList(ImageType),
                    resolve: function (){
                        const images = ImageModel.find().exec()
                        if (!images){
                            return null
                        }
                        return images
                    }
                },
                image: {
                    type: ImageType,
                    args: {
                        id: {
                            name: '_id',
                            type: GraphQLString
                        },
                    URL: {
                        type: GraphQLString
                    },
                    sizeX: {
                        type: GraphQLInt
                    },
                    sizeY: {
                        type: GraphQLInt
                    },
                    corX: {
                        type: GraphQLInt
                    },
                    corY: {
                        type: GraphQLInt
                    },
                    lastUpdate: {
                        type: GraphQLInt
                    }
                    }

                },
                backgroundColor:{
                    type: GraphQLString
                },
                borderColor:{
                    type: GraphQLString
                },
                borderRadius:{
                    type: GraphQLInt
                },
                borderThickness:{
                    type: GraphQLInt
                },
                padding:{
                    type: GraphQLInt
                },
                margin:{
                    type: GraphQLInt
                },
                lastUpdate: {
                    type: GraphQLDate
                }
                    },
                resolve: function (root, params) {
                    const logoDetails = LogoModel.findById(params.id).exec()
                    if (!logoDetails) {
                        throw new Error('Error')
                    }
                    return logoDetails
                }
            }
        }
    }
});

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                args: {
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderThickness:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve: function (root, params) {
                    const logoModel = new LogoModel(params);
                    const newLogo = logoModel.save();
                    if (!newLogo) {
                        throw new Error('Error');
                    }
                    return newLogo
                }
            },
            updateLogo: {
                type: logoType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    text: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    color: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    fontSize: {
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    backgroundColor:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderColor:{
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    borderRadius:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    borderThickness:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    padding:{
                        type: new GraphQLNonNull(GraphQLInt)
                    },
                    margin:{
                        type: new GraphQLNonNull(GraphQLInt)
                    }
                },
                resolve(root, params) {
                    return LogoModel.findByIdAndUpdate(params.id, { text: params.text, color: params.color, fontSize: params.fontSize, backgroundColor: params.backgroundColor,
                        borderColor:params.borderColor,borderRadius: params.borderRadius, borderThickness: params.borderThickness, padding: params.padding
                        , margin: params.margin, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeLogo: {
                type: logoType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                    if (!remLogo) {
                        throw new Error('Error')
                    }
                    return remLogo;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });