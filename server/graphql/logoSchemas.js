var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLInputObjectType = require('graphql').GraphQLInputObjectType;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
let LogoModel = require('../models/logoModel');


//SECTION: TextBox type and input

var TextBoxType = new GraphQLObjectType({
    name: "TextBoxType",
        fields: function () {
            return {
                name : {
                    type : GraphQLString
                },
                text: {
                    type: GraphQLString,
                },
                color: {
                    type: GraphQLString,
                },
                fontSize: {
                    type: GraphQLString,
                },
                background : {
                    type : GraphQLString
                },
                border : {
                    type : GraphQLString
                },
                x: {
                    type: GraphQLInt,
                },
                y: {
                    type: GraphQLInt,
                },
        };
     },
});

var TextBoxInput = new GraphQLInputObjectType({
    name: "TextBoxInput",
    fields: function () {
        return {
            name : {
                type : GraphQLString
            },
            text: {
                type: GraphQLString,
            },
            color: {
                type: GraphQLString,
            },
            fontSize: {
                type: GraphQLString,
            },
            background : {
                type : GraphQLString
            },
            border : {
                type : GraphQLString
            },
            x: {
                type: GraphQLInt,
            },
            y: {
                type: GraphQLInt,
            },
        };
        },
});


// SECTION: Image type and input

var logoImageType = new GraphQLObjectType({
    name: "logoImageType",
    fields: function () {
        return {
            name: {
                type: GraphQLString,
            },
            source: {
                type: GraphQLString,
            },
            width : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            x: {
                type: GraphQLInt,
            },
            y: {
                type: GraphQLInt,
            },
        };
    },
});

var ImageTypeInput = new GraphQLInputObjectType({
    name: "ImageTypeInput",
    fields: function () {
        return {
            name: {
                type: GraphQLString,
            },
            source: {
                type: GraphQLString,
            },
            width : {
                type : GraphQLInt
            },
            height : {
                type : GraphQLInt
            },
            x: {
                type: GraphQLInt,
            },
            y: {
                type: GraphQLInt,
            },
        };
    },
});

// SECTION: logoCanvas type

var logoType = new GraphQLObjectType({
    name: "logo",
    fields: function () {
        return {
            _id: {
            type: GraphQLString,
            },
            name: {
                type: GraphQLString,
            },
            backgroundColor: {
                type: GraphQLString,
            },
            borderColor: {
                type: GraphQLString,
            },
            borderRadius: {
                type: GraphQLInt,
            },
            borderWidth: {
                type: GraphQLInt,
            },
            
            margin: {
                type: GraphQLInt,
            },
            height: {
                type: GraphQLInt,
            },
            width: {
                type: GraphQLInt,
            },
            border : {
                type : GraphQLString
            },
            position : {
                type : GraphQLString
            },
            textBoxFontColor : {
                type: GraphQLString
            },
            textBoxFontSize : {
                type : GraphQLInt
            },
            textBoxList: {
                type: GraphQLList(TextBoxType),
            },
            imageList: {
                type: GraphQLList(logoImageType),
            },
            lastUpdate: {
                type: GraphQLDate,
            },
      };
    },
  });


  var queryType = new GraphQLObjectType({
    name: "Query",
    fields: function () {
      return {
        logos: {
          type: new GraphQLList(logoType),
          resolve: function () {
            const logos = LogoModel.find().exec();
            if (!logos) {
              throw new Error("Error");
            }
            return logos;
          },
        },
        logo: {
          type: logoType,
          args: {
            id: {
              name: "_id",
              type: GraphQLString,
            },
          },
          resolve: function (root, params) {
            const logoDetails = LogoModel.findById(params.id).exec();
            if (!logoDetails) {
              throw new Error("Error");
            }
            return logoDetails;
          },
        },
      };
    },
  });

var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addLogo: {
                type: logoType,
                    args: {
                        name: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                  
                        backgroundColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderRadius: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        borderWidth: {
                            type: new GraphQLNonNull(GraphQLInt),
                        }, 
                        
                        margin: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        height: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        width: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        border : {
                            type : new GraphQLNonNull(GraphQLString)
                        },
                        position : {
                            type : new GraphQLNonNull(GraphQLString)
                        },
                        textBoxFontColor : {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        textBoxFontSize : {
                            type : new GraphQLNonNull(GraphQLInt)
                        },
                        textBoxList : {
                            type: new GraphQLNonNull(GraphQLList(TextBoxInput)),
                        },
                        imageList: {
                            type: new GraphQLNonNull(GraphQLList(ImageTypeInput)),
                        },
                    },
                    resolve: function (root, params) {
                    const logoCanvasModel = new LogoModel(params);
                    const newLogoCanvas = logoCanvasModel.save();
                    if (!newLogoCanvas) {
                        throw new Error("Error");
                    }
                        return newLogoCanvas;
                    },
            },
            updateLogo: {
                type: logoType,
                    args: {
                        id: {
                            name: "id",
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        name: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        backgroundColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderColor: {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        borderRadius: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        borderWidth: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        
                        margin: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        height: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        width: {
                            type: new GraphQLNonNull(GraphQLInt),
                        },
                        border : {
                            type : new GraphQLNonNull(GraphQLString)
                        },
                        position : {
                            type : new GraphQLNonNull(GraphQLString)
                        },
                        textBoxFontColor : {
                            type: new GraphQLNonNull(GraphQLString),
                        },
                        textBoxFontSize : {
                            type : new GraphQLNonNull(GraphQLInt)
                        },
                        textBoxList : {
                            type: new GraphQLNonNull(GraphQLList(TextBoxInput)),
                        },
                        imageList: {
                            type: new GraphQLNonNull(GraphQLList(ImageTypeInput)),
                        },
                },
                resolve(root, params) {
                        return LogoModel.findByIdAndUpdate(
                            params.id,
                            {
                            name: params.name,
                            backgroundColor: params.backgroundColor,
                            borderColor: params.borderColor,
                            borderRadius: params.borderRadius,
                            borderWidth: params.borderWidth,
                            margin: params.margin,
                            height: params.height,
                            width: params.width,
                            border : params.border,
                            position : params.absolute,
                            textBoxFontColor : params.textBoxFontColor,
                            textBoxFontSize : params.textBoxFontSize,
                            textBoxList: params.textBoxList,
                            imageList: params.imageList,
                            lastUpdate: new Date(),
                            },
                            function (err) {
                            if (err) return next(err);
                        }
                    ); 
                },
            },
            removeLogo: {
                type: logoType,
                    args: {
                        id: {
                        type: new GraphQLNonNull(GraphQLString),
                        },
                    },
                    resolve(root, params) {
                        const remLogo = LogoModel.findByIdAndRemove(params.id).exec();
                        if (!remLogo) {
                            throw new Error("Error");
                        }
                        return remLogo;
                },
            },
        }
    }
});

module.exports = new GraphQLSchema({ query: queryType, mutation: mutation });
